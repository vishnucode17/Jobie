from django.contrib import admin
from .models import Candidate,Company,Job,Application,Experience
# Register your models here.

class CandidateAdmin(admin.ModelAdmin):
    list_display = ('username',)

class CompanyAdmin(admin.ModelAdmin):
    list_display = ('company_name',)

class JobAdmin(admin.ModelAdmin):
    list_display = ('title',)

class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('username',)

class ApplicationAdmin(admin.ModelAdmin):
    list_display = ('application_id','username')

admin.site.register(Candidate,CandidateAdmin)
admin.site.register(Company,CompanyAdmin)
admin.site.register(Job,JobAdmin)
admin.site.register(Experience,ExperienceAdmin)
admin.site.register(Application,ApplicationAdmin)