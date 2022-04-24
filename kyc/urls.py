
from multiprocessing.connection import Client
from django.urls import path
from .views import AdminPage, ClientData, KycData, gen_kyc_url, AdminPage ,KycData,ClientData,kyc_url



urlpatterns = [
    path('', AdminPage.as_view(), name='home'),
    path('kyc_data',KycData.as_view(),name='kyc_data'),
    path('kyc_form',KycData.as_view(),name="kyc_form"),
    path('client_data',ClientData.as_view(),name="client_data"),
    path('kyc_url',kyc_url,name="kyc_url"),
    path('gen_kyc_url',gen_kyc_url,name="gen_kyc_url"),
]