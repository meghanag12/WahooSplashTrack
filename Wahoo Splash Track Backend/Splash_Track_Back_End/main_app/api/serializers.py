from rest_framework import serializers
from ..models import Swimmer, Start, MyRio

class SwimmerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Swimmer
        fields = ['full_name', 'year', 'active']

class StartSerializer(serializers.ModelSerializer):
    swimmer_id = serializers.PrimaryKeyRelatedField(queryset=Swimmer.objects.all())  # Accepts swimmer_id instead of nested object

    class Meta:
        model = Start
        fields = ['full_name', 'start_id', 'date', 'front_force', 'back_force']

class MyRioSerializer(serializers.ModelSerializer):
    class Meta: 
        model = MyRio 
        fields = ['sensor_value', 'front_force', 'back_force', 'time_stamp']
