import os
import numpy as np
import librosa
import tensorflow as tf
import random
import torch
import torchaudio
from tensorflow.keras.models import load_model
from sklearn.preprocessing import OneHotEncoder
from audiocraft.models import MusicGen
import streamlit as st
from datetime import datetime

# Load the pre-trained models
model_file = r"my_model.keras"  

# Ensure the model path exists
if not os.path.exists(model_file):
    st.error(f"Error: The model file at {model_file} does not exist.")
    exit()

# Load the emotion classifier model
emotion_model = load_model(model_file)

# Define the labels based on your training dataset
labels = ['fear', 'angry', 'disgust', 'neutral', 'sad', 'ps', 'happy']
enc = OneHotEncoder()
enc.fit(np.array(labels).reshape(-1, 1))

# Function to extract MFCC from audio file
def extract_mfcc(filename):
    y, sr = librosa.load(filename, duration=3, offset=0.5)
    mfcc = np.mean(librosa.feature.mfcc(y=y, sr=sr, n_mfcc=40).T, axis=0)
    return mfcc

# Preprocess the input file (similar to training data)
def preprocess_input(file_path):
    # Extract MFCC features
    mfcc = extract_mfcc(file_path)
    # Reshape the features to match training data shape
    mfcc = np.expand_dims(mfcc, -1)  # Adding a feature dimension
    return mfcc

# Set CPU-only mode for music generation
# torch.set_default_device("cpu")
# Load pre-trained MusicGen model for music generation
musicgen_model = MusicGen.get_pretrained('facebook/musicgen-small')
musicgen_model.set_generation_params(duration=5, top_k=250, top_p=0.8, temperature=1.0)

# Define prompts for each mood
prompts = {
    "ps": ["surprising, uplifting music", "exciting, unexpected instrumental music"],
    "neutral": ["neutral, background instrumental music", "calm, smooth instrumental beats"],
    "disgust": ["dark, unsettling music", "dissonant, uncomfortable sounds"],
    "fear": ["tense, suspenseful music", "creepy, eerie background music"],
    "sad": ["melancholic, sad music", "soft, emotional piano music"],
    "happy": ["upbeat, happy music", "joyful, energetic melody"],
    "angry": ["intense, aggressive music", "loud, fast-paced rock music"]
}

# Function to generate music based on the detected mood
def generate_music(emotion):
    if emotion in prompts:
        prompt = random.choice(prompts[emotion])  # Randomly select a prompt for the detected emotion
        st.write(f"Generating music for mood: {emotion}")

        # Generate music
        output = musicgen_model.generate([prompt], progress=True)
        output_wav = output[0]  # Use the first element of the list

        # Check and adjust tensor shape to 2D for saving
        if output_wav.ndimension() == 3:
            output_wav = output_wav.squeeze(0)

        # Generate filename with timestamp
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"generated_{emotion}_{timestamp}.wav"

        # Save the generated music as a WAV file
        if output_wav.ndimension() == 2:
            torchaudio.save(filename, output_wav, sample_rate=32000)
            return filename
        else:
            st.error("❌ Failed to save music. Tensor shape is not valid.")
            return None
    else:
        st.error("❌ Unknown mood.")
        return None

# Streamlit front-end UI
st.title('Mood-Enhancing Music Generator')

# Drag and Drop functionality for uploading audio
uploaded_file = st.file_uploader("Upload an Audio File (WAV)", type=["wav"])

if uploaded_file is not None:
    # Save the uploaded file temporarily
    file_path = f"temp_{uploaded_file.name}"
    with open(file_path, "wb") as f:
        f.write(uploaded_file.getbuffer())

    # Preprocess and classify the emotion
    input_features = preprocess_input(file_path)
    input_features = np.expand_dims(input_features, axis=0)  # Add batch dimension
    predicted_label = emotion_model.predict(input_features)

    # Decode the predicted label
    predicted_class = enc.inverse_transform(predicted_label)
    emotion = predicted_class[0][0]

    # Display the predicted emotion
    st.write(f"The predicted emotion is: {emotion}")

    # Generate music based on the predicted emotion
    if st.button('Generate Music'):
        generated_music = generate_music(emotion)
        if generated_music:
            st.success(f"✅ Music successfully generated: {generated_music}")
            st.audio(generated_music)  # Play the generated music
