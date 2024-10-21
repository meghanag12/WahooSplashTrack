from rest_framework import serializers
from ..models import Swimmer, Start

class SwimmerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Swimmer
        fields = ['swimmer_id', 'first_name', 'last_name', 'year', 'active']

class StartSerializer(serializers.ModelSerializer):
    swimmer = serializers.PrimaryKeyRelatedField(queryset=Swimmer.objects.all())  # Accepts swimmer_id instead of nested object

    class Meta:
        model = Start
        fields = ['swimmer', 'start_id', 'date', 'front_force', 'back_force']
