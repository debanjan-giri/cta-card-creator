import React, { memo } from "react";
import { FloatingLabel, Form } from "react-bootstrap";

const Dropdown = ({
  options,
  label,
  onChange,
  is_mandatory,
  disabled = false,
}) => {
  const isOptionsIsString = typeof options === "string";
  const isOptionsAreLabelValueFormat =
    Array.isArray(options) &&
    options.length > 0 &&
    typeof options[0] === "object";
  return (
    <>
      <h2 className="fs-4 fw-medium  shareLoginV2Question position-relative ps-4 mt-3">
        {label}{" "}
        {is_mandatory === "1" ? <span className="text-danger">*</span> : null}
      </h2>
      <div className="w-100 shareLoginV2FormAnswr mt-4 ps-0">
        <div className="w-100 shareLoginV2FormAnswrRow mb-2">
          <FloatingLabel controlId="floatingSelect" label="">
            <Form.Select
              disabled={disabled}
              aria-label="Default select example"
              className="fs-4"
              onChange={(e) => onChange(e.target.value)}
            >
              <option value={""}>Select from the options below</option>
              {isOptionsIsString ? (
                <>
                  {options?.split(",")?.length > 0 &&
                    options?.split(",")?.map((_opt, _i) => (
                      <option value={_opt} key={_i + 1}>
                        {_opt}
                      </option>
                    ))}
                </>
              ) : (
                <>
                  {isOptionsAreLabelValueFormat &&
                    options?.map((_opt, _i) => (
                      <option value={_opt?.value} key={_i + 1}>
                        {_opt?.label}
                      </option>
                    ))}
                </>
              )}
            </Form.Select>
          </FloatingLabel>
        </div>
      </div>
    </>
  );
};
export default memo(Dropdown);