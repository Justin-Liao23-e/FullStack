import React, { useState } from 'react';

function PostForm({ initialTitle = '', initialDescription = '', onSubmit, buttonLabel }) {
  // We'll store title and description in local state
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the parent callback with the current values
    onSubmit(title, description);
    // Reset the fields (helpful if this is a creation form)
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
      <div>
        <label>Title:</label>
        <input 
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea 
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows="3"
          required
        />
      </div>
      <button type="submit">{buttonLabel}</button>
    </form>
  );
}

export default PostForm;