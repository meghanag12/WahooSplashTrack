from rest_framework import serializers
from .models import Swimmer, Start

class SwimmerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Swimmer
        fields = ['swimmer_id', 'first_name', 'last_name', 'year', 'active']

class ForceSerializer(serializers.Serializer):
    force = serializers.FloatField()

class StartSerializer(serializers.ModelSerializer):
    swimmer = SwimmerSerializer()  # Nested SwimmerSerializer
    front_force = ForceSerializer(many=True)  # Array of forces
    back_force = ForceSerializer(many=True)   # Array of forces

    class Meta:
        model = Start
        fields = ['swimmer', 'start_id', 'date', 'front_force', 'back_force']
