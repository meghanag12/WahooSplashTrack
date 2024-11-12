from rest_framework import serializers
from ..models import Swimmer, Start, MyRio

class SwimmerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Swimmer
        fields = ['swimmer_name', 'year', 'active']

class StartSerializer(serializers.ModelSerializer):
    swimmer_name = serializers.PrimaryKeyRelatedField(queryset=Swimmer.objects.all())  # ForeignKey to Swimmer model

    class Meta:
        model = Start
        fields = ['swimmer_name', 'start_id', 'date', 'total_force', 'front_force', 'back_force']  # include swimmer_name here

class MyRioSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyRio
        fields = ['total_force', 'front_force', 'back_force', 'timestamp']
