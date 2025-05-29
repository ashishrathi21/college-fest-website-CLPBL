from django.db import models
from django.contrib.auth.models import User

class Event(models.Model):
    title = models.CharField(max_length=100)
    date = models.DateField()
    time = models.TimeField()
    image = models.ImageField(upload_to='mainapp/images/scheduleImages/')

    def __str__(self):
        return self.title

class Registration(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    registered_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} registered for {self.event.title}"

class CreateEvent(models.Model):
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    date_time = models.DateTimeField()
    location = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    status = models.CharField(max_length=50)
    image = models.ImageField(upload_to='event_images/', blank=True, null=True)

    def __str__(self):
        return self.name