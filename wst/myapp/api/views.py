from rest_framework.viewsets import ModelViewSet
from ..models import TestPost, RecordMagnitude
from .serializers import TestPostSerializer, RecordMagnitudeSerializer

class TestPostViewSet(ModelViewSet):
    queryset = TestPost.objects.all()
    serializer_class = TestPostSerializer

class MagnitudeRecorderViewSet(ModelViewSet):
    queryset = RecordMagnitude.objects.all()
    serializer_class = RecordMagnitudeSerializer
