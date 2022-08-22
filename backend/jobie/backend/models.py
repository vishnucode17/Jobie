from django.db import models
from django.contrib.auth.models import User
# Create your models here.
# Make a candidate model with fields of your choosing 
# (fields may include personal details, contact info, academic and professional exp etc).

class Candidate(models.Model):
    username = models.ForeignKey(User,on_delete=models.CASCADE,primary_key=True)
    # first_name = models.CharField(max_length=128)
    # last_name = models.CharField(max_length=128)
    # email = models.EmailField(max_length=255)
    phone = models.CharField(max_length=10)
    about = models.CharField(max_length=512)
    institute_name = models.CharField(max_length=512)
    year_of_graduation = models.CharField(default=None,null=True,max_length=10)
    skills = models.TextField()

    def __str__(self):
        return str(self.username)

class Company(models.Model):
    username= models.ForeignKey(User,on_delete=models.CASCADE,default=None,null=True)
    company_id=models.CharField(max_length=128,primary_key=True)
    company_name = models.CharField(max_length=512)
    category = models.CharField(max_length=255)
    about = models.TextField(max_length=1024,blank=True)
    logo = models.TextField()
    def __str__(self):
        return self.company_name
    

class Experience(models.Model):
    username = models.ForeignKey(User,on_delete=models.CASCADE, primary_key=True)
    company_name = models.CharField(max_length=255,blank=True)
    start_date = models.CharField(max_length=128,blank=True, null=True)
    end_date = models.CharField(max_length=128, blank=True, null=True)
    is_present = models.BooleanField(default=False,null=True)
    def __str__(self):
        return str(self.username)

class Job(models.Model):
    job_id = models.CharField(max_length=255,primary_key=True)
    company_name = models.ForeignKey(Company,on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField(default='')
    n_applications = models.IntegerField(default=0)
    def __str__(self):
        return self.title
    
class Application(models.Model):
    application_id = models.CharField(max_length=255,primary_key=True)
    username = models.ForeignKey(User, on_delete=models.CASCADE,default=None,null=True)
    job_id = models.ForeignKey(Job, on_delete=models.CASCADE,default=None,null=True)
    company_id = models.ForeignKey(Company, on_delete=models.CASCADE,default=None,null=True)
    applied_on = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=255,default="Application Submitted")
    note = models.TextField(max_length=1024,blank=True,default="",null=True)
    resume = models.FileField(upload_to='resumes',blank=True,null=True)
    def __str__(self):
        return str(self.username)
