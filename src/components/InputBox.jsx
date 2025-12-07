import React from "react";
import { RiResetLeftFill } from "react-icons/ri";

const InputBox = ({
  label,
  value,
  setValue,
  placeholder,
  disabled = false,
  isTextarea = false,
  rows = 3,
}) => {
  return (
    <div className="">
      <p className="mb-2 fw-semibold text-secondary small">{label}</p>
      <div className="d-flex align-items-start gap-2">
        {isTextarea ? (
          <textarea
            placeholder={placeholder}
            className="form-control"
            value={value}
            disabled={disabled}
            rows={rows}
            style={{ resize: "none" }}
            onChange={(e) => setValue(e.target.value)}
          />
        ) : (
          <input
            type="text"
            placeholder={placeholder}
            className="form-control"
            value={value}
            disabled={disabled}
            onChange={(e) => setValue(e.target.value)}
          />
        )}
        <RiResetLeftFill
          onClick={() => setValue("")}
          className="text-danger mt-1"
          size={22}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default InputBox;
