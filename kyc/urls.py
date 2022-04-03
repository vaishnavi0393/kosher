from unicodedata import name
from django.urls import path

from .views import home,kyc_data,client_data,request_client_data

urlpatterns = [
    path('',home,name='home'),
    path('kyc_data',kyc_data,name='kyc_data'),
    path('client_data',client_data,name="client_data"),
    path('request_client_data',request_client_data,name="request_client_data")
]