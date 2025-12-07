import React, { useEffect, useRef, useState } from "react";
import InputBox from "../components/InputBox";
import DropdownBox from "../components/DropdownBox";

import { Selector } from "../components/Selector";
import ColorPickerBox from "../components/ColorPickerBox";
import { Accordion, Button, Tab, Tabs } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { MdOutlineDelete } from "react-icons/md";
import { AlignCenter, ArrowLeft, ArrowRight } from "lucide-react";
const ButtonEditor = ({ onChange, changedData, modalComponent }) => {
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    if (Array.isArray(changedData?.button)) {
      setButtons(changedData.button);
    } else {
      setButtons([]);
    }
  }, [changedData]);

  const handleUpdateButton = (index, key, value) => {
    const updated = [...buttons];
    updated[index] = { ...updated[index], [key]: value };

    setButtons(updated);
    onChange && onChange(updated);
  };

  const handleAddButton = () => {
    if (buttons.length >= 3) {
      toast.error("You can only add up to 3 buttons.");
      return;
    }

    const defaultButton = {
      url: "",
      content: "Click here",
      variation: "btn-primary",
      size: "md",
      position: "left",
      startEndorment: "",
      endEndorment: "",
      extraClass: "py-3 fw-semibold fs-5",
      btnTextColor: "",
      action: "",
      consent_statement: "",
    };

    const updated = [...buttons, defaultButton];
    setButtons(updated);
    onChange && onChange(updated);
  };

  const handleDeleteButton = (index) => {
    const updated = buttons.filter((_, i) => i !== index);
    setButtons(updated);
    onChange && onChange(updated);
  };

  const renderButtonEditor = (btn, index) => (
    <div className="">
      <div className="mb-3">
        <InputBox
          label={"Text"}
          value={btn.content}
          setValue={(val) => handleUpdateButton(index, "content", val)}
          placeholder={"Set text"}
        />
      </div>
      {console.log("btn?.content?.length", btn?.content?.length)}
      <div className="mb-3">
        <ColorPickerBox
          label={"Variation"}
          data={{
            "btn-primary": "#0d6efd",
            "btn-secondary": "#6c757d",
            "btn-success": "#198754",
            "btn-danger": "#dc3545",
            "btn-warning": "#ffc107",
            "btn-info": "#0dcaf0",
            "btn-light": "#f8f9fa",
            "btn-dark": "#212529",
            "btn-link": "#0d6efd",
          }}
          value={btn?.variation}
          setValue={(val) => handleUpdateButton(index, "variation", val)}
        />
      </div>

      <div className="mb-3">
        <ColorPickerBox
          label={"Button Text Color"}
          disabled={btn.variation?.startsWith("btn-") ? true : false}
          data={{
            primary: "#0000FF",
            secondary: "#FF0000",
            dark: "#000000",
            light: "#FFFFFF",
          }}
          value={btn.btnTextColor}
          setValue={(val) => handleUpdateButton(index, "btnTextColor", val)}
        />
      </div>

      <div className="mb-3">
        <InputBox
          label={"Button consent statement"}
          value={btn.consent_statement}
          setValue={(val) =>
            handleUpdateButton(index, "consent_statement", val)
          }
          placeholder={"Set consent statement"}
        />
      </div>

      <div className="mb-3">
        <DropdownBox
          label={"Size"}
          value={btn.size}
          setValue={(val) => handleUpdateButton(index, "size", val)}
          data={["sm", "md", "lg", "w-100", "value in px"]}
        />
      </div>

      <div className="mb-3">
        <Selector
          label={"Button Position"}
          data={[
            { key: "right", label: "Right", icon: ArrowRight },
            { key: "left", label: "Left", icon: ArrowLeft },
            { key: "center", label: "Center", icon: AlignCenter },
          ]}
          value={btn.position}
          onSelect={(val) => handleUpdateButton(index, "position", val)}
        />
      </div>

      <div className="mb-3">
        <InputBox
          label={"URL"}
          value={btn.url}
          setValue={(val) => handleUpdateButton(index, "url", val)}
          placeholder={"Set URL"}
        />
      </div>

      <div className="mb-3">
        <DropdownBox
          label={"Action"}
          value={btn.action}
          setValue={(val) => handleUpdateButton(index, "action", val)}
          data={["internal_redirect", "external_redirect"]}
        />
      </div>

      <div className="mb-3">
        <InputBox
          label={"Start Endorment"}
          value={btn.startEndorment}
          setValue={(val) => handleUpdateButton(index, "startEndorment", val)}
          placeholder={"Set svg or icon"}
        />
      </div>

      <div className="mb-3">
        <InputBox
          label={"End Endorment"}
          value={btn.endEndorment}
          setValue={(val) => handleUpdateButton(index, "endEndorment", val)}
          placeholder={"Set svg or icon"}
        />
      </div>
      <div className="mb-3">
        <InputBox
          label={"Extra Class"}
          isTextarea={true}
          value={btn.extraClass}
          setValue={(val) => handleUpdateButton(index, "extraClass", val)}
          placeholder={"Set extra class"}
        />
      </div>
    </div>
  );

  return (
    <div className=" p-3 bg-white rounded shadow-sm ">
      <div className="position-relative">
        <p
          className="position-absolute top-0 end-0"
          onClick={handleAddButton}
          size={30}
          style={{
            cursor: "pointer",
            color: "#0d6efd",
            zIndex: 1,
          }}
        >
          Add +
        </p>
        <Tabs defaultActiveKey="0" id="button-tabs" className="mb-3">
          {buttons &&
            buttons.map((btn, idx) => (
              <Tab
                eventKey={idx.toString()}
                key={idx}
                title={
                  <span className="d-inline-flex align-items-center gap-1">
                    <span>Button {idx + 1}</span>
                    <span
                      onClick={(e) => {
                        e.stopPropagation(); // prevent tab switch
                        handleDeleteButton(idx);
                      }}
                      style={{
                        cursor: "pointer",
                        color: "#dc3545",
                        display: "inline-flex",
                        alignItems: "center",
                      }}
                      title="Delete Button"
                    >
                      <MdOutlineDelete size={16} />
                    </span>
                  </span>
                }
              >
                {renderButtonEditor(btn, idx)}
              </Tab>
            ))}
        </Tabs>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default ButtonEditor;
