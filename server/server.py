from flask import Flask
import os
from supabase import create_client, Client
import threading
import time
from main import AudioAnalyzer
import tempfile
import sounddevice as sd
import wavio
import re

app = Flask(__name__)

url = "https://gldvgrcsiwscznrzcgxe.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsZHZncmNzaXdzY3pucnpjZ3hlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk5NzYzMTQsImV4cCI6MjA0NTU1MjMxNH0.YAhY2yXpVLxRFErP2XS-4FhRGfFZ2BSgdSXuLdQql3U"
supabase: Client = create_client(url, key)

recording = False

audioGPT = AudioAnalyzer()

fs = 44100
channels = 1
dtype = "int16"
accumulated_transcript = ''

def fetch_data():
    """Fetch data from Supabase every 0.5 seconds."""
    
    global recording
    while True:
        try:
            response = supabase.table('callstatus').select('status').eq('id', 2).execute()
            if response.data[0]['status'] is False and not recording:
                print('Ending recording')
                recording = True
                continuous_recording(5)
        except Exception as e:
            print(f"Error fetching data: {e}")
        
        time.sleep(0.5)  # Sleep for 0.5 seconds

# Start the background thread
fetch_thread = threading.Thread(target=fetch_data, daemon=True)
fetch_thread.start()

def anonymize_transcript(transcript):
    """Anonymize PII in the transcript."""
    # Simple example: remove numbers (e.g., Social Security numbers, phone numbers)
    anonymized = re.sub(r'\d+', '[NUMBER]', transcript)
    return anonymized

def start_record(duration, filename):
    """Record audio for a specified duration and save to a file."""
    try:
        print(f"Recording for {duration} seconds...")
        recording = sd.rec(int(duration * fs), samplerate=fs, channels=channels, dtype=dtype)
        sd.wait()  # Wait until recording is finished
        wavio.write(filename, recording, fs, sampwidth=2)
        print(f"Audio segment saved to {filename}")
    except Exception as e:
        logging.error(f"Error during recording: {e}")
        print(f"Error during recording: {e}")

def process_audio_segment(file_path, segment_number):
    """Process a single audio segment: transcribe, anonymize, and classify."""
    global accumulated_transcript
    print(f"\n--- Processing Segment {segment_number} ---")
    transcribed_text = audioGPT.transcribe_audio(file_path)
    if transcribed_text is None:
        print("Failed to transcribe audio segment.")
        return

    # Anonymize the transcribed text
    transcribed_text = anonymize_transcript(transcribed_text)
    print(f"Transcribed Text (Anonymized):\n{transcribed_text}\n")

    # Acquire lock to safely update the accumulated transcript
    with threading.Lock():
        accumulated_transcript += f" {transcribed_text.strip()}"

    print(f"Accumulated Transcript:\n{accumulated_transcript}\n")

    classification = audioGPT.classify_transcript(accumulated_transcript)
    if classification is None:
        print("Failed to classify transcript.")
        return

    if classification == 'Yes':
        response = (
                supabase.table("callstatus")
                .update({"status": True})
                .eq("id", 1)
                .execute()
                )
        print("⚠️ **Scam/Spam Detected!** ⚠️\n")
    elif classification == 'No':
        # Optional: You can print legitimate calls if desired
        # print("✅ Legitimate Call.\n")
        response = (
                supabase.table("callstatus")
                .update({"status": False})
                .eq("id", 1)
                .execute()
                )
        pass
    else:
        print("❓ Classification Uncertain.\n")

def continuous_recording(duration=5):
    """Continuously record audio in segments and process each segment."""
    segment_number = 1
    try:
        while True:
            with tempfile.NamedTemporaryFile(delete=False, suffix='.wav') as tmp_file:
                filename = tmp_file.name
            # Record audio in a separate thread to prevent blocking
            record_thread = threading.Thread(target=start_record, args=(duration, filename))
            record_thread.start()
            record_thread.join()  # Wait for recording to finish

            # Process the recorded segment
            process_audio_segment(filename, segment_number)
            segment_number += 1
            response = supabase.table('callstatus').select('status').eq('id', 2).execute()
            if response.data[0]['status'] is True:
                print('Ending recording')
                break
            # Remove the temporary file after processing
            os.remove(filename)

    except KeyboardInterrupt:
        print("\nContinuous recording stopped by user.")


# response = (
#     supabase.table("callstatus")
#     .update({"status": False})
#     .eq("id", 1)
#     .execute()
# )


app.run(port=5000)
