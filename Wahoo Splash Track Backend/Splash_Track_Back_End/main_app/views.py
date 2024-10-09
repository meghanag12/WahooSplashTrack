from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from .serializers import StartSerializer, SwimmerSerializer
from .models import Swimmer, Start  
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_protect
# Create your views here.
#HTML Handler
def say_hello(request):
   return HttpResponse("Hello World")

def insert_data(request):
    return HttpResponse('Returning all users')


#get all the swims and serialize then return JSON

@csrf_protect
@api_view(['GET', 'POST'])
def start_list(request):
    if request.method == 'GET':
        starts = Start.objects.all()
        serializer = StartSerializer(starts, many=True)
        return JsonResponse(serializer.data, safe=False)

    if request.method == 'POST':
        serializer = StartSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

           
#note only use PUT when updating an existing record and PUT and DELETE follow same URL pattern 
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def swimmer_list(request, swimmer_id=None):
    if request.method == 'GET':
        swimmers = Swimmer.objects.all() 
        serializer = SwimmerSerializer(swimmers, many=True)
        return JsonResponse(serializer.data, safe=False)

    if request.method == 'POST':
        serializer = SwimmerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'PUT':
        try:
            swimmer = Swimmer.objects.get(swimmer_id=swimmer_id)
        except Swimmer.DoesNotExist:
            return Response({'error': 'Swimmer not found.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = SwimmerSerializer(swimmer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        try:
            swimmer = Swimmer.objects.get(swimmer_id=swimmer_id)
        except Swimmer.DoesNotExist:
            return Response({'error': 'Swimmer not found.'}, status=status.HTTP_404_NOT_FOUND)
        
        swimmer.delete()
        return Response({'message': 'Swimmer deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
       

