
import re
from django.shortcuts import redirect, render
from django.http import Http404,HttpResponse,HttpRequest
import json
from .models import KYC_data
from django.db import IntegrityError
from django.core.serializers import serialize

# Create your views here.

def home(request):
    """ return HttpResponse("Hello") """
    try:
        return render(request,'kyc/kyc_form.html',{})
    except:
        raise Http404("Page not found")

def kyc_data(request):
        dt = json.loads(request.body)

        try:
            k = KYC_data.objects.create(
            name = dt['identity_details']['name'],
            gender = dt['identity_details']['gender'],
            marital_status = dt['identity_details']['marital_status'],
            dob = dt['identity_details']['dob'],
            nationality = dt['identity_details']['nationality'],
            status = dt['identity_details']['status'],
            pan = dt['identity_details']['PAN_number'],
            aadhar = dt['identity_details']['aadhar_number'],
            permanent_address = dt['address_details']['permanent_address'],
            communication_address = dt['address_details']['communication_address'],
            contact_no = dt['address_details']['contact_number'],
            email_ad = dt['address_details']['email'],
            gross_annual_income = dt['other_information']['gross_annual_income'],
            occupation = dt['other_information']['occupation'],
            applicable_type = dt['other_information']['applicable_type'],
            KYC_check = dt['other_information']['KYC_check'],
            experience = dt['investment_profile']['investment_experience_in_security'],
            goals = dt['investment_profile']['investment_goals'],
            risk = dt['investment_profile']['risk_tolerance'],
            objective = dt['investment_profile']['investment_objectives']
            )
            return HttpResponse("success")
            

        except IntegrityError:
            return HttpResponse("failed")



def client_data(request):
    all_entries = serialize("json",KYC_data.objects.all())
    return HttpResponse(all_entries, content_type="application/ld+json")
     
def request_client_data(request):
     return render(request,'kyc/client_data.html',{})
  
