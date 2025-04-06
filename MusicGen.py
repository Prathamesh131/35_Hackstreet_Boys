import numpy as np
import librosa
import tensorflow
from sklearn.preprocessing import OneHotEncoder
from tensorflow.keras.models import load_model
import os
import random
import torch
import torchaudio
from audiocraft.models import MusicGen

# Define the function to extract MFCC from audio file
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

# Set your local file paths
input_file = r"D:\sem 6\genesys\audio.wav"  # Replace with your local audio file path
model_file = r"D:\sem 6\genesys\speech-mood-music\my_model.keras"  # Replace with your local model file path

# Ensure the paths exist
if not os.path.exists(input_file):
    print(f"Error: The audio file at {input_file} does not exist.")
    exit()

if not os.path.exists(model_file):
    print(f"Error: The model file at {model_file} does not exist.")
    exit()

# Preprocess the input file
input_features = preprocess_input(input_file)

# Load the trained emotion classifier model
emotion_model = load_model(model_file)

# Predict the emotion of the input file
input_features = np.expand_dims(input_features, axis=0)  # Add batch dimension
predicted_label = emotion_model.predict(input_features)

# Load the OneHotEncoder used during training
enc = OneHotEncoder()

# Define the labels based on your training dataset
labels = ['fear', 'angry', 'disgust', 'neutral', 'sad', 'ps', 'happy']

# Fit the encoder on the labels (ensure this is done similarly to how you did in training)
enc.fit(np.array(labels).reshape(-1, 1))

# Decode the predicted label
predicted_class = enc.inverse_transform(predicted_label)

# Output the predicted emotion
print(f"The predicted emotion is: {predicted_class[0][0]}")
emotion = predicted_class[0][0]

# Set CPU-only mode for music generation
torch.set_default_device("cpu")

# Load pre-trained MusicGen model for music generation
musicgen_model = MusicGen.get_pretrained('facebook/musicgen-small')

# Set generation parameters for music
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
        print(f"Generating music for mood: {emotion}")

        # Generate music
        output = musicgen_model.generate([prompt], progress=True)
        output_wav = output[0]  # Use the first element of the list

        # Check and adjust tensor shape to 2D for saving
        if output_wav.ndimension() == 3:
            output_wav = output_wav.squeeze(0)

        # Save the generated music as a WAV file
        filename = f"generated_music_{emotion}.wav"
        if output_wav.ndimension() == 2:
            torchaudio.save(filename, output_wav, sample_rate=32000)
            print(f"✅ Music saved as: {filename}")
        else:
            print("❌ Failed to save music. Tensor shape is not valid.")
    else:
        print("❌ Unknown mood.")

# Generate music based on the emotion detected
generate_music(emotion)
