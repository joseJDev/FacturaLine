# Django
from django.urls import path

# Views
from .views import (
    HomeView, ClientListTemplate,
    ClientListView, ClientCreateView,
    ClientUpdateView, ClientDeleteView
)

urlpatterns = [
    path('', HomeView.as_view(), name='home'),
    path('client/', ClientListTemplate.as_view(), name='list_client'),
    path('client-list/', ClientListView.as_view(), name='list_client_ajax'),
    path('client-create/', ClientCreateView.as_view(), name='create_client'),
    path('client-update/<int:pk>', ClientUpdateView.as_view(), name='update_client'),
    path('client-delete/<int:pk>', ClientDeleteView.as_view(), name='delete_client'),
]
