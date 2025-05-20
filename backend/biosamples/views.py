from rest_framework import viewsets
from .models import BioSample, Comment
from .serializers import BioSampleSerializer, CommentSerializer

class BioSampleViewSet(viewsets.ModelViewSet):
    """
    API endpoint for CRUD operations on BioSamples
    """
    queryset = BioSample.objects.all()
    serializer_class = BioSampleSerializer

class CommentViewSet(viewsets.ModelViewSet):
    """
    API endpoint for CRUD operations on Comments
    """
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer