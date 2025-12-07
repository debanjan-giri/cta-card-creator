import React from "react";

const ColorPickerBox = ({ data, value, setValue, label, disabled = false }) => {
  const isNamedColor = data && typeof data === "object" && value in data;
  const hexValue = isNamedColor ? data[value] : value;

  return (
    <div className={` ${disabled ? "opacity-50" : ""}`}>
      <p className="mb-2 fw-semibold text-secondary small">{label}</p>
      <div className="d-flex align-items-center gap-3">
        <select
          name="color"
          className="form-select"
          value={isNamedColor ? value : ""}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled} // ⛔ disable dropdown
        >
          <option value="">Select a color</option>
          {Object.keys(data).map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        <input
          type="color"
          className="form-control form-control-color"
          value={hexValue || "#0000FF"}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled} // ⛔ disable color input
        />
      </div>
    </div>
  );
};

export default ColorPickerBox;