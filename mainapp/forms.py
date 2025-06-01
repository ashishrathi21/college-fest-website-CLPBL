from django import forms
from .models import CreateEvent
from .models import Notification

class EventForm(forms.ModelForm):
    class Meta:
        model = CreateEvent
        fields = ['name', 'category', 'date_time', 'location','image']  # adjust fields as per your model

class NotificationForm(forms.ModelForm):
    class Meta:
        model = Notification
        fields = ['title', 'message']