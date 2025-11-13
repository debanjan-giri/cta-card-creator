import { useEffect, useRef, useState } from "react";
import DropdownBox from "../components/DropdownBox";
import InputBox from "../components/InputBox";
import { Tabs, Tab, Accordion } from "react-bootstrap";
import { MdOutlineDelete, MdAdd } from "react-icons/md";
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

  // Generate field name from label (remove spaces and special characters)
  const generateFieldName = (label) => {
    return label
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '_')
      .replace(/_{2,}/g, '_')
      .replace(/^_|_$/g, '')
      || 'field';
  };

  const handleUpdateForm = (index, key, value) => {
    const updated = [...forms];
    
    if (key === 'label') {
      // When label changes, auto-update field_name
      updated[index] = { 
        ...updated[index], 
        label: value,
        field_name: generateFieldName(value)
      };
    } else {
      updated[index] = { ...updated[index], [key]: value };
    }
    
    setForms(updated);
    onChange && onChange(updated);
  };

  const handleAddForm = () => {
    if (forms.length >= 15) {
      toast.error("You can only add up to 15 forms.");
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

  // Handle adding new option to the options list
  const handleAddOption = (formIndex, newOption) => {
    if (!newOption.trim()) return;
    
    const updated = [...forms];
    const currentOptions = updated[formIndex].options ? updated[formIndex].options.split(",") : [];
    
    if (!currentOptions.includes(newOption.trim())) {
      currentOptions.push(newOption.trim());
      updated[formIndex].options = currentOptions.join(",");
      setForms(updated);
      onChange && onChange(updated);
    } else {
      toast.error("Option already exists");
    }
  };

  // Handle removing option from the options list
  const handleRemoveOption = (formIndex, optionToRemove) => {
    const updated = [...forms];
    const currentOptions = updated[formIndex].options ? updated[formIndex].options.split(",") : [];
    const filteredOptions = currentOptions.filter(opt => opt !== optionToRemove);
    updated[formIndex].options = filteredOptions.join(",");
    setForms(updated);
    onChange && onChange(updated);
  };

  // Options manager component for fields that need options
  const OptionsManager = ({ form, formIndex }) => {
    const [newOption, setNewOption] = useState("");
    const needsOptions = ['radio', 'checkbox', 'dropdown'].includes(form.type);
    
    if (!needsOptions) return null;

    const currentOptions = form.options ? form.options.split(",").filter(opt => opt.trim()) : [];

    return (
      <div className="mb-3">
        <label className="form-label">Options</label>
        
        {/* Add new option */}
        <div className="input-group mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Enter option value"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddOption(formIndex, newOption);
                setNewOption("");
              }
            }}
          />
          <button
            className="btn btn-outline-primary"
            type="button"
            onClick={() => {
              handleAddOption(formIndex, newOption);
              setNewOption("");
            }}
          >
            <MdAdd size={16} />
          </button>
        </div>

        {/* Display current options */}
        {currentOptions.length > 0 && (
          <div className="border rounded p-2 bg-light">
            <small className="text-muted d-block mb-2">Current Options:</small>
            {currentOptions.map((option, idx) => (
              <div key={idx} className="d-flex align-items-center justify-content-between mb-1 p-1">
                <span className="small">{option}</span>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleRemoveOption(formIndex, option)}
                  type="button"
                >
                  <MdOutlineDelete size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderFormEditor = (form, index) => (
    <div key={index}>
      <div className="mb-3">
        <InputBox
          label={"Label"}
          placeholder={"Enter Label"}
          value={form.label}
          setValue={(val) => handleUpdateForm(index, "label", val)}
        />
      </div>
      
      <div className="mb-3">
        <DropdownBox
          label={"Field Type"}
          value={form.type}
          setValue={(val) => handleUpdateForm(index, "type", val)}
          data={[
            { label: "Text Field", value: "text" },
            { label: "Number Field", value: "number" },
            { label: "Multi-line Text (Textarea)", value: "textarea" },
            { label: "Multiple Choice (Radio)", value: "radio" },
            { label: "Checkbox Option", value: "checkbox" },
            { label: "Dropdown List", value: "dropdown" },
          ]}
        />
      </div>
      
      {/* Options Manager - only shows for radio, checkbox, dropdown */}
      <OptionsManager form={form} formIndex={index} />
      
      <div className="mb-3">
        <DropdownBox
          label={"Is Mandatory"}
          value={form.is_mandatory}
          setValue={(val) => handleUpdateForm(index, "is_mandatory", val)}
          data={[
            { label: "Yes", value: "1" },
            { label: "No", value: "0" },
          ]}
        />
      </div>
    </div>
  );

  return (
    <div className="mt-3 p-3 bg-white rounded shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="m-0">Form Fields</h5>
        <button onClick={handleAddForm} className="btn btn-sm btn-primary px-3">
          + Add Field
        </button>
      </div>

      <Accordion defaultActiveKey="0" alwaysOpen>
        {forms.map((form, idx) => (
          <Accordion.Item
            eventKey={idx.toString()}
            key={idx}
            className="mb-2 border rounded shadow-sm"
          >
            <Accordion.Header>
              <div className="d-flex align-items-center w-100">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteForm(idx);
                  }}
                  className="btn btn-sm btn-outline-danger me-2 d-flex align-items-center"
                  title="Delete Field"
                >
                  <MdOutlineDelete size={16} />
                </button>
                <strong>Field {idx + 1}</strong>
              </div>
            </Accordion.Header>
            <Accordion.Body>{renderFormEditor(form, idx)}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default FormEditor;