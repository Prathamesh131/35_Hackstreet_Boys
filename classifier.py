import numpy as np
import librosa
from sklearn.preprocessing import OneHotEncoder
from keras.models import load_model
import os
import sys
import traceback

# Function to extract MFCC features
def extract_mfcc(filename):
    try:
        y, sr = librosa.load(filename, duration=3, offset=0.5)
        mfcc = np.mean(librosa.feature.mfcc(y=y, sr=sr, n_mfcc=40).T, axis=0)
        return mfcc
    except Exception as e:
        print(f"Error extracting MFCC: {str(e)}")
        sys.exit(1)

# Function to preprocess the input file
def preprocess_input(file_path):
    mfcc = extract_mfcc(file_path)
    mfcc = np.expand_dims(mfcc, -1)  # Adding a feature dimension
    return mfcc

# Ensure a file path is provided
if len(sys.argv) < 2:
    print("Error: No file path provided.")
    sys.exit(1)

input_file = sys.argv[1]  # Get file path from command-line argument

# Ensure the file exists
if not os.path.exists(input_file):
    print(f"Error: The audio file at {input_file} does not exist.")
    sys.exit(1)

# Define model path (Fixed Windows Path)
model_file = r"D:\\sem 6\\genesys\\speech-mood-music\\my_model.keras"

if not os.path.exists(model_file):
    print(f"Error: The model file at {model_file} does not exist.")
    sys.exit(1)

try:
    print("🔍 Loading model...")
    model = load_model(model_file)
    print("✅ Model loaded successfully.")

    # Preprocess the input file
    print("🎵 Extracting MFCC features...")
    input_features = preprocess_input(input_file)

    # Add batch dimension and predict
    input_features = np.expand_dims(input_features, axis=0)
    print("🧠 Running prediction...")
    predicted_label = model.predict(input_features)

    # Define emotion labels
    labels = ['fear', 'angry', 'disgust', 'neutral', 'sad', 'ps', 'happy']

    # Use argmax for prediction (Fix OneHotEncoder issue)
    predicted_index = np.argmax(predicted_label, axis=1)[0]
    predicted_class = labels[predicted_index]

    print(f"🎭 Predicted Emotion: {predicted_class}")

except Exception as e:
    print("❌ Error:", str(e))
    print(traceback.format_exc())
    sys.exit(1)