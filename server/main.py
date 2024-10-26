import os
from dotenv import load_dotenv
import openai

import sys
print("Python executable:", sys.executable)

# Load environment variables from the .env file
load_dotenv()

# Set the OpenAI API key
openai.api_key = os.getenv('OPENAI_API_KEY')

def transcribe_audio(file_path):
    """Transcribe audio using OpenAI's Whisper API."""
    try:
        audio_file = open(file_path, 'rb')
        transcript = openai.Audio.transcribe(
            model="whisper-1",
            file=audio_file
        )
        return transcript['text']
    except Exception as e:
        print(f"Error during transcription: {e}")
        return None

def classify_transcript(transcribed_text):
    """Classify the transcript using GPT-3.5 Turbo."""
    prompt = f"""
You are an assistant that classifies phone call transcripts as 'spam' or 'legitimate'.

Transcript:
\"\"\"
{transcribed_text}
\"\"\"

Please answer with 'spam' or 'legitimate' and provide a brief explanation.
"""
    try:
        response = openai.ChatCompletion.create(
            model='gpt-3.5-turbo',
            messages=[
                {'role': 'user', 'content': prompt}
            ],
            temperature=0,
            max_tokens=100,
            n=1,
            stop=None,
        )
        classification = response['choices'][0]['message']['content']
        return classification.strip()
    except Exception as e:
        print(f"Error during classification: {e}")
        return None

def detect_spam_call(file_path):
    """Full pipeline: Transcribe and classify the audio file."""
    print("Transcribing audio...")
    transcribed_text = transcribe_audio(file_path)
    if transcribed_text is None:
        print("Failed to transcribe audio.")
        return

    print("Transcription complete.")
    print(f"Transcribed Text:\n{transcribed_text}\n")

    print("Classifying transcript...")
    classification = classify_transcript(transcribed_text)
    if classification is None:
        print("Failed to classify transcript.")
        return

    print("Classification complete.")
    print(f"\nClassification Result:\n{classification}")

if __name__ == '__main__':
    # Specify the path to your audio file
    audio_file_name = 'test_audio.wav'  # Replace with your audio file name
    script_dir = os.path.dirname(os.path.abspath(__file__))
    audio_file_path = os.path.join(script_dir, audio_file_name)

    # Check if the audio file exists
    if not os.path.exists(audio_file_path):
        print(f"Audio file not found at path: {audio_file_path}")
    else:
        # Run the spam call detection
        detect_spam_call(audio_file_path)
