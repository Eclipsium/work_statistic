from django.contrib import admin
from django.contrib.auth import get_user_model
# Register your models here.


class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'full_name', 'is_staff', 'is_active', 'troop_type')


admin.site.register(get_user_model(), UserAdmin)
