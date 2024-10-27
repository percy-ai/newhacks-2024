import os
import time
import numpy as np
import openai
import wavio
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()

# Set the OpenAI API key
openai.api_key = os.getenv('OPENAI_API_KEY')


class AudioAnalyzer:
    def __init__(self):
        # Global variables
        self.fs = 44100  # Sampling frequency
        self.channels = 1  # Mono audio
        self.dtype = 'int16'  # Data type
        self.recording_data = []  # List to store recording data
        self.stream = None  # To hold the stream object
        self.file_name = ""

    def start_recording(self):
        """Start recording audio from the microphone."""
        self.recording_data = []  # Reset the recording data

        def callback(indata, frames, time, status):
            """Callback function to collect audio data."""
            if status:
                print(status)
            self.recording_data.append(indata.copy())

        self.stream = sd.InputStream(samplerate=self.fs, channels=self.channels, dtype=self.dtype, callback=callback)
        self.stream.start()
        print("Recording started.")

    def stop_recording(self):
        """Stop recording and save the audio to a file."""
        if self.stream is not None:
            self.stream.stop()
            self.stream.close()
            self.stream = None
            print("Recording stopped.")
            # Concatenate the recorded data
            audio_data = np.concatenate(self.recording_data)
            # Save to a WAV file
            filename = 'recorded_audio.wav'
            wavio.write(filename, audio_data, self.fs, sampwidth=2)
            print("Audio saved to", filename)
            self.file_name = filename
        else:
            print("No recording in progress.")

    def transcribe_audio(self, file_path):
        """Transcribe audio using OpenAI's Whisper API."""
        try:
            with open(file_path, 'rb') as audio_file:
                transcript = openai.Audio.transcribe(
                    model="whisper-1",
                    file=audio_file
                )
            print(transcript)
            return transcript['text']
        except Exception as e:
            print(f"Error during transcription: {e}")
            return None

    def classify_transcript(self, transcribed_text):
        """Classify the transcript as 'Yes' for scam or 'No' for legitimate."""
        prompt = f"""
        You are an assistant that classifies phone call transcripts as 'spam' or 'legitimate'.

        Here are some examples:

        ---
        Transcript:
        "Hello, this is Agent Smith from the IRS. We've detected some irregularities in your tax returns and you owe $2,000. Please call us back immediately to resolve this matter."
        Label:
        Yes
        ---
        Transcript:
        "Good afternoon! I'm Lisa from Verizon. We're offering a special discount on your current phone plan. Would you like to upgrade to our premium package?"
        Label:
        No
        ---
        Transcript:
        "Hi, this is Karen from Microsoft Support. We've noticed unusual activity on your computer. Please allow me remote access to fix the issue."
        Label:
        Yes
        ---
        Transcript:
        "Hello, this is Dr. Thompson from your local clinic. We're reminding you of your dental appointment scheduled for tomorrow at 10 AM."
        Label:
        No
        ---

        Now, classify the following transcript:

        Transcript:
        \"\"\"
        {transcribed_text}
        \"\"\"

        Please analyze the above transcript and answer with 'Yes' if the call is spam/scam, or 'No' if it is legitimate. Do not provide any additional text or explanations.
        """
        # Rest of the function remains the same...

        try:
            response = openai.ChatCompletion.create(
                model='gpt-4-turbo',
                messages=[
                    {'role': 'user', 'content': prompt}
                ],
                temperature=0,
                max_tokens=100,
                n=1,
                stop=None,
            )
            classification = response['choices'][0]['message']['content'].strip().lower()
            if 'yes' in classification:
                return 'Yes'
            elif 'no' in classification:
                return 'No'
            else:
                return 'Uncertain'
        except Exception as e:
            print(f"Error during classification: {e}")
            return None

    def analyze(self):
        """Returns true if text is spam/scam"""
        
        if os.path.exists(self.file_name):
            transcript = self.transcribe_audio(self.file_name)
            value = self.classify_transcript(transcript)
            if value == "Yes":
                return True
        return False

