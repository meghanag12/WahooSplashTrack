from django.db import models

# Create your models here.

#Swimmers Name 
class Swimmer(models.Model):
    swimmer_id = models.CharField(max_length = 100) 

class RecordMagnitude(models.Model):
    retrieve_swimmer = models.CharField(max_length = 100)
    magnitude = models.FloatField(default = 0.0)

