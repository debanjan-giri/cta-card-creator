import React, { memo } from "react";
import { FloatingLabel, Form } from "react-bootstrap";

const TextArea = ({
  label = "Write your response here",
  name,
  onChange,
  type,
  is_mandatory,
}) => {
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
        type={name == "password" ? "password" : "text"}
        placeholder={label}
        as="textarea"
        rows={3}
        name={name}
        onChange={(e) => {
          onChange(e);
        }}
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
              type={name == "password" ? "password" : "text"}
              placeholder={label}
              name={name}
              as="textarea"
              rows={3}
              onChange={(e) => {
                onChange(e);
              }}
            />
          </FloatingLabel>
        </div>
      </div>
    </>
  );
};

export default memo(TextArea);