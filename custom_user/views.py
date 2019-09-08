from django.contrib.auth import get_user_model
from rest_framework import generics
from rest_framework.permissions import AllowAny

from custom_user.serializers import CreateUserSerializer, UserSerializer
from work_statistic.permisions import IsCurrentUser

User = get_user_model()


class CreateUserView(generics.CreateAPIView):
    serializer_class = CreateUserSerializer
    queryset = User.objects.all()
    permission_classes = (AllowAny,)


class GetUserDataView(generics.ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        current_user = User.objects.filter(id=self.request.user.id)
        return current_user


class UpdateUser(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = (IsCurrentUser, )
