import React from "react";

const ColorPickerBox = ({ data, value, setValue, label, disabled = false }) => {
  const isNamedColor = typeof value === "string" && data && data.hasOwnProperty(value);
  const hexValue = isNamedColor ? data[value].color : value;

  // Handle custom hex input: override named color
  const handleColorChange = (e) => {
    setValue(e.target.value); // setValue("#rrggbb")
  };

  // Handle select change
  const handleSelectChange = (e) => {
    const selectedKey = e.target.value;
    setValue(selectedKey);
  };

  return (
    <div className={`${disabled ? "opacity-50" : ""}`}>
      <p className="mb-2 fw-semibold text-secondary small">{label}</p>
      <div className="d-flex align-items-center gap-3">
        <select
          name="color"
          className="form-select"
          value={isNamedColor ? value : ""}
          onChange={handleSelectChange}
          disabled={disabled}
        >
          <option value="">Select a color</option>
          {Object.entries(data).map(([key, { label }]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>

        <input
          type="color"
          className="form-control form-control-color"
          value={hexValue || "#000000"}
          onChange={handleColorChange}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default ColorPickerBox;
