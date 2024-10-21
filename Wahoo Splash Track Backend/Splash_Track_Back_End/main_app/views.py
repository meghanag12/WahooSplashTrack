from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_protect
from .models import Swimmer, Start  
from .api.serializers import StartSerializer, SwimmerSerializer

def say_hello(request):
   return HttpResponse("Hello World")

def insert_data(request):
    return HttpResponse('Returning all users')
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

@api_view(['GET', 'PUT', 'DELETE'])
def start_detail(request, start_id):
    try:
        start = Start.objects.get(start_id=start_id)
    except Start.DoesNotExist:
        return Response({'error': 'Start not found.'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = StartSerializer(start)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = StartSerializer(start, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        start.delete()
        return Response({'message': 'Start deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def swimmer_list(request):
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

@api_view(['GET', 'PUT', 'DELETE'])
def swimmer_detail(request, swimmer_id):
    try:
        swimmer = Swimmer.objects.get(swimmer_id=swimmer_id) 
    except Swimmer.DoesNotExist:
        return Response({'error': 'Swimmer not found.'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = SwimmerSerializer(swimmer)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = SwimmerSerializer(swimmer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        swimmer.delete()
        return Response({'message': 'Swimmer deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)

