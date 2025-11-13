import React from "react";

const DropdownBox = ({ value, setValue, label, data, disabled }) => {
  return (
    <div>
      <p className="mb-2 fw-semibold text-secondary small">{label}</p>
      <select
        className="form-select"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
      >
        <option value="">Select an option</option>
        {data.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};


export default DropdownBox;
