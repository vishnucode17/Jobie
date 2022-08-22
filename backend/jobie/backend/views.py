from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer
from django.contrib.auth.models import User
from .models import Experience, Job,Company,Application,Candidate
import json
import uuid
from django.core.files.storage import FileSystemStorage
# Create your views here.
def Register(request):
    if request.method == 'POST':
        username=request.POST.get('username')
        firstname=request.POST.get('first_name')
        lastname=request.POST.get('last_name')
        email=request.POST.get('email')
        password=request.POST.get('password')
        if (User.objects.filter(username=username).exists()):
            return HttpResponse(status=409)
        else:
            user=User.objects.create_user(username=username, email=email,first_name=firstname,last_name=lastname,password=password)
            user.save()
            return HttpResponse(status=201)
    
    return HttpResponse(status.HTTP_400)

@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

# @api_view(['GET'])
def JobList(request):
    job_list = Job.objects.all()
    res=[]
    for job in job_list:
        data={}
        data["job_id"]= job.job_id
        data["company_name"]=str(job.company_name)
        data["title"] = job.title
        data["description"] = job.description
        res.append(data)
    # print(data)
    # data=json.dumps(res)
    data={"data":res}
    return JsonResponse(res,safe=False)

def JobDetails(request):
    if request.method == "GET":
        job_id=request.GET.get('job_id')
        job=Job.objects.filter(job_id=job_id)[0]
        company = Company.objects.filter(company_name=job.company_name)[0]
        data={}
        data["job_id"]=job.job_id
        data["company_name"]=str(job.company_name)
        data["title"] = job.title
        data["description"] = job.description
        data["category"] = company.category
        data["about"] = company.about
        data["logo"] = company.logo
        data["n_applications"] = job.n_applications
        return JsonResponse(data,safe=False)
    return HttpResponse("Hi")

def Apply(request):
    if request.method == "POST":
        application_id = uuid.uuid4()
        username = request.POST.get("username")
        job_id = request.POST.get("job_id")
        note= request.POST.get("note")
        resume = request.FILES["resume"]
        fs = FileSystemStorage()
        filename = fs.save(resume.name,resume)
        user=User.objects.get(username=username)
        job=Job.objects.filter(job_id=job_id).first()
        application = Application.objects.filter(username=user,job_id=job_id)
        if application.exists():
            return HttpResponse(status=409)
        print(job,user)
        application = Application.objects.create(application_id=application_id, username=user, job_id=job,note=note,resume=resume)
        # print(application_id,username,job_id)
        application.save()

        job.n_applications = job.n_applications+1
        job.save()
        return HttpResponse(status=200)
    return HttpResponse("Hi")

def GetDetails(request):
    if request.method == "GET":
        username = request.GET.get('username')
        data={}
        user=User.objects.get(username=username)
        try:
            candidate = Candidate.objects.get(username=user)
            if candidate.exists():
                data["firstname"] = candidate.first_name
                data["lastname"] = candidate.last_name
                data["email"] = candidate.email
                data["phone"] = candidate.phone
                data["about"] = candidate.about
                data["institution"] = candidate.institution_name
                data["year_of_graduation"] = candidate.year_of_graduation
                data["skills"] = candidate.skills
            experience = Experience.objects.get(username=user)
            if experience.exists():
                data["company_name"] = experience.company_name
                data["start_date"] = experience.start_date
                data["end_date"] = experience.end_date
                data["is_present"] = experience.is_present
        except:
            return HttpResponse("Details missing")
        return JsonResponse(data,safe=False)
        

def AddCandidate(request):
    if request.method == "POST":
        username = request.POST.get("username")
        user = User.objects.get(username=username)
        phone = request.POST.get("phone")
        about = request.POST.get("about")
        institution_name = request.POST.get("institution")
        year = request.POST.get("year_of_graduation")
        skills = request.POST.get("skills")
        company_name = request.POST.get("company_name")
        start_date = request.POST.get("start_date")
        end_date = request.POST.get("end_date")
        is_present = request.POST.get("is_present")
        candidate = Candidate.objects.create(username=user,phone=phone,institute_name=institution_name,year_of_graduation=year,skills=skills,about=about)
        
        experience = Experience.objects.create(username=user,company_name=company_name,start_date=start_date,end_date=end_date,is_present=is_present)
        candidate.save()
        experience.save()
        return HttpResponse(status=200)

def Reg_Company(request):
    if request.method == 'POST':
        username = request.POST.get("username")
        company_name = request.POST.get("company_name")
        company_id = request.POST.get("company_id")
        category = request.POST.get("category")
        about = request.POST.get("about")
        user = User.objects.get(username=username)
        company = Company.objects.create(username=user,company_name=company_name,company_id=company_id,category=category,about=about)
        company.save()
        return HttpResponse(status=200)

def ApplicationView(request):
    if request.method == "GET":
        print(request.GET.get("company_name"))
        company_name = request.GET.get("company_name")
        company = Company.objects.filter(company_name=company_name)
        
        application = Application.objects.filter(company_id=company[0])

        data_res=[]
        for app in application:
            data={}
            data["username"]=str(app.username)
            data["applied_on"]=app.applied_on
            data["application_id"]=app.application_id
            data["job_id"]=str(app.job_id)
            data_res.append(data)
        

        
        # print(data_res)
        return JsonResponse({"data":data_res})

def getcompany_id(request):
    if request.method == "POST":
        print(request.POST.get("username"))
        username= request.POST.get("username")
        
        company = Company.objects.get(username=User.objects.get(username=username))
        return JsonResponse({"company":company.company_name})

def Application_View(request):
    if request.method == "GET":
        application_id=request.GET.get("application_id")
        application=Application.objects.get(application_id=application_id)
        candidate = Candidate.objects.get(username=application.username)
        experience = Experience.objects.get(username=application.username)
        user = User.objects.get(username=application.username)
        res={}
        
        res["username"]=str(application.username)
        res["applied_on"]=application.applied_on
        res["note"]=application.note
        res["firstname"] = user.first_name
        res["lastname"] = user.last_name
        res["email"] = user.email
        res["phone"] = candidate.phone
        res["about"] = candidate.about
        res["institution"] = candidate.institute_name
        res["year_of_graduation"] = candidate.year_of_graduation
        res["skills"] = candidate.skills
        res["company_name"] = experience.company_name
        res["start_date"] = experience.start_date
        res["end_date"] = experience.end_date
        res["is_present"] = experience.is_present
        res["status"] = application.status
        res["resume"]=str(application.resume)
        print(res["resume"])
        
        return JsonResponse(res,safe=False)

def UpdateStatus(request):
    if request.method == "POST":
        status= request.POST.get("status")
        application=Application.objects.get(application_id=request.POST.get("application_id"))
        application.status=status
        application.save()
        return HttpResponse(status=200)

def MyApplications(request):
    if request.method == "GET":
        username= request.GET.get("username")
    
        user=User.objects.get(username=username)
        application = Application.objects.filter(username=user)

        data_res=[]
        for app in application:
            data={}
            data["username"]=str(app.username)
            data["applied_on"]=app.applied_on
            data["application_id"]=app.application_id
            data["job_id"]=str(app.job_id)
            data["status"]=app.status
            data_res.append(data)
        return JsonResponse({"data":data_res})

def AddJob(request):
    if request.method=="POST":
        
        job_id=request.POST.get("job_id")
        title=request.POST.get("title")
        company_name = request.POST.get("company_name")
        company=Company.objects.get(company_name=company_name)
        description=request.POST.get("description")
        job = Job.objects.create( title=title, description=description,job_id=job_id,company_name=company)
        job.save()
        return HttpResponse(status=200)