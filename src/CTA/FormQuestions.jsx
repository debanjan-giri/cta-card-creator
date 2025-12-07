import React, { memo } from "react";
import TextField from "./TextField";
import TextArea from "./TextArea";
import Checkbox from "./Checkbox";
import Dropdown from "./Dropdown";

const FormQuestions = ({
  question,
  index,
  userInput,
  handleUserTextInput,
  setIsd,
  handleCheckboxInput,
}) => {
  const { field_name, type, is_mandatory, options, label } = question;

  switch (type) {
    case "text":
    case "number":
      return (
        <TextField
          label={label}
          name={field_name}
          onChange={handleUserTextInput}
          value={userInput[field_name] || ""}
          isNumber={type == "number"}
          type="user"
          is_mandatory={is_mandatory}
        />
      );

    case "textarea":
      return (
        <TextArea
          label={label}
          name={field_name}
          value={userInput[field_name] || ""}
          onChange={handleUserTextInput}
          type="user"
          is_mandatory={is_mandatory}
        />
      );
    case "radio":
      return (
        <Checkbox
          label={label}
          options={options}
          idx={index + "others"}
          type={"radio"}
          onChange={(_g) =>
            handleUserTextInput({ target: { name: field_name, value: _g } })
          }
          is_mandatory={is_mandatory}
        />
      );
    case "checkbox":
      return (
        <Checkbox
          label={label}
          options={options}
          idx={index + "others"}
          type={"checkbox"}
          onChange={(_g) =>
            handleCheckboxInput({ target: { name: field_name, value: _g } })
          }
          is_mandatory={is_mandatory}
        />
      );
    case "dropdown":
      return (
        <Dropdown
          label={label}
          options={options}
          onChange={(_g) =>
            handleUserTextInput({ target: { name: field_name, value: _g } })
          }
          is_mandatory={is_mandatory}
        />
      );
    default:
      return <></>;
  }
};

export default memo(FormQuestions);