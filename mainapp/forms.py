from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class StudentRegisterForm(UserCreationForm):
    fullname = forms.CharField(max_length=100, required=True, label="Full Name")
    email = forms.EmailField(required=True, label="Student Email")

    class Meta:
        model = User
        fields = ['fullname', 'email', 'username', 'password1', 'password2']

    def save(self, commit=True):
        user = super().save(commit=False)
        full_name = self.cleaned_data.get('fullname')
        if full_name:
            names = full_name.split(' ', 1)
            user.first_name = names[0]
            if len(names) > 1:
                user.last_name = names[1]
        user.email = self.cleaned_data.get('email')
        if commit:
            user.save()
        return user
