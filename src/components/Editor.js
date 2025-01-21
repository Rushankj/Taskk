import React, { useState } from "react";
import Section from "./Section";
import "./Editor.css";

const Editor = () => {
  const [sections, setSections] = useState([]); // Initialize with empty sections
  const [previewMode, setPreviewMode] = useState(false); // State to toggle preview mode

  const addSection = () => {
    setSections([
      ...sections,
      { id: Date.now(), title: "", content: "", style: {}, image: "" },
    ]);
  };

  const updateSection = (id, updatedData) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, ...updatedData } : section
      )
    );
  };

  const deleteSection = (id) => {
    setSections(sections.filter((section) => section.id !== id));
  };

  const moveSection = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex >= 0 && targetIndex < sections.length) {
      const newSections = [...sections];
      // Swap sections
      [newSections[index], newSections[targetIndex]] = [
        newSections[targetIndex],
        newSections[index],
      ];
      setSections(newSections); // Update state with reordered sections
    }
  };

  const saveTemplate = () => {
    const fileData = JSON.stringify(sections, null, 2); // Convert sections to JSON format
    const blob = new Blob([fileData], { type: "application/json" }); // Create a blob
    const url = URL.createObjectURL(blob); // Create a URL for the blob
    const link = document.createElement("a");
    link.href = url;
    link.download = "template.json"; // File name to save
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert("Template saved successfully!");
  };
  
  const previewTemplate = () => {
    setPreviewMode(true); // Enable preview mode
  };

  return (
    <div className="editor">
      {!previewMode ? (
        <>
          <button className="add-section-btn" onClick={addSection}>
            + Add Section
          </button>

          <div className="sections">
            {sections.map((section, index) => (
              <Section
                key={section.id}
                data={section}
                onUpdate={(data) => updateSection(section.id, data)}
                onDelete={() => deleteSection(section.id)}
                onMove={(direction) => moveSection(index, direction)}
              />
            ))}
          </div>
          <div className="actions">
            <button className="save-btn" onClick={saveTemplate}>
              Save Template
            </button>
            <button className="preview-btn" onClick={previewTemplate}>
              Preview Template
            </button>
          </div>
        </>
      ) : (
        <div className="preview">
          <h2>Template Preview</h2>
          {sections.map((section) => (
            <div key={section.id} className="preview-section" style={section.style}>
              {section.image && <img src={section.image} alt="Section Preview" />}
              <h3>{section.title}</h3>
              <p>{section.content}</p>
            </div>
          ))}
          <button className="back-btn" onClick={() => setPreviewMode(false)}>
                      Back to Edit
              </button>

        </div>
      )}
    </div>
  );
};

export default Editor;
