from django.views.generic import RedirectView
from django.urls import path
from .views import AdminPage, ClientData, KycData, gen_kyc_url, AdminPage ,KycData,ClientData,kyc_url,Test1



urlpatterns = [
    path('', AdminPage.as_view(), name='home'),
    path('kyc_data',KycData.as_view(),name='kyc_data'),
    path('kyc_form',KycData.as_view(),name="kyc_form"),
    path('client_data',ClientData.as_view(),name="client_data"),
    path('kyc_url',kyc_url,name="kyc_url"),
    path('gen_kyc_url',gen_kyc_url,name="gen_kyc_url"),
    path('test1',Test1.as_view(),name='test1'),
    path('success_page',Test1.as_view(),name='success'),
    
]
