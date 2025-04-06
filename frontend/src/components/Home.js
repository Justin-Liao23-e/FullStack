import React, { useState, useEffect } from 'react';
import request from '../services/api';
import PostForm from './PostForm';

function Home() {
  // Store the user's posts
  const [posts, setPosts] = useState([]);
  // Track which post is being edited (by ID)
  const [editingPost, setEditingPost] = useState(null);

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // GET the current user's posts
  const fetchPosts = async () => {
    try {
      const response = await request('/posts/');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Create a new post
  const handleCreatePost = async (formData) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/posts/', {
        method: 'POST',
        credentials: 'include',
        body: formData, // Send FormData directly
      });
      
      if (response.ok) {
        fetchPosts(); // Refresh the posts list
      } else {
        const errorData = await response.json();
        console.error('Failed to create post:', errorData);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  // Update an existing post
  const handleUpdatePost = async (postId, formData) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/posts/${postId}/`, {
        method: 'PUT',
        credentials: 'include',
        body: formData,
      });
      
      if (response.ok) {
        fetchPosts();
        setEditingPost(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Delete a post
  const handleDeletePost = async (postId) => {
    // Confirm with the user
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      const response = await request(`/posts/${postId}/`, 'DELETE');
      if (response.ok) {
        fetchPosts();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>My Posts</h2>
      {/* Form to create new posts */}
      <PostForm onSubmit={handleCreatePost} buttonLabel="Create Post" />

      {/* Show list of posts */}
      {posts.length > 0 ? (
        posts.map((post) => (
          <div 
            key={post.id} 
            style={{ 
              marginTop: '1rem', 
              border: '1px solid #ccc', 
              padding: '1rem',
              borderRadius: '8px',
              backgroundColor: '#fff',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            {editingPost === post.id ? (
              // If we're editing this post, show the form with existing data
              <PostForm
                initialTitle={post.title}
                initialDescription={post.description}
                onSubmit={(formData) => handleUpdatePost(post.id, formData)}
                buttonLabel="Save Changes"
              />
            ) : (
              <>
                <h3 style={{ marginBottom: '0.5rem' }}>{post.title}</h3>
                <p style={{ marginBottom: '1rem' }}>{post.description}</p>
                {post.image && (
                  <div style={{ marginBottom: '1rem' }}>
                    <img 
                      src={`http://127.0.0.1:8000${post.image}`}
                      alt={post.title}
                      style={{ 
                        maxWidth: '100%', 
                        height: 'auto',
                        borderRadius: '4px'
                      }} 
                    />
                  </div>
                )}
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    onClick={() => setEditingPost(post.id)}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeletePost(post.id)}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#f44336',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      ) : (
        <p>No posts yet</p>
      )}
    </div>
  );
}

export default Home;