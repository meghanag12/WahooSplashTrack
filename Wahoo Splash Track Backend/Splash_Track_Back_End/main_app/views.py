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
        serializer = StartSerializer(starts, many = True)
        return JsonResponse(serializer.data, safe = False)

    if request.method == 'POST':
       serializer = StartSerializer(data = request.data) 
       if serializer.is_valid():
           serializer.save()
           return Response(serializer.data, status = status.HTTP_201_CREATED)
           

@api_view(['GET', 'POST'])
def swimmer_list(request):
    if request.method == 'GET':
        swimmers = Swimmer.objects.all() 
        serializer = SwimmerSerializer(swimmers, many = True)
        return JsonResponse(serializer.data, safe = False)

    if request.method == 'POST':
       serializer = SwimmerSerializer(data = request.data)
       if serializer.is_valid():
           serializer.save()
           return Response(serializer.data, status = status.HTTP_201_CREATED)
       

