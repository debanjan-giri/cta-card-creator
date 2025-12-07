import { useEffect, useRef, useState } from "react";
import DropdownBox from "../components/DropdownBox";

import InputBox from "../components/InputBox";
import { Tabs, Tab } from "react-bootstrap";
import { MdOutlineDelete } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
const FormEditor = ({ onChange, changedData }) => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    if (Array.isArray(changedData?.formJson)) {
      setForms(changedData.formJson);
    } else {
      setForms([]);
    }
  }, [changedData]);

  const handleUpdateForm = (index, key, value) => {
    const updated = [...forms];
    updated[index] = { ...updated[index], [key]: value };
    setForms(updated);
    onChange && onChange(updated);
  };

  const handleAddForm = () => {
    if (forms.length >= 3) {
      toast.error("You can only add up to 3 forms.");
      return;
    }

    const defaultForm = {
      label: "",
      field_name: "",
      type: "text",
      is_mandatory: "0",
      options: "",
      extraClass: "",
    };

    const updated = [...forms, defaultForm];
    setForms(updated);
    onChange && onChange(updated);
  };

  const handleDeleteForm = (index) => {
    const updated = forms.filter((_, i) => i !== index);
    setForms(updated);
    onChange && onChange(updated);
  };

  const renderFormEditor = (form, index) => (
    <div key={index} className="p-3 bg-white rounded shadow-sm ">
      <div className="mb-3">
        <InputBox
          label={"Label"}
          placeholder={"Enter Label"}
          value={form.label}
          setValue={(val) => handleUpdateForm(index, "label", val)}
        />
      </div>
      <div className="mb-3">
        <InputBox
          label={"Field Name"}
          placeholder={"Enter Field Name"}
          value={form.field_name}
          setValue={(val) => handleUpdateForm(index, "field_name", val)}
        />
      </div>
      <div className="mb-3">
        <DropdownBox
          label={"Field Type"}
          value={form.type}
          setValue={(val) => handleUpdateForm(index, "type", val)}
          data={["text", "number", "textarea", "radio", "checkbox", "dropdown"]}
        />
      </div>
      <div className="mb-3">
        <DropdownBox
          label={"Options"}
          value={form.options}
          setValue={(val) => handleUpdateForm(index, "options", val)}
          data={["male", "female"]}
        />
      </div>
      <div className="mb-3">
        <DropdownBox
          label={"Is Mandatory"}
          value={form.is_mandatory}
          setValue={(val) => handleUpdateForm(index, "is_mandatory", val)}
          data={["0", "1"]}
        />
      </div>
      <div className="mb-3">
        <InputBox
          label={"Extra Class"}
          isTextarea={true}
          placeholder={"Enter Extra Class"}
          value={form.extraClass}
          setValue={(val) => handleUpdateForm(index, "extraClass", val)}
        />
      </div>
    </div>
  );

  return (
    <div className="mt-3 p-3 bg-white rounded shadow-sm">
      <div className="position-relative">
        <p
          className="position-absolute top-0 end-0"
          onClick={handleAddForm}
          style={{ cursor: "pointer", color: "#0d6efd", zIndex: 1 }}
        >
          Add +
        </p>
        <Tabs defaultActiveKey="0" id="form-tabs" className="mb-3">
          {forms.map((form, idx) => (
            <Tab
              eventKey={idx.toString()}
              key={idx}
              title={
                <span className="d-inline-flex align-items-center gap-1">
                  <span>Filed {idx + 1}</span>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteForm(idx);
                    }}
                    style={{ cursor: "pointer", color: "#dc3545" }}
                    title="Delete Form"
                  >
                    <MdOutlineDelete size={16} />
                  </span>
                </span>
              }
            >
              {renderFormEditor(form, idx)}
            </Tab>
          ))}
        </Tabs>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default FormEditor;
