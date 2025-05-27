from django.urls import path
from . import views
from .views import register

urlpatterns = [
    path('', views.index, name='index'),
    path('schedule/', views.schedule, name='schedule'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
     path('login/', views.login_view, name='login'),
     path('signup/', views.signup_view, name='signup'),
      path('register/', register, name='register'),
      path('student_dashboard/', views.student_dashboard, name='student_dashboard'),
]
