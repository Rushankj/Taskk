import React, { useState } from "react";
import Controls from "./Controls";
import "./Editor.css";

const Section = ({ data, onUpdate, onDelete, onMove, onPreview }) => {
  const { title, content, style, image } = data;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onUpdate({ [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onUpdate({ image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const updateStyle = (field, newStyle) => {
    onUpdate({ style: { ...style, [field]: { ...style[field], ...newStyle } } });
  };

  return (
    <div className="notice-container">
      <div className="notice-card">
        <h2 className="notice-heading">Section Editor</h2>
        <div className="form-group">
          <label className="form-label" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="form-input"
            name="title"
            value={title}
            placeholder="Enter title"
            onChange={handleInputChange}
            style={style?.title || {}}
          />
          <Controls
            style={style?.title || {}}
            onUpdateStyle={(newStyle) => updateStyle("title", newStyle)}
            target="Title"
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="content">
            Content
          </label>
          <textarea
            id="content"
            className="form-textarea"
            name="content"
            value={content}
            placeholder="Enter content"
            onChange={handleInputChange}
            style={style?.content || {}}
          ></textarea>
          <Controls
            style={style?.content || {}}
            onUpdateStyle={(newStyle) => updateStyle("content", newStyle)}
            target="Content"
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="image-upload">
            Upload Image
          </label>
          <input
            type="file"
            id="image-upload"
            className="form-input"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {image && <img src={image} alt="Uploaded Preview" className="uploaded-image" />}
        </div>
        <div className="form-group button-group">
          <button className="submit-btn" onClick={onDelete}>
            Delete Section
          </button>
          <button className="submit-btn" onClick={() => onMove(-1)}>
            Move Up
          </button>
          <button className="submit-btn" onClick={() => onMove(1)}>
            Move Down
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default Section;
