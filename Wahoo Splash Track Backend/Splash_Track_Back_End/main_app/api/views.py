#used for handing API endpoints -- instead of rendering templates 
#these views interact with serializers and the output is typically 
#a JSON 

from rest_framework.viewsets import ModelViewSet
from ..models import Swimmer, Start, MyRio
from .serializers import SwimmerSerializer, StartSerializer, MyRioSerializer
from django.http import JsonResponse
import json

from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

#handle logic behind the API endpoints associated with "swimmer" and "start" resources
class SwimmerViewSet(ModelViewSet):
    queryset = Swimmer.objects.all()
    serializer_class = SwimmerSerializer
    
    def put(self, request, swimmer_name):
         try:
            swimmer = Swimmer.objects.get(swimmer_name=swimmer_name)
            new_swimmer_name = request.data.get("swimmer_name")
            if new_swimmer_name and new_swimmer_name != swimmer_name:
                # Check for duplicates
                if Swimmer.objects.filter(swimmer_name=new_swimmer_name).exists():
                    return Response({"error": "Swimmer name already exists"}, status=status.HTTP_400_BAD_REQUEST)
                swimmer.swimmer_name = new_swimmer_name
            
            serializer = SwimmerSerializer(swimmer, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
         except Swimmer.DoesNotExist:
            return Response({"error": "Swimmer not found"}, status = status.HTTP_404_NOT_FOUND)
            
    
    def destroy(self, request, swimmer_id, pk=None):
        try:
            swimmer = Swimmer.objects.get(swimmer_id=swimmer_id) 
        except Swimmer.DoesNotExist:
            return Response({'error': 'Swimmer not found.'}, status=status.HTTP_404_NOT_FOUND)
        swimmer.delete()
        return Response({'message': 'Swimmer deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)

class StartViewSet(ModelViewSet):
    queryset = Start.objects.all()
    serializer_class = StartSerializer

    @action(detail=False, methods=['get'], url_path='(?P<name>[^/.]+)')
    def by_swimmer_name(self, request, name=None):
        try:
            swimmer = Swimmer.objects.get(swimmer_name=name)
            starts = Start.objects.filter(swimmer_name=swimmer)
            serializer = StartSerializer(starts, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Swimmer.DoesNotExist:
            return Response({'error': 'Swimmer not found.'}, status=status.HTTP_404_NOT_FOUND)

    def update(self, request, start_id):
        try:
            start = Start.objects.get(start_id=start_id)
        except Start.DoesNotExist:
            return Response({'error': 'Start not found.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = StartSerializer(start, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ViewSet for MyRio
class MyRioViewSet(ModelViewSet):
    queryset = MyRio.objects.all()
    serializer_class = MyRioSerializer

    # def get_myrio_data(self, request):
    #     try: 
    #         #figure out what 
    #         myrio_data = request.get("insert the api endpoint here").json() 
    #         sensor_data = MyRio(
    #               front_force = myrio_data['Front Force'], 
    #               back_force = myrio_data['Back Force'],
    #               total_force = myrio_data['Total Force'],
    #         )
    #         sensor_data.save()
    #         return Response(sensor_data)
    #     except request.RequestException as e: 
    #           return Response({"error": "Unable to fetch data from myRIO"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # def create(self, request):
    #     sensor_value = request.data.get('sensor_value')
    #     front_force = request.data.get('front_force')
    #     back_force = request.data.get('back_force')
    #     if sensor_value is None:
    #         return Response({"error": "sensor_value is required"}, status=status.HTTP_400_BAD_REQUEST)
    #     if front_force is None:
    #         return Response({"error": "front_force is required"}, status=status.HTTP_400_BAD_REQUEST)
    #     if back_force is None:
    #         return Response({"error": "back_force is required"}, status=status.HTTP_400_BAD_REQUEST)
        
    #     new_data = MyRio(
    #         sensor_value=sensor_value,
    #         front_force=front_force,
    #         back_force=back_force,
    #     )
    #     new_data.save()
    #     serializer = self.get_serializer(new_data)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED)
        #return Response({"status": "Data saved successfully"}, status=status.HTTP_201_CREATED)

