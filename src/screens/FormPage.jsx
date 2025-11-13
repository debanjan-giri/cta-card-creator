import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const FormPage = ({ formData = [], isPreview = false, setFormHtml }) => {
  const [userInput, setUserInput] = useState({});
  const [prefilledData, setPrefilledData] = useState({});

  // ===== Handle Changes =====
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setUserInput((prev) => {
        const prevArr = prev[name]?.split(",").filter((v) => v) || [];
        const newArr = checked
          ? [...prevArr, value]
          : prevArr.filter((v) => v !== value);
        return { ...prev, [name]: newArr.join(",") };
      });
    } else {
      setUserInput((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ===== Handle Submit =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isPreview) {
      toast.info("This is a preview. Form submission is disabled.");
      return;
    }
  };

  const generateHTMLCode = () => {
    if (!formData || formData.length === 0) {
      return;
    }

    let fieldsHTML = "";

    formData.forEach((field) => {
      const { field_name, label, type, is_mandatory, options } = field;
      const isRequired = is_mandatory === "1" || is_mandatory === 1;
      const requiredSpan = isRequired ? `<span class="required">*</span>` : "";
      const prefillValue = prefilledData[field_name] || "";

      if (type === "text" || type === "number") {
        fieldsHTML += `
        <div class="form-group">
          <label for="${field_name}">${label} ${requiredSpan}</label>
          <input type="${type}" id="${field_name}" name="${field_name}" 
            value="${prefillValue}" 
            placeholder="Enter ${label.toLowerCase()}">
          ${
            isRequired
              ? `<div class="error-message" id="${field_name}-error">This field is required</div>`
              : ""
          }
        </div>`;
      } else if (type === "textarea") {
        fieldsHTML += `
        <div class="form-group">
          <label for="${field_name}">${label} ${requiredSpan}</label>
          <textarea id="${field_name}" name="${field_name}" rows="5" 
            placeholder="Enter ${label.toLowerCase()}">${prefillValue}</textarea>
          ${
            isRequired
              ? `<div class="error-message" id="${field_name}-error">This field is required</div>`
              : ""
          }
        </div>`;
      } else if (type === "radio") {
        const opts = options
          .split(",")
          .map((opt) => {
            const trimmed = opt.trim();
            const checked = prefillValue === trimmed ? "checked" : "";
            return `<label style="display: inline-block; margin-right: 15px; font-weight: normal;">
                    <input type="radio" name="${field_name}" value="${trimmed}" ${checked}> ${trimmed}</label>`;
          })
          .join("");
        fieldsHTML += `
        <div class="form-group">
          <label>${label} ${requiredSpan}</label><br>
          <div class="radio-group" id="${field_name}-group">
            ${opts}
          </div>
          ${
            isRequired
              ? `<div class="error-message" id="${field_name}-error">Please select an option</div>`
              : ""
          }
        </div>`;
      } else if (type === "checkbox") {
        const prefillArr = prefillValue ? prefillValue.split(",") : [];
        const opts = options
          .split(",")
          .map((opt) => {
            const trimmed = opt.trim();
            const checked = prefillArr.includes(trimmed) ? "checked" : "";
            return `<label style="display: block; margin-bottom: 8px; font-weight: normal;">
                    <input type="checkbox" name="${field_name}" value="${trimmed}" ${checked}> ${trimmed}</label>`;
          })
          .join("");
        fieldsHTML += `
        <div class="form-group">
          <label>${label} ${requiredSpan}</label>
          <div class="checkbox-group" id="${field_name}-group">
            ${opts}
          </div>
          ${
            isRequired
              ? `<div class="error-message" id="${field_name}-error">Please select at least one option</div>`
              : ""
          }
        </div>`;
      } else if (type === "dropdown") {
        const opts = options
          .split(",")
          .map((opt) => {
            const trimmed = opt.trim();
            const selected = prefillValue === trimmed ? "selected" : "";
            return `<option value="${trimmed}" ${selected}>${trimmed}</option>`;
          })
          .join("");
        fieldsHTML += `
        <div class="form-group">
          <label for="${field_name}">${label} ${requiredSpan}</label>
          <select id="${field_name}" name="${field_name}">
            <option value="">Select an option</option>
            ${opts}
          </select>
          ${
            isRequired
              ? `<div class="error-message" id="${field_name}-error">Please select an option</div>`
              : ""
          }
        </div>`;
      }
    });

    const finalHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Generated Form</title>
<style>
  body { font-family: Arial, sans-serif; padding: 20px; }
  .form-group { margin-bottom: 15px; text-align: left; }
  label { font-weight: bold; display: block; margin-bottom: 5px; }
  input, textarea, select { 
    width: 100%; 
    padding: 8px; 
    border: 1px solid #ccc; 
    border-radius: 6px; 
    box-sizing: border-box;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }
  
  /* Error styling for input fields */
  input.error, textarea.error, select.error { 
    border-color: #dc3545 !important; 
    box-shadow: 0 0 5px rgba(220, 53, 69, 0.3) !important;
    background-color: #fff5f5 !important;
  }
  
  /* Error styling for radio and checkbox groups */
  .radio-group.error, .checkbox-group.error {
    border: 2px solid #dc3545 !important;
    border-radius: 6px;
    padding: 8px;
    background-color: #fff5f5 !important;
  }
  
  /* Normal focus styling */
  input:focus, textarea:focus, select:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
  }
  
  /* Override focus styling when field has error */
  input.error:focus, textarea.error:focus, select.error:focus {
    border-color: #dc3545 !important;
    box-shadow: 0 0 5px rgba(220, 53, 69, 0.5) !important;
  }
  
  .required { color: #dc3545; }
  .actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; }
  button { padding: 10px 16px; border: none; border-radius: 6px; cursor: pointer; }
  .btn-submit { background: #007bff; color: white; }
  .btn-cancel { background: #ccc; }
  
  /* Error message styling */
  .error-message { 
    color: #dc3545; 
    font-size: 12px; 
    margin-top: 5px; 
    display: none;
    font-weight: normal;
  }
  
  .error-message.show { 
    display: block !important; 
  }
</style>
</head>
<body>
<h2>Please fill the form below</h2>
<form id="dynamicForm" novalidate>
  ${fieldsHTML}
  <div class="actions">
    <button type="button" class="btn-cancel" onclick="handleCancel()">Cancel</button>
    <button type="submit" class="btn-submit">Submit</button>
  </div>
</form>
<script>
  // Alternative simpler approach using URLSearchParams
  function getTokenFromURL(paramName) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(paramName) || '';
  }

  // Get token from URL parameter
  const token = getTokenFromURL("token");
  const env = getTokenFromURL("env");
  const ctaType = getTokenFromURL("cta_type");
  const id = getTokenFromURL("id");

  
  const form = document.getElementById("dynamicForm");
  
  // Function to validate form
  function validateForm() {
    let isValid = true;
    
    // Clear all previous errors first
    clearAllErrors();
    
    // Validate text inputs, textareas, and dropdowns
    const standardFields = form.querySelectorAll('input[type="text"], input[type="number"], textarea, select');
    standardFields.forEach(function(field) {
      const isRequired = field.closest('.form-group').querySelector('.required') !== null;
      if (isRequired && (!field.value || field.value.trim() === '')) {
        showFieldError(field);
        isValid = false;
      }
    });

    // Validate radio button groups
    const radioGroups = form.querySelectorAll('.radio-group');
    radioGroups.forEach(function(group) {
      const groupName = group.id.replace('-group', '');
      const isRequired = group.closest('.form-group').querySelector('.required') !== null;
      
      if (isRequired) {
        const checked = form.querySelectorAll('input[name="' + groupName + '"]:checked').length > 0;
        
        if (!checked) {
          showRadioCheckboxGroupError(groupName);
          isValid = false;
        }
      }
    });

    // Validate checkbox groups
    const checkboxGroups = form.querySelectorAll('.checkbox-group');
    checkboxGroups.forEach(function(group) {
      const groupName = group.id.replace('-group', '');
      const isRequired = group.closest('.form-group').querySelector('.required') !== null;
      
      if (isRequired) {
        const checked = form.querySelectorAll('input[name="' + groupName + '"]:checked').length > 0;
        
        if (!checked) {
          showRadioCheckboxGroupError(groupName);
          isValid = false;
        }
      }
    });

    return isValid;
  }
  
  function showFieldError(field) {
    field.classList.add('error');
    const errorElement = document.getElementById(field.name + '-error');
    if (errorElement) {
      errorElement.classList.add('show');
    }
  }
  
  function showRadioCheckboxGroupError(groupName) {
    const groupElement = document.getElementById(groupName + '-group');
    const errorElement = document.getElementById(groupName + '-error');
    
    if (groupElement) {
      groupElement.classList.add('error');
    }
    if (errorElement) {
      errorElement.classList.add('show');
    }
  }
  
  function clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = document.getElementById(field.name + '-error');
    if (errorElement) {
      errorElement.classList.remove('show');
    }
  }
  
  function clearRadioCheckboxGroupError(groupName) {
    const groupElement = document.getElementById(groupName + '-group');
    const errorElement = document.getElementById(groupName + '-error');
    
    if (groupElement) {
      groupElement.classList.remove('error');
    }
    if (errorElement) {
      errorElement.classList.remove('show');
    }
  }
  
  function clearAllErrors() {
    // Clear all field errors
    form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    form.querySelectorAll('.error-message').forEach(el => {
      el.classList.remove('show');
    });
  }

  // Real-time validation as user types/selects
  function setupRealTimeValidation() {
    // Add input event listeners to remove error styles when user starts typing/selecting
    form.querySelectorAll('input, textarea, select').forEach(function(field) {
      // For text inputs, textareas, and dropdowns
      if (field.type !== 'radio' && field.type !== 'checkbox') {
        
        // Clear error on input (as user types)
        field.addEventListener('input', function() {
          const isRequired = this.closest('.form-group').querySelector('.required') !== null;
          if (isRequired) {
            if (this.value && this.value.trim() !== '') {
              clearFieldError(this);
            }
          }
        });
        
        // Also clear error on focus out if field has value
        field.addEventListener('blur', function() {
          const isRequired = this.closest('.form-group').querySelector('.required') !== null;
          if (isRequired) {
            if (!this.value || this.value.trim() === '') {
              showFieldError(this);
            } else {
              clearFieldError(this);
            }
          }
        });
        
        // For dropdowns, also listen to change event
        if (field.tagName === 'SELECT') {
          field.addEventListener('change', function() {
            const isRequired = this.closest('.form-group').querySelector('.required') !== null;
            if (isRequired) {
              if (this.value && this.value.trim() !== '') {
                clearFieldError(this);
              }
            }
          });
        }
      }
      
      // For radio and checkbox groups
      if (field.type === 'radio' || field.type === 'checkbox') {
        field.addEventListener('change', function() {
          const groupName = this.name;
          const groupElement = document.getElementById(groupName + '-group');
          const isRequired = groupElement.closest('.form-group').querySelector('.required') !== null;
          
          if (isRequired) {
            // Check if any option in this group is selected
            const isAnySelected = form.querySelectorAll('input[name="' + groupName + '"]:checked').length > 0;
            if (isAnySelected) {
              clearRadioCheckboxGroupError(groupName);
            }
          }
        });
      }
    });
  }

  // Initialize real-time validation
  setupRealTimeValidation();

  form.addEventListener("submit", async function(e) {
    e.preventDefault();
    
    // Validate form first
    if (!validateForm()) {
      return;
    }
    
    // Check if token is available
    if (!token) {
      alert("Missing authentication token");
      return;
    }

    // Check if env is available
    if (!env || !ctaType || !id) {
      alert("Missing Important parameter");
      return;
    }
    
    const formData = {};
    new FormData(form).forEach((value, key) => {
      if(formData[key]) {
        formData[key] += "," + value; // handle checkboxes
      } else {
        formData[key] = value;
      }
    });

    const baseApi = env === "uat" ? "https://uat-apigl.clirnet.com/cta/cta_submitted_forms" : "https://apigl.clirnet.com/cta/cta_submitted_forms";

    try {
      const response = await fetch(baseApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify({
          cta_id: id,
          cta_type: ctaType,
          submitted_form_json: formData
        })
      });

      if (response.ok) {
        alert("Form submitted successfully!");
        form.reset();
        clearAllErrors(); // Clear errors after successful submission
      } else {
        alert("Submission failed");
      }
    } catch (err) {
      alert("Error submitting form");
      console.error(err);
    }
  });
  
  function handleCancel() {
    form.reset();
    clearAllErrors();
    alert("Form cancelled");
  }
</script>
</body>
</html>
    `;

    if (setFormHtml) {
      setFormHtml(finalHTML);
    }
    console.log(finalHTML);
  };

  // === Auto-generate HTML whenever form or prefilledData changes ===
  useEffect(() => {
    if (formData && formData.length > 0) {
      generateHTMLCode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, prefilledData]);

  // ====== UI ======
  if (!formData || formData.length === 0) {
    return (
      <Container className="text-center">
        <h4 className="mb-4">No form found</h4>
      </Container>
    );
  }

  return (
    <Container className="text-center">
      <h4 className="mb-4">
        {isPreview ? "Form Preview" : "Please fill the form below"}
      </h4>
      <Form onSubmit={handleSubmit}>
        {formData.map((field, idx) => {
          const { field_name, label, type, is_mandatory, options } = field;
          const isRequired = is_mandatory === "1" || is_mandatory === 1;
          const value =
            userInput[field_name] || prefilledData[field_name] || "";

          return (
            <Form.Group className="mb-3" key={`${field_name}_${idx}`}>
              <Form.Label className="d-flex justify-content-start">
                {label}
                {isRequired && <span className="text-danger"> *</span>}
              </Form.Label>
              {type === "text" || type === "number" ? (
                <Form.Control
                  type={type}
                  name={field_name}
                  value={value}
                  required={isRequired && !isPreview}
                  onChange={handleChange}
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
              ) : type === "textarea" ? (
                <Form.Control
                  as="textarea"
                  rows={5}
                  name={field_name}
                  value={value}
                  required={isRequired && !isPreview}
                  onChange={handleChange}
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
              ) : type === "radio" ? (
                options
                  ?.split(",")
                  .map((opt, i) => (
                    <Form.Check
                      key={`${field_name}_${opt}_${i}`}
                      type="radio"
                      label={opt.trim()}
                      name={field_name}
                      value={opt.trim()}
                      checked={value === opt.trim()}
                      required={isRequired && !isPreview}
                      onChange={handleChange}
                    />
                  ))
              ) : type === "checkbox" ? (
                options
                  ?.split(",")
                  .map((opt, i) => (
                    <Form.Check
                      key={`${field_name}_${opt}_${i}`}
                      type="checkbox"
                      label={opt.trim()}
                      name={field_name}
                      value={opt.trim()}
                      checked={value?.split(",")?.includes(opt.trim())}
                      onChange={handleChange}
                    />
                  ))
              ) : type === "dropdown" ? (
                <Form.Select
                  name={field_name}
                  value={value}
                  required={isRequired && !isPreview}
                  onChange={handleChange}
                >
                  <option value="">Select an option</option>
                  {options?.split(",").map((opt, i) => (
                    <option key={i} value={opt.trim()}>
                      {opt.trim()}
                    </option>
                  ))}
                </Form.Select>
              ) : null}
            </Form.Group>
          );
        })}

        <div className="d-flex justify-content-end gap-2">
          <Button
            variant="secondary"
            type="button"
            onClick={() => {
              if (isPreview) {
                toast.info("Preview cancelled");
              } else {
                setUserInput({});
                toast.info("Form cancelled");
              }
            }}
          >
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default FormPage;
