import React, { useState } from "react";
import "./Editor.css";

const AddSectionForm = ({ onAdd, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ id: Date.now(), title, content, style: {} });
    onClose(); // Close the form after adding the section
  };

  return (
    <div className="notice-container">
      <div className="notice-card">
        <h2 className="notice-heading">Add New Section</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="content">
              Content
            </label>
            <textarea
              id="content"
              className="form-textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-btn">
            Add Section
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSectionForm;
