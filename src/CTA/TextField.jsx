import React, { memo } from "react";
import { FloatingLabel, Form } from "react-bootstrap";

const TextField = ({
  label = "Write your response here",
  name,
  value,
  onChange,
  type,
  is_mandatory,
  isNumber = false,
  onKeyPress,
}) => {
  let field_value = value ? { value: value || "" } : {};
  return type == "user" ? (
    <FloatingLabel
      controlId="floatingInput1"
      label={
        <span>
          {label}{" "}
          {is_mandatory === "1" ? <span className="text-danger">*</span> : null}
        </span>
      }
    >
      <Form.Control
        className="fs-4"
        type={
          isNumber
            ? "number"
            : name == "password" || name == "confirmPassword"
            ? "password"
            : "text"
        }
        placeholder={label}
        name={name}
        onChange={(e) => {
          onChange(e);
        }}
        onKeyPress={(e) => {
          onKeyPress && onKeyPress(e);
        }}
        {...field_value}
      />
    </FloatingLabel>
  ) : (
    <>
      <h2 className="fs-4 fw-medium  shareLoginV2Question position-relative ps-4 mt-3">
        {label}{" "}
        {is_mandatory === "1" ? <span className="text-danger">*</span> : null}
      </h2>
      <div className="w-100 shareLoginV2FormAnswr mt-3 ps-0">
        <div className="w-100 shareLoginV2FormAnswrRow mb-2">
          <FloatingLabel
            controlId="floatingInput1"
            label={type == "other" ? "Write your response here" : label}
          >
            <Form.Control
              className="fs-4"
              type={
                isNumber ? "number" : name == "password" ? "password" : "text"
              }
              placeholder={label}
              name={name}
              onChange={(e) => {
                onChange(e);
              }}
              onKeyPress={(e) => {
                onKeyPress && onKeyPress(e);
              }}
              {...field_value}
            />
          </FloatingLabel>
        </div>
      </div>
    </>
  );
};

export default memo(TextField);