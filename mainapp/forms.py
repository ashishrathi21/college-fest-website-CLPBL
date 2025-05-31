from django import forms
from .models import CreateEvent

class EventForm(forms.ModelForm):
    class Meta:
        model = CreateEvent
        fields = ['name', 'category', 'date_time', 'location','image']  # adjust fields as per your model
