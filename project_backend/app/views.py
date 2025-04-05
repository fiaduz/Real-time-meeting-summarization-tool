from django.shortcuts import render
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import generics, permissions, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework_simplejwt.tokens import RefreshToken
from .models import VideoUpload
from .serializers import VideoUploadSerializer, UserSerializer
import whisper
import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get the API key securely
api_key = os.getenv("GEMINI_API")

# Configure Gemini with the API key
genai.configure(api_key=api_key)

# Initialize Gemini model
model = genai.GenerativeModel("gemini-2.0-flash")

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UploadView(generics.ListCreateAPIView):
    serializer_class = VideoUploadSerializer
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        video_instance = serializer.save(user=self.request.user)
        video_path = video_instance.video.path

        # Step 1: Transcribe using Whisper
        model_whisper = whisper.load_model("base")
        result = model_whisper.transcribe(video_path)
        transcription = result["text"]

        # Step 2: Process the transcription using Gemini AI
        gemini_response = model.generate_content(f"Summarize this transcript:\n{transcription}")
        final_output = gemini_response.text  # Gemini AI's response

        # Step 3: Save the processed text
        video_instance.processed_result = final_output
        video_instance.save()

        return Response({
            "message": "Video uploaded, transcribed, and processed successfully!",
            "video": {
                "id": video_instance.id,
                "user": video_instance.user.username,
                "video": video_instance.video.url,
                "transcription": transcription,
                "processed_result": final_output,
                "uploaded_at": video_instance.uploaded_at
            }
        }, status=status.HTTP_201_CREATED)

    def get_queryset(self):
        if self.request.user.is_staff:  # 🔥 Admins can see all videos
            return VideoUpload.objects.all()
        return VideoUpload.objects.filter(user=self.request.user)