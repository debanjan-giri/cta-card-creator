import { Form } from "react-bootstrap";
import React, { memo } from "react";
//type : checkbox or radio
const Checkbox = ({ label, options, idx, onChange, type, is_mandatory }) => {
  return (
    <>
      <h2 className="fs-4 fw-medium  shareLoginV2Question position-relative ps-4 mt-3">
        {label}{" "}
        {is_mandatory === "1" ? <span className="text-danger">*</span> : null}
      </h2>
      <div className="w-100 d-flex justify-content-start flex-row flex-wrap gap-3 shareLoginV2FormAnswr mt-3 ps-0">
        {options?.split(",")?.length > 0 &&
          options?.split(",")?.map((_opt, _i) => (
            <div className="mb-2" key={_i + 1}>
              <Form.Check
                // className={`${type == 'checkbox' ? 'cmnCheckbox' : 'cmnRadioBtn'} d-inline-block`}
                type={type}
                name={"shareOption" + idx}
                id={"id" + idx + _i}
                label={_opt}
                value={_opt}
                onChange={(e) => {
                  onChange(e.target.value);
                }}
              />
            </div>
          ))}
      </div>
    </>
  );
};
export default memo(Checkbox);