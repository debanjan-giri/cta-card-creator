import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  FloatingLabel,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const FormPage = () => {
  const [userInput, setUserInput] = useState({});
  const { ctaType = "", id = "", token = "" } = useParams();
  const [form, setForm] = useState([]);

  useEffect(() => {
    if (!id || !ctaType || !token) {
      toast.error("Unable to load form data");
      console.error("Invalid form submission parameters");
    }

    const fetchForm = async () => {
      try {
        const response = await axios.get(`cta/cta_forms/${id}/${ctaType}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setForm(data?.data);
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };
    fetchForm();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setUserInput((prev) => {
        const prevArr = prev[name]?.split(",") || [];
        const newArr = checked
          ? [...prevArr, value]
          : prevArr.filter((v) => v !== value);
        return {
          ...prev,
          [name]: newArr.join(","),
        };
      });
    } else {
      setUserInput((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id || !ctaType || !token) {
      toast.error("Invalid form submission parameters");
      console.error("Invalid form submission parameters");
      return;
    }

    if (!userInput || Object.keys(userInput).length === 0) {
      toast.error("Please fill the form before submitting");
      console.error("Invalid form submission data");
      return;
    }

    if (
      form.some((_q) => _q.is_mandatory == 1 && !userInput[_q.field_name])
    ) {
      toast.error("Please fill all mandatory fields");
      return;
    }
    let response = await axios.post("cta/cta_submitted_forms", {
      cta_id: id,
      cta_type: ctaType,
      submitted_form_json: userInput,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log("response:", response);
    if (response.status == 200) {
      toast.success("Your Response submitted successfully");
    }
  };

  if (!form || form.length === 0) {
    return (
      <Container className="p-4 mt-4 text-center">
        <h4 className="mb-4">No form found</h4>
      </Container>
    );
  }

  return <Container className="p-4 mt-4 text-center">
    <h4 className="mb-4">Please fill the form below</h4>
    <Form onSubmit={handleSubmit}>
      {form.map((field, idx) => {
        const { field_name, type, label, is_mandatory, options } = field;
        const isRequired = is_mandatory === "1";
        const value = userInput[field_name] || "";

        return (
          <Form.Group className="mb-3" key={idx}>
            <Form.Label>
              {label}
              {isRequired && <span className="text-danger"> *</span>}
            </Form.Label>

            {type === "text" || type === "number" ? (
              <Form.Control
                type={type}
                name={field_name}
                value={value}
                required={isRequired}
                onChange={handleChange}
                placeholder={`Enter ${label.toLowerCase()}`}
              />
            ) : type === "textarea" ? (
              <Form.Control
                as="textarea"
                rows={3}
                name={field_name}
                value={value}
                required={isRequired}
                onChange={handleChange}
                placeholder={`Enter ${label.toLowerCase()}`}
              />
            ) : type === "radio" ? (
              options?.split(",").map((opt, i) => (
                <Form.Check
                  key={i}
                  type="radio"
                  id={`${field_name}_${opt}`}
                  label={opt}
                  name={field_name}
                  value={opt}
                  checked={value === opt}
                  required={isRequired}
                  onChange={handleChange}
                />
              ))
            ) : type === "checkbox" ? (
              options?.split(",").map((opt, i) => (
                <Form.Check
                  key={i}
                  type="checkbox"
                  id={`${field_name}_${opt}`}
                  label={opt}
                  name={field_name}
                  value={opt}
                  checked={value?.split(",")?.includes(opt)}
                  onChange={handleChange}
                />
              ))
            ) : type === "dropdown" ? (
              <Form.Select
                name={field_name}
                value={value}
                required={isRequired}
                onChange={handleChange}
              >
                <option value="">Select an option</option>
                {(typeof options === "string"
                  ? options.split(",").map((opt) => ({ label: opt, value: opt }))
                  : options
                ).map((opt, i) => (
                  <option key={i} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Form.Select>
            ) : null}
          </Form.Group>
        );
      })}

      <div className="d-flex justify-content-end">
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  </Container>
};

export default FormPage;