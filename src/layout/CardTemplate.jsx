import { Copy, Check, AlertTriangle } from "lucide-react";
import { memo, useState, useEffect } from "react";
import { Button, Accordion } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import templateData from "../constants/templateData";
import { DynamicCTATemplateCard } from "../CTA/DynamicCTATemplateCard";
import GeminJsonCreator from "../utils/GeminJsonCreator";
import { BsCheckCircleFill, BsFillCheckCircleFill } from "react-icons/bs";
import GenerateJsonComponent from "../utils/GenerateJsonComponent";
import { FaPlus } from "react-icons/fa6";
import "../css/global.css";
import BootstrapVisualController from "../components/BootstrapModal";

const InitialJson = {
  tag: {
    text: "",
    position: "",
    bgColor: "",
    textColor: "",
    borderRadius: "",
    bgOpacity: "",
    extraClass: "",
  },
  title: {
    content: "Sample CTA Card",
    variation: "h4",
    opacity: "text-opacity-100",
    color: "dark",
    startEndorment: "",
    endEndorment: "",
    extraClass: "justify-content-center",
  },
  paragraph: {
    content: "Sample description for the CTA card",
    opacity: "text-opacity-100",
    color: "dark",

    extraClass: "mt-2",
  },
  button: [
    {
      url: "",
      content: "Click here",
      variation: "btn-primary",
      size: "",
      position: "center",
      startEndorment: "",
      endEndorment: "",
      extraClass: "px-4 fw-medium fs-5",
    },
  ],
  cardStyle: {
    cardbgcolor: "white",
    color: "primary",
    cardbgopacity: "bg-opacity-10",
    border: "",
    borderColor: "",
    borderOpacity: "",
    borderWidth: "rounded-3",
    extraClass: "",
    borderRadius: "",
  },
  imageObject: [
    {
      url: "https://clirnet-cms.b-cdn.net/medwiki/43_server/video/1696423230_1688713284_78rr-removebg-preview_(1).png?tr=w-411,h-108,pr=true,c-at_max",
      position: "top-right",
      size: "30px",
      alt: "image text",
      extraClass: "",
    },
  ],
};

const CardTemplate = memo(
  ({
    editorData,
    onSelectTemplate,
    setEditorData,
    activeMenu,
    onChange,
  }) => {
    const [selectedTemplateId, setSelectedTemplateId] = useState(4);

    return (
      <div className="p-1 pe-2 ps-2">
        <div
          className="d-flex flex-column gap-1 mt-3"
          style={{ maxHeight: "100vh", overflow: "hidden" }}
        >
          {/* Sticky Create Card section */}
          <div
            style={{
              position: "sticky",
              top: 0,
              background: "white",
              zIndex: 10,
            }}
          >
            <p>Create Your CTA Cards</p>
            <div className="d-flex gap-2 flex-wrap">
              <Button
                variant={"light"}
                className={`mb-3 d-flex align-items-center gap-2`}
                onClick={() => {
                  setEditorData(InitialJson);
                  setSelectedTemplateId(null);
                }}
              >
                <FaPlus className="icon-animate" />
                Create New Card
              </Button>

              <GenerateJsonComponent onSelectTemplate={onSelectTemplate} />

              <div>
                <BootstrapVisualController
                  onChange={onChange}
                  changedData={editorData}
                  isLightButton={true}
                  activeMenu={activeMenu}
                />
              </div>
            </div>
            <hr />
          </div>

          <div
            style={{
              overflowY: "scroll",
              flex: 1,

              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",

              marginRight: "-16px",
              paddingRight: "16px",
            }}
          >
            <p>Select a CTA Template :</p>
            <div className="m-2">
              {templateData &&
                Array.isArray(templateData) &&
                templateData.map((template) => {
                  const isSelected = selectedTemplateId === template.id;

                  return (
                    <div
                      key={template.id}
                      className={`template-card p-2 rounded mb-3 position-relative ${isSelected
                        ? "template-card-selected"
                        : "template-card-default"
                        }`}
                      onClick={(e) => {
                        setSelectedTemplateId(template.id);
                        onSelectTemplate(template.data);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {isSelected && (
                        <div className="selected-check">
                          <BsFillCheckCircleFill color="#0d6efd" size={18} />
                        </div>
                      )}
                      <DynamicCTATemplateCard
                        disablePropagation={false}
                        {...template.data}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <ToastContainer position="top-center" autoClose={2000} />
      </div>
    );
  }
);

export default CardTemplate;
