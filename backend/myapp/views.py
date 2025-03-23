from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

from .models import Post
from .serializers import UserSerializer, PostSerializer

# Hardcoded admin credentials (for demonstration)
ADMIN_EMAIL = "admin@admin.com"
ADMIN_PASSWORD = "admin123"

class RegisterView(APIView):
    """
    POST: Register a new user with 'email', 'username', 'password', etc.
    """
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User created successfully.'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    """
    POST: Login a user using email + password.
    If matches ADMIN_EMAIL + ADMIN_PASSWORD, we consider them 'admin' in the response.
    """
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        # Find the user by email, then get the username to authenticate
        try:
            user_obj = User.objects.get(email=email)
            username = user_obj.username
        except User.DoesNotExist:
            return Response({"message": "Invalid email or password"}, status=status.HTTP_401_UNAUTHORIZED)

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)  # Sets a session cookie
            is_admin = (email == ADMIN_EMAIL and password == ADMIN_PASSWORD)
            return Response({"message": "Login successful", "is_admin": is_admin}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Invalid email or password"}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(APIView):
    """
    POST: Logs out the current user by clearing the session.
    """
    def post(self, request):
        logout(request)
        return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)

class DeleteUserView(APIView):
    """
    DELETE: Let a logged-in user delete their own account.
    """
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        user = request.user
        user.delete()
        return Response({"message": "User account deleted."}, status=status.HTTP_200_OK)

class AdminPanelView(APIView):
    """
    GET: List all users (only if you're the 'hardcoded admin').
    DELETE: Delete a specific user by user_id in the URL (only admin).
    """
    def get(self, request):
        if request.user.is_authenticated and request.user.email == ADMIN_EMAIL:
            users = User.objects.all()
            serializer = UserSerializer(users, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"message": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)

    def delete(self, request, user_id=None):
        if request.user.is_authenticated and request.user.email == ADMIN_EMAIL:
            user_to_delete = get_object_or_404(User, id=user_id)
            user_to_delete.delete()
            return Response({"message": "User deleted by admin."}, status=status.HTTP_200_OK)
        return Response({"message": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)

class AdminRemovePostView(APIView):
    """
    DELETE: Admin can remove (delete) any post by its ID.
    """
    def delete(self, request, post_id=None):
        if request.user.is_authenticated and request.user.email == ADMIN_EMAIL:
            post = get_object_or_404(Post, id=post_id)
            post.delete()
            return Response({"message": "Post removed by admin."}, status=status.HTTP_200_OK)
        return Response({"message": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)

class PostListCreateView(ListCreateAPIView):
    """
    GET: List all posts belonging to the logged-in user.
    POST: Create a new post for the logged-in user.
    """
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Post.objects.filter(user=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class PostRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    """
    GET, PUT, PATCH, DELETE for a single post (must belong to the logged-in user).
    """
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    queryset = Post.objects.all()

    def get_object(self):
        post = super().get_object()
        if post.user != self.request.user:
            from rest_framework.exceptions import PermissionDenied
            raise PermissionDenied("You do not have permission to access this post.")
        return post