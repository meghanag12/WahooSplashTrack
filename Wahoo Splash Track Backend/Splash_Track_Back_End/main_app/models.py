from django.db import models

# Create your models here.

class Swimmer(models.Model):
    #swimmer_name = models.AutoField(primary_key=True, unique = True)  
    swimmer_name = models.CharField(unique = True, primary_key = True)
    year = models.CharField(max_length=100)
    active = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.swimmer_name}'

class Start(models.Model):
    swimmer_name= models.ForeignKey(Swimmer, on_delete=models.CASCADE, null = True)
    start_id = models.AutoField(primary_key = True)
    date = models.DateTimeField(auto_now_add=True)
    total_force = models.JSONField()
    front_force = models.JSONField()
    back_force = models.JSONField()

    def __str__(self):
      return f'Start {self.start_id} for Swimmer {self.swimmer}'

class MyRio(models.Model):
    total_force = models.FloatField(default = 0.0)
    front_force = models.FloatField(default = 0.0)
    back_force = models.FloatField(default = 0.0)
    timestamp = models.DateTimeField(auto_now_add=True)


