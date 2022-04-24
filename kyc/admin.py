import site
from django.contrib import admin
from .models import KYC_URL_DB, KYC_data

# Register your models here.

admin.site.register(KYC_data)

admin.site.register(KYC_URL_DB)
