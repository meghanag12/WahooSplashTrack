from rest_framework.serializers import ModelSerializer
from ..models import TestPost, RecordMagnitude

class TestPostSerializer(ModelSerializer):
    class Meta: 
        model = TestPost 
        fields = ('id', 'name', 'description', 'code')

class RecordMagnitudeSerializer(ModelSerializer):
    class Meta:
        model = RecordMagnitude
        fields = ('swimmer_name', 'magnitude')
