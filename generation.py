import random
import torch
import torchaudio
from audiocraft.models import MusicGen

# Set CPU-only mode
torch.set_default_device("cpu")

# Load pre-trained MusicGen model
model = MusicGen.get_pretrained('facebook/musicgen-small')

# Set generation parameters
model.set_generation_params(duration=5, top_k=250, top_p=0.8, temperature=1.0)

# Define prompts for each mood
prompts = {
    "surprise": ["surprising, uplifting music", "exciting, unexpected instrumental music"],
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
        print(f"Generating music for mood: {emotion} with prompt: {prompt}")

        # Generate music
        output = model.generate([prompt], progress=True)
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

# Example usage: assume the mood classifier outputs "happy"
# Integrate this function into your web frontend, where the classifier result is passed to generate_music
classifier_output = "happy"  # This is a sample output from the mood classifier
generate_music(classifier_output)
