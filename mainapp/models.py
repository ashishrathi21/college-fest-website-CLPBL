from django.db import models
from django.contrib.auth.models import User

class Event(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='event_images/')  # Images yahan save hongi

    def __str__(self):
        return self.name





class CreateEvent(models.Model):
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    date_time = models.DateTimeField()
    location = models.CharField(max_length=255)
    image = models.ImageField(upload_to='event_images/', blank=True, null=True)

    def __str__(self):
        return self.name
    
class Registration(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(CreateEvent, on_delete=models.CASCADE)  # 🔁 Update here
    registered_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} registered for {self.event.name}"