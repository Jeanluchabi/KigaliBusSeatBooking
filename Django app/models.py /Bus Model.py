# In models.py of your Django app

from django.db import models

class Bus(models.Model):
    bus_number = models.CharField(max_length=20, unique=True)
    capacity = models.IntegerField()
    route = models.CharField(max_length=100)
    departure_time = models.DateTimeField()

    def __str__(self):
        return self.bus_number
