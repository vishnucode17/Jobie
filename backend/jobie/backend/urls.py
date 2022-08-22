from django.urls import path
from . import views
from rest_framework_jwt.views import obtain_jwt_token
urlpatterns=[
    path('register',views.Register,name='register'),
    path('token-auth',obtain_jwt_token),
    path('current_user/', views.current_user,name="current_user"),
    path('joblist',views.JobList,name='joblist'),
    path('jobdetails',views.JobDetails,name='jobdetails'),
    path('apply',views.Apply,name='apply'),
    path('getdetails',views.GetDetails,name='getdetails'),
    path('addprofile',views.AddCandidate,name='addprofile'),
    path('reg_comp',views.Reg_Company,name='reg_comp'),
    path('applications',views.ApplicationView,name='applications'),
    path('getcompany_id',views.getcompany_id,name='getcompany_id'),
    path('viewapplication',views.Application_View,name='viewapplication'),
    path('updateapplication',views.UpdateStatus,name='updateapplication'),
    path('myapplications',views.MyApplications,name="myapplications"),
    path('addjob',views.AddJob,name='addjob'),
]