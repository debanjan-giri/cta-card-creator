import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  FiCopy,
  FiX,
  FiBox,
  FiType,
  FiLayout,
  FiSun,
  FiRefreshCw,
} from "react-icons/fi";
import { Badge, Button } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import { classOptions } from "../constants/BootstrapClass";
import { DynamicCTATemplateCard } from "../CTA/DynamicCTATemplateCard";
import { themeStyles } from "../constants/modalCss";
import "../css/global.css";
import { RxMargin } from "react-icons/rx";
import { TbBackground, TbBoxPadding } from "react-icons/tb";
import { PiSelectionBackground } from "react-icons/pi";
import { FaBorderTopLeft } from "react-icons/fa6";

const BootstrapVisualController = ({
  changedData,
  disabled,
  activeMenu,
  onChange,
  isLightButton = false,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSection, setSelectedSection] = useState(activeMenu || "title");
  const [selectedClasses, setSelectedClasses] = useState({});
  const [preservedClasses, setPreservedClasses] = useState("");
  const [activeTab, setActiveTab] = useState("typography");
  const [manualClasses, setManualClasses] = useState("");
  const [isManualEdit, setIsManualEdit] = useState(false);

  const sectionConfig = {
    title: { label: "Title", icon: <FiType /> },
    imageObject: { label: "Image", icon: <FiLayout /> },
    paragraph: { label: "Paragraph", icon: <FiType /> },
    button: { label: "Button", icon: <FiBox /> },
    cardStyle: { label: "Card Style", icon: <FiLayout /> },
    tag: { label: "Tag", icon: <FiSun /> },
  };

  const availableSections = Object.keys(changedData || {})
    .filter((key) => sectionConfig[key])
    .map((key) => ({
      key,
      label: sectionConfig[key].label,
      icon: sectionConfig[key].icon,
    }));

  const parseExistingClasses = (classString) => {
    if (!classString) return { controlled: {}, preserved: "" };
    const existingClasses = classString.split(" ").filter(Boolean);
    const controlled = {};
    const preserved = [];

    existingClasses.forEach((cls) => {
      let found = false;
      for (const [category, config] of Object.entries(classOptions)) {
        if (config.options.some((option) => option.value === cls)) {
          controlled[category] = cls;
          found = true;
          break;
        }
      }
      if (!found) preserved.push(cls);
    });

    return {
      controlled,
      preserved: preserved.join(" "),
    };
  };

  useEffect(() => {
    const currentClasses = changedData?.[selectedSection]?.extraClass || "";
    const parsed = parseExistingClasses(currentClasses);
    setSelectedClasses(parsed.controlled);
    setPreservedClasses(parsed.preserved);
    if (!isManualEdit) {
      setManualClasses(currentClasses);
    }
  }, [selectedSection, changedData, isManualEdit]);

  // const handleClassChange = (category, newValue) => {
  //   const updated = { ...selectedClasses, [category]: newValue };
  //   setSelectedClasses(updated);
  //   const controlledClasses = Object.values(updated).filter(Boolean).join(" ");
  //   const allClasses = [preservedClasses, controlledClasses]
  //     .filter(Boolean)
  //     .join(" ");

  //   if (onChange && changedData[selectedSection]) {
  //     onChange(
  //       {
  //         ...changedData[selectedSection],
  //         extraClass: allClasses,
  //       },
  //       selectedSection
  //     );
  //   }
  // };

  // const getAllClasses = () => {
  //   const controlledClasses = Object.values(selectedClasses)
  //     .filter(Boolean)
  //     .join(" ");
  //   return [preservedClasses, controlledClasses].filter(Boolean).join(" ");
  // };

  const handleClassChange = (category, newValue) => {
    setIsManualEdit(false); // Switch back to controlled mode
    const updated = { ...selectedClasses, [category]: newValue };
    setSelectedClasses(updated);
    const controlledClasses = Object.values(updated).filter(Boolean).join(" ");
    const allClasses = [preservedClasses, controlledClasses]
      .filter(Boolean)
      .join(" ");

    setManualClasses(allClasses); // Keep manual classes in sync

    if (onChange && changedData[selectedSection]) {
      onChange(
        {
          ...changedData[selectedSection],
          extraClass: allClasses,
        },
        selectedSection
      );
    }
  };

  const getAllClasses = () => {
    if (isManualEdit) {
      return manualClasses;
    }
    const controlledClasses = Object.values(selectedClasses)
      .filter(Boolean)
      .join(" ");
    return [preservedClasses, controlledClasses].filter(Boolean).join(" ");
  };

  const handleManualClassChange = (e) => {
    const newValue = e.target.value;
    setManualClasses(newValue);
    setIsManualEdit(true);

    // Apply changes immediately for live preview
    if (onChange && changedData[selectedSection]) {
      onChange(
        {
          ...changedData[selectedSection],
          extraClass: newValue,
        },
        selectedSection
      );
    }
  };

  const clearAllClasses = () => {
    setSelectedClasses({});
    setPreservedClasses("");
    if (onChange && changedData[selectedSection]) {
      onChange(
        {
          ...changedData[selectedSection],
          extraClass: "",
        },
        selectedSection
      );
    }
  };

  const applyClasses = () => {
    setShowModal(false);
  };

  const SectionHeader = useMemo(
    () =>
      React.memo(({ icon, title }) => (
        <div className="d-flex align-items-center mb-3 mt-4">
          <span className="text-primary me-2">{icon}</span>
          <h6 className="m-0 text-uppercase text-muted fw-bold">{title}</h6>
        </div>
      )),
    []
  );

  const ControlSection = useMemo(
    () =>
      React.memo(({ categories, icon, title }) => (
        <div className="col-12">
          <SectionHeader icon={icon} title={title} />
          <div className="row g-3">
            {categories.map((category) => (
              <div key={category} className="col-md-6 control-group">
                <label className="form-label small fw-bold text-muted">
                  {classOptions[category]?.label}
                </label>
                <select
                  className="form-select"
                  value={selectedClasses[category] || ""}
                  onChange={(e) => handleClassChange(category, e.target.value)}
                  disabled={disabled}
                >
                  {classOptions[category]?.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      )),
    [selectedClasses, handleClassChange, SectionHeader, disabled]
  );

  const sections = useMemo(
    () => [
      {
        key: "typography",
        categories: ["fontSize", "fontWeight", "textAlign", "textColor"],
        icon: <FiType />,
        title: "Typography",
      },
      {
        key: "background",
        categories: ["background", "shadow", "opacity", "width", "height"],
        icon: <TbBackground />,
        title: "Background",
      },
      {
        key: "padding",
        categories: [
          "padding",
          "paddingTop",
          "paddingBottom",
          "paddingLeft",
          "paddingRight",
        ],
        icon: <TbBoxPadding />,
        title: "Padding",
      },
      {
        key: "margin",
        categories: [
          "margin",
          "marginTop",
          "marginBottom",
          "marginLeft",
          "marginRight",
        ],
        icon: <RxMargin />,
        title: "Margin",
      },
      {
        key: "border",
        categories: ["border", "borderColor", "rounded", "roundedCorner"],
        icon: <FaBorderTopLeft />,
        title: "Border & Radius",
      },
    ],
    []
  );

  if (availableSections.length === 0) return null;

  return (
    <div className="container p-0">
      <style>{themeStyles}</style>

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
        }
      `}</style>

      <Button
        variant={!isLightButton ? "primary" : "light"}
        className={`mb-3 d-flex align-items-center gap-2`}
        onClick={() => setShowModal(true)}
        disabled={disabled}
      >
        <FiBox className="" />{isLightButton ? "Advanced" : "Style Controller"}
      </Button>

      {showModal && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        >
          <div className="modal-dialog modal-xl modal-dialog-scrollable">
            <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="modal-header bg-white border-bottom py-3 px-4">
                <h5 className="modal-title d-flex align-items-center gap-2">
                  <FiSun className="text-primary" />
                  <span className="fw-semibold text-dark">Style Controller:
                  </span>
                  <Badge
                    bg="secondary"
                    className="ms-2"
                    style={{ fontSize: "0.8em" }}
                  >
                    {
                      availableSections.find((s) => s.key === selectedSection)
                        ?.label
                    }
                  </Badge>
                </h5>
                <button
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                />
              </div>

              <div className="modal-body bg-light">
                <div className="row g-3">
                  <div className="col-lg-6">
                    <div className="bg-white p-4 rounded-3 border shadow-sm h-100">
                      <Swiper
                        slidesPerView="auto"
                        spaceBetween={12}
                        modules={[Mousewheel]}
                        mousewheel={{ forceToAxis: true }}
                        grabCursor
                        freeMode={true}
                        className="mb-3"
                      >
                        {sections.map((section) => (
                          <SwiperSlide
                            key={section.key}
                            style={{ width: "auto" }}
                          >
                            <button
                              className={`tab-btn ${activeTab === section.key ? "active" : ""
                                }`}
                              onClick={() => setActiveTab(section.key)}
                            >
                              {section.icon}
                              <span>{section.title}</span>
                              {activeTab === section.key && (
                                <div className="underline" />
                              )}
                            </button>
                          </SwiperSlide>
                        ))}
                      </Swiper>

                      <div className="tab-panel-wrapper p-3">
                        {sections.map((section) =>
                          section.key === activeTab ? (
                            <ControlSection
                              key={section.key}
                              categories={section.categories}
                              icon={section.icon}
                              title={section.title}
                            />
                          ) : null
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 d-flex flex-column gap-3">
                    <div className="bg-white rounded-4 border shadow-sm p-3 h-100 d-flex flex-column">
                      <h6 className="fw-semibold mb-3 text-muted">
                        Live Preview
                      </h6>
                      <div className="flex-grow-1 d-flex align-items-center justify-content-center bg-light-subtle rounded-3 p-1">
                        <div style={{ maxWidth: "100%", width: "100%" }}>
                          <DynamicCTATemplateCard
                            isHover={true}
                            setActiveMenu={setSelectedSection}
                            {...changedData}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-3 border shadow-sm p-3">
                      <label className="form-label fw-semibold small text-muted mb-2">
                        Generated Classes for{" "}
                        {
                          availableSections.find(
                            (s) => s.key === selectedSection
                          )?.label
                        }
                      </label>
                      <textarea
                        className="form-control form-control-sm font-monospace"
                        rows="3"
                        value={getAllClasses()}
                        onChange={handleManualClassChange}
                        placeholder="Enter Bootstrap classes manually..."
                        style={{ fontSize: "0.8em", resize: "none" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer bg-white d-flex justify-content-between border-top px-4 py-3">
                <Button
                  variant="outline-secondary"
                  onClick={clearAllClasses}
                  disabled={disabled}
                >
                  <FiRefreshCw className="me-2" /> Reset
                </Button>
                <Button
                  variant="primary"
                  onClick={applyClasses}
                  disabled={disabled}
                >
                  <FiCopy className="me-2" /> Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BootstrapVisualController;
