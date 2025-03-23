from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Post

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the Django User model.
    We override 'create()' to properly hash the password.
    """
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email', 'first_name', 'last_name']
        extra_kwargs = {
            'password': {'write_only': True}  # Don't send password back in responses
        }

    def create(self, validated_data):
        # Use 'create_user' which hashes the password
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        return user

class PostSerializer(serializers.ModelSerializer):
    """
    Serializer for the Post model.
    """
    class Meta:
        model = Post
        fields = ['id', 'title', 'description', 'image', 'created_at', 'user']
        read_only_fields = ['user', 'created_at']