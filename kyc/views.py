
from django.shortcuts import render
from django.http import Http404,HttpResponse
import json
from .models import KYC_URL_DB, KYC_data
from django.db import IntegrityError
from django.core.serializers import serialize
from b64uuid import B64UUID
from django.views import View
from django.contrib.auth.decorators import login_required
from django.contrib.admin.views.decorators import staff_member_required
from django.utils.decorators import method_decorator
from django.conf import settings




# Create your views here.
class AdminPage(View):
    @method_decorator(staff_member_required)
    def get(self,request):  
        try:
            return render(request,'kyc/index.html',{})
        except:
            raise Http404("Page not found")

""" 
def test1(request):
    try:
        return render(request,'kyc/te.html',{})
    except:
        raise Http404("Page not found") """

class KycData(View):
    def get(self,request):
        try:
            id = request.GET.get('id',0)
            
            return render(request,'kyc/kyc_form.html',{})
        except:
            raise Http404("Page not found")

    def post(self,request):
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

            u = KYC_URL_DB.objects.get(uiid=dt['uiid'],is_active=True)
            u.is_active = False
            u.save() 
            
            return HttpResponse("success")
            
        except IntegrityError:
            return HttpResponse("failed")


class ClientData(View):
    @method_decorator(login_required)   
    def get(self,request):
        all_entries = serialize("json",KYC_data.objects.all())
        return HttpResponse(all_entries, content_type="application/ld+json")

     


@login_required
def kyc_url(request):
    all_entries = serialize("json",KYC_URL_DB.objects.order_by('-is_active'))
    return HttpResponse(all_entries, content_type="application/ld+json")


@login_required
def gen_kyc_url(request):
    try:
        s1 = B64UUID()
        u_id = s1.string
        u = settings.HOST + '/kyc/kyc_form?id='+ u_id 
        g = KYC_URL_DB.objects.create(
            url = u, uiid = u_id
        )
        all_entries = serialize("json",KYC_URL_DB.objects.order_by('-is_active'))
        return HttpResponse(all_entries, content_type="application/ld+json")
    except IntegrityError:
        return HttpResponse("Something went wrong")
    



