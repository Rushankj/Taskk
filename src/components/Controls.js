import React from "react";

const Controls = ({ style, onUpdateStyle, target }) => {
  return (
    <div className="controls">
      <label>
        {target} Text Color:
        <input
          type="color"
          value={style?.color || "#000000"}
          onChange={(e) => onUpdateStyle({ color: e.target.value })}
        />
      </label>
      <label>
        {target} Font Size:
        <input
          type="number"
          value={parseInt(style?.fontSize || 16, 10)}
          onChange={(e) => onUpdateStyle({ fontSize: `${e.target.value}px` })}
        />
      </label>
      <label>
        {target} Alignment:
        <select
          value={style?.textAlign || "left"}
          onChange={(e) => onUpdateStyle({ textAlign: e.target.value })}
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </label>
    </div>
  );
};

export default Controls;
