
from time import sleep
from unicodedata import name
from django.conf import settings
from django.db import models

# Create your models here.

class KYC_data(models.Model):
    name = models.CharField(max_length=100)
    gender = models.CharField(max_length=10)
    marital_status = models.CharField(max_length=20)
    dob = models.DateField()
    nationality = models.CharField(max_length=30)
    status = models.CharField(max_length=20)
    pan = models.CharField(max_length=20,unique=True)
    aadhar = models.IntegerField(unique=True)
    permanent_address = models.TextField(max_length=500)
    communication_address = models.TextField(max_length=500)
    contact_no = models.IntegerField()
    email_ad = models.CharField(max_length=40,unique=True)
    gross_annual_income = models.CharField(max_length=15)
    occupation = models.CharField(max_length=20)
    applicable_type = models.CharField(max_length=60)
    KYC_check = models.TextField()
    experience = models.TextField(blank=True)
    goals = models.TextField(blank=True)
    risk = models.CharField(max_length=200)
    objective = models.TextField()

    """ def __str__(self): """
    """ return (self.name,self.gender,self.marital_status,self.dob,
        self.nationality,self.status,self.pan,self.aadhar,
        self.permanent_address,self.communication_address,
        self.contact_no,self.email_ad,self.gross_annual_income,
        self.occupation,self.applicable_type,self.KYC_check,
        self.experience,self.goals,self.risk,self.objective) """
        
    """     return self  """

    class Meta:
        db_table= "kyc_data"


    