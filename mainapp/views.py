from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required, user_passes_test
from .models import Event, Registration
from .forms import EventForm
from .models import CreateEvent
from django.http import Http404


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
    user = request.user

    registrations = Registration.objects.filter(user=user)
    registered_events = [r.event for r in registrations]

    return render(request, 'mainapp/student_dashboard/studentDash.html', {
        'username': user.username,
        'email': user.email,
        'registered_events': registered_events,
    })

@login_required
def register_event(request, event_id):
    if request.method == "POST":
        try:
            event = CreateEvent.objects.get(id=event_id)
            registration, created = Registration.objects.get_or_create(user=request.user, event=event)

            if created:
                messages.success(request, "Successfully registered for event.")
            else:
                messages.info(request, "You have already registered for this event.")
        except CreateEvent.DoesNotExist:
            messages.error(request, "Event not found.")

        return redirect('event_dashboard')


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

@login_required
@user_passes_test(admin_required)
def manage_event(request):
    events = CreateEvent.objects.all()
    context = {
        'username': request.user.username,
        'email': request.user.email,
        'events': events,   
    }
    return render(request, 'mainapp/admin_dashboard/manageevent.html', context)

@login_required
def event_dashboard(request):
    events = CreateEvent.objects.all()
    registrations = Registration.objects.filter(user=request.user)
    registered_event_ids = registrations.values_list('event_id', flat=True)

    return render(request, 'mainapp/student_dashboard/eventdashboard.html', {
        'username': request.user.username,
        'email': request.user.email,
        'events': events,
        'registered_event_ids': registered_event_ids
    })

@login_required
def my_registration(request):
    user = request.user
    registrations = Registration.objects.filter(user=user)
    
    return render(request, 'mainapp/student_dashboard/myregistration.html', {
        'username': user.username,
        'email': user.email,
        'registrations': registrations,
    })

def notification(request):
    return render(request, 'mainapp/student_dashboard/notification.html', {
        'username': request.user.username,
        'email': request.user.email
    })


def create_event(request):
    if request.method == "POST":
        form = EventForm(request.POST, request.FILES)  # in case you want image upload
        if form.is_valid():
            form.save()
            return redirect('manage_event')  # redirect to your manage events page after creation
    else:
        form = EventForm()
    return render(request, 'mainapp/admin_dashboard/create_event.html', {'form': form}) 


def delete_event(request, event_id):
    if request.method == 'POST':
        try:
            event = CreateEvent.objects.get(id=event_id)
        except Event.DoesNotExist:
            raise Http404("Event not found")
        event.delete()
        return redirect('manage_event')
    else:
        return redirect('manage_event')
    
    
@login_required
@user_passes_test(lambda u: u.is_staff)
def view_participants(request):
    registrations = Registration.objects.select_related('user', 'event').order_by('-registered_at')
    return render(request, 'mainapp/admin_dashboard/view_participants.html', {
        'registrations': registrations,
        'username': request.user.username,
        'email': request.user.email
    })

