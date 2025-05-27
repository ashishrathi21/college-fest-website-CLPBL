from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import StudentRegisterForm

def register(request):
    if request.method == 'POST':
        form = StudentRegisterForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Account Created Successfully! You can now log in.")
            return redirect('/student_dashboard/')  # Redirect to your login page or dashboard
    else:
        form = StudentRegisterForm()
    return render(request, 'mainapp/signup.html', {'form': form})


# Create your views here.


def index(request):
    return render(request, 'mainapp/index.html')

def schedule(request):
    return render(request, 'mainapp/schedule.html')

def about(request):
    return render(request, 'mainapp/about.html')

def contact(request):
    return render(request, 'mainapp/contact.html')

def login_view(request):
    return render(request, 'mainapp/login.html')

def signup_view(request):
    return render(request, 'mainapp/signup.html')

def student_dashboard(request):
    return render(request, 'mainapp/student_dashboard/studentDash.html')

