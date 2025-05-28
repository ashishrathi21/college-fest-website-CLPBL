from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required, user_passes_test


# Create your views here.

def index(request):
    return render(request, 'mainapp/index.html')

def schedule(request):
    return render(request, 'mainapp/schedule.html')

def about(request):
    return render(request, 'mainapp/about.html')

def contact(request):
    return render(request, 'mainapp/contact.html')



def signup_view(request):
    if request.method == 'POST':
        username = request.POST['fullname']
        email = request.POST['email']
        password = request.POST['password']

        if User.objects.filter(username=username).exists():
            return render(request, "mainapp/signup.html", {"error": "Username already exists. please Login"})
            

        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()
        messages.success(request, "Account created successfully. Please log in.")

        return redirect('login')

    return render(request, 'mainapp/signup.html')

def login_view(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']

        try:
            # Find user by email
            user_obj = User.objects.get(email=email)
            # Authenticate with the username (which was stored as fullname)
            user = authenticate(request, username=user_obj.username, password=password)
        except User.DoesNotExist:
            user = None

        if user is not None:
            login(request, user)
            if user.is_staff:
                return redirect('admin_dashboard')  # Define this URL in urls.py
            else:
                return redirect('dashboard') 
        else:
            return render(request, "mainapp/login.html", {"error": "Invalid credentials."})

    return render(request, 'mainapp/login.html')

@login_required(login_url='login')
def dashboard(request):
    return render(request, 'mainapp/student_dashboard/studentDash.html', {
        'username': request.user.username,
        'email': request.user.email
    })

def logout_user(request):
    logout(request)
    return redirect('login')


def admin_required(user):
    return user.is_staff

@login_required
@user_passes_test(admin_required)
def admin_dashboard(request):
    context = {
        'username': request.user.username,
        'email': request.user.email,
    }
    return render(request, 'mainapp/admin_dashboard/admin.html', context)

def event_dashboard(request):
    return render(request, 'mainapp/student_dashboard/eventdashboard.html', {
        'username': request.user.username,
        'email': request.user.email
    })


def my_registration(request):
    return render(request, 'mainapp/student_dashboard/myregistration.html', {
        'username': request.user.username,
        'email': request.user.email
    })

def notification(request):
    return render(request, 'mainapp/student_dashboard/notification.html', {
        'username': request.user.username,
        'email': request.user.email
    })

