#used for handing API endpoints -- instead of rendering templates 
#these views interact with serializers and the output is typically 
#a JSON 

from rest_framework.viewsets import ModelViewSet
from ..models import Swimmer, Start
from .serializers import SwimmerSerializer, StartSerializer

from rest_framework.response import Response
from rest_framework import status

#handle logic behind the API endpoints associated with "swimmer" and "start" resources
class SwimmerViewSet(ModelViewSet):
    queryset = Swimmer.objects.all()
    serializer_class = SwimmerSerializer

    def update(self, request, swimmer_id):
        try:
            swimmer = Swimmer.objects.get(swimmer_id=swimmer_id) 
        except Swimmer.DoesNotExist:
            return Response({'error': 'Swimmer not found.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = SwimmerSerializer(swimmer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def destory(self, request, swimmer_id, pk = None):
        try:
            swimmer = Swimmer.objects.get(swimmer_id=swimmer_id) 
        except Swimmer.DoesNotExist:
            return Response({'error': 'Swimmer not found.'}, status=status.HTTP_404_NOT_FOUND)
        swimmer.delete()
        return Response({'message': 'Swimmer deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)


class StartViewSet(ModelViewSet):
    queryset = Start.objects.all()
    serializer_class = StartSerializer

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

