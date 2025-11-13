import React, { memo, useRef, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";

import { DynamicCTATemplateCard } from "../CTA/DynamicCTATemplateCard";
import { Copy, FileText, Eye } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import FormPage from "../screens/FormPage";

const CardPreview = memo(
  ({
    editorData,
    setActiveMenu,
    isHover,
    domTree = "",
    setDomTree = () => {},
    setFormHtml = () => {},
  }) => {
    const [previewTab, setPreviewTab] = useState("Card");
    const containerRef = useRef(null);

    useEffect(() => {
      if (containerRef.current) {
        setDomTree(containerRef.current.outerHTML);
      }
    }, [editorData]);

    const previewTabs = [
      { key: "Card", title: "Card Preview", icon: Eye },
      { key: "Form", title: "Form Preview", icon: FileText },
    ];

    // console.log(  editorData?.formJson, "editorData");

    const renderPreviewContent = () => {
      switch (previewTab) {
        case "Card":
          return (
            <div ref={containerRef}>
              {editorData ? (
                <div className="bg-white rounded-3">
                  <DynamicCTATemplateCard
                    isHover={isHover}
                    setActiveMenu={setActiveMenu}
                    {...editorData}
                  />
                </div>
              ) : (
                <div className="text-muted fst-italic p-4 text-center">
                  No card data available
                </div>
              )}
            </div>
          );
        case "Form":
          return (
            <div className="bg-white rounded-3">
              {Array.isArray(editorData?.formJson) &&
              editorData.formJson.length > 0 ? (
                <FormPage
                  setFormHtml={setFormHtml}
                  formData={editorData.formJson}
                  isPreview={true}
                />
              ) : (
                <div className="text-muted fst-italic p-4 text-center">
                  No form data available. Please configure the form in the
                  editor.
                </div>
              )}
            </div>
          );
        default:
          return null;
      }
    };

    return (
      <div
        className="p-3 m-3 bg-light rounded shadow-sm"
        style={{ maxHeight: "100%" }}
      >
        <style>{`
          .tab-btn {
            background: none;
            border: none;
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            color: #6c757d;
            position: relative;
            white-space: nowrap;
            cursor: pointer;
            font-weight: 500;
            transition: color 0.2s ease;
          }
          .tab-btn:hover {
            color: #0d6efd;
          }
          .tab-btn.active {
            color: #0d6efd;
          }
          .tab-btn .underline {
            position: absolute;
            bottom: -2px;
            left: 25%;
            right: 25%;
            height: 3px;
            background-color: #0d6efd;
            border-radius: 2px;
            transition: all 0.2s ease;
          }
          .tab-btn .icon { 
            margin-bottom: 0.25rem;
            font-size: 1.1rem;
          }
          .preview-tab-btn {
            background: none;
            border: none;
            padding: 0.4rem 0.8rem;
            font-size: 0.8rem;
            color: #6c757d;
            position: relative;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.2s ease;
            border-radius: 4px;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          .preview-tab-btn:hover {
            color: #0d6efd;
            background-color: #f8f9fa;
          }
          .preview-tab-btn.active {
            color: #0d6efd;
            background-color: #e3f2fd;
          }
          /* Hide scrollbar for Chrome, Safari and Opera */
          .output-content::-webkit-scrollbar {
            display: none;
          }
          .output-content {
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* IE 10+ */
          }
          .tab-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
          }
        `}</style>

        {/* Only Card/Form Tabs */}
        <div className="d-flex gap-1 border-bottom mb-3">
          {previewTabs.map((tab) => (
            <button
              key={tab.key}
              className={`preview-tab-btn ${
                previewTab === tab.key ? "active" : ""
              }`}
              onClick={() => setPreviewTab(tab.key)}
            >
              <tab.icon size={16} />
              {tab.title}
            </button>
          ))}
        </div>

        {/* Preview Content */}
        <div>{renderPreviewContent()}</div>
        {/* <div className="bg-white rounded-3 p-3">{renderPreviewContent()}</div> */}

        <ToastContainer position="top-center" autoClose={2000} />
      </div>
    );
  }
);

export default CardPreview;
