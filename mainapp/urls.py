from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name='index'),
    path('schedule/', views.schedule, name='schedule'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    path('login/', views.login_view, name='login'),
    path('signup/', views.signup_view, name='signup'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('logout/', views.logout_user, name='logout'),
    path('admin_dashboard/', views.admin_dashboard, name='admin_dashboard'),
    path('manage_event/', views.manage_event, name='manage_event'),
    path('event_dashboard/', views.event_dashboard, name='event_dashboard'),
    path('my_registration/', views.my_registration, name='my_registration'),
    path('notification/', views.notification, name='notification'),
    path('register/event_dashboard/', views.register_event, name='register_event'),
    path('create_event/', views.create_event, name='create_event'),
    path('event/delete/<int:event_id>/', views.delete_event, name='delete_event'),
   path('view_participants/', views.view_participants, name='view_participants'),
    path('register/<int:event_id>/', views.register_event, name='register_event'),
    path('send_notification/', views.send_notification, name='send_notification'),
    path('admin_notifications/', views.admin_notifications, name='admin_notification'),
    path('delete_notification/<int:note_id>/', views.delete_notification, name='delete_notification'),


]