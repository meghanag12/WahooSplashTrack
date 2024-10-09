from rest_framework import serializers
from .models import Swimmer, Start

class SwimmerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Swimmer
        fields = ['swimmer_id', 'first_name', 'last_name', 'year', 'active']

class StartSerializer(serializers.ModelSerializer):
    swimmer = SwimmerSerializer()  # Nested SwimmerSerializer

    class Meta:
        model = Start
        fields = ['swimmer', 'start_id', 'date', 'front_force', 'back_force']
