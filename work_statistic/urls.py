from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/auth/', include('djoser.urls.authtoken')),
    path('api/v1/events/', include('event_api.urls')),
    path('api/v1/stats/', include('stats_api.urls')),
    path('api/v1/users/', include('custom_user.urls'))
]
