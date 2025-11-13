import React, { memo, useState } from "react";
import { toast } from "react-toastify";
import FormQuestionModal from "./FormQuestionModal";
import parse from "html-react-parser";
import "../css/global.css";
import { Fade } from "react-bootstrap";
import { utils } from "../utils/cssExtractor";

const reactHtmlParser = (_params) => {
  if (_params || typeof _params == "string") {
    return parse(`${_params}`);
  }
};

export const openNewTab = (url, cb) => {
  let win = window.open(url, "_blank");
  console.log(win, win.location);
  if (win) {
    win.location;
  } else {
    if (cb) {
      cb();
    } else {
      window.location.href = url;
    }
  }
};

export const DynamicCTATemplateCard = ({
  setActiveMenu,
  isHover = false,
  disablePropagation = true,
  // Component Props
  title = {
    content: "",
    variation: "",
    opacity: "",
    color: "",
    startEndorment: "",
    endEndorment: "",
    extraClass: "",
  },
  paragraph = {
    content: "",
    opacity: "",
    color: "",
    extraClass: "",
  },
  ctaId = "",
  ctaType = "",
  formJson = [],
  button = [],
  pageName = "",
  position = "",
  tag = {
    text: "",
    position: "left",
    icon: "",
  },
  cardStyle = {
    cardbgImage: "",
    cardbgcolor: "",
    color: "",
    cardbgopacity: "",
    border: "",
    borderColor: "",
    borderOpacity: "",
    borderWidth: "",
    borderRadius: "",
    extraClass: "",
  },
  imageObject = [],
}) => {
  // Destructure props
  const {
    extraClass: titleExtraClass,
    content: titleContent,
    variation,
    opacity: titleOpacity,
    color,
    startEndorment,
    endEndorment,
  } = title;

  const {
    content: paragraphContent,
    opacity: paragraphOpacity,
    color: paragraphColor,
    extraClass: paragraphExtraClass,
  } = paragraph;

  const {
    text: tagText,
    position: tagPosition,
    bgColor: tagBgColor,
    textColor: tagTextColor,
    borderRadius: tagBorderRadius,
    bgOpacity: tagBgOpacity,
    extraClass: tagExtraClass,
  } = tag;

  const {
    cardbgImage,
    cardbgcolor,
    color: cardTextColor,
    cardbgopacity,
    border,
    borderColor,
    borderOpacity,
    borderWidth,
    borderRadius,
    extraClass: cardExtraClass,
  } = cardStyle;

  // Title tag selection
  const getTitleTag = () => {
    switch (variation) {
      case "h1":
        return "h1";
      case "h2":
        return "h2";
      case "h3":
        return "h3";
      case "h4":
        return "h4";
      case "h5":
        return "h5";
      case "h6":
        return "h6";
      case "sub_header":
        return "h5";
      default:
        return "h5";
    }
  };

  const TitleTag = getTitleTag();
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [showConsentDetails, setShowConsentDetails] = useState({
    consent_statement: "",
    cta_type_id: "",
    cta_type: "",
    btn_url: "",
    target_type: "",
    target_type_id: "",
    position: "",
    cta_id: "",
  });

  const [showFormModal, setShowFormModal] = useState(false);
  const onHide = () => setShowFormModal(false);

  // Color handling
  const isHexColor = color?.startsWith("#");
  const titleTextStyle = isHexColor ? { color } : {};
  const titleTextClass = isHexColor ? "" : `text-${color}`;

  const paragraphIsHexColor = paragraphColor?.startsWith("#");
  const paragraphTextStyle = paragraphIsHexColor
    ? { color: paragraphColor }
    : {};
  const paragraphTextClass = paragraphIsHexColor
    ? ""
    : `text-${paragraphColor}`;

  const tagIsHexColor = tagTextColor?.startsWith("#");
  const tagTextStyle = tagIsHexColor ? { color: tagTextColor } : {};
  const tagTextClass = tagIsHexColor ? "" : `text-${tagTextColor}`;

  const tagBgIsHexColor = tagBgColor?.startsWith("#");
  const tagBgStyle = tagBgIsHexColor ? { backgroundColor: tagBgColor } : {};
  const tagBgClass = tagBgIsHexColor ? "" : `bg-${tagBgColor}`;

  const cardTextIsHexColor = cardTextColor?.startsWith("#");
  const cardTextStyle = cardTextIsHexColor ? { color: cardTextColor } : {};
  const cardTextClass = cardTextIsHexColor ? "" : `text-${cardTextColor}`;

  const cardBgIsHexColor = cardbgcolor?.startsWith("#");
  const cardBgStyle = cardBgIsHexColor ? { backgroundColor: cardbgcolor } : {};
  const cardBgClass = cardBgIsHexColor ? "" : `bg-${cardbgcolor}`;

  const postForm = async (userInput) => {
    console.log("user has clicked submit button");
    if (
      formJson.some((_q) => _q.is_mandatory == 1 && !userInput[_q.field_name])
    ) {
      toast.error("Please fill all mandatory fields");
      return;
    }
    return;
    // API call implementation here
  };

  // Render tag component
  const renderTag = () => {
    if (!tagText) return null;

    return (
      <div
        title="Tag"
        onClick={(e) => {
          if (disablePropagation) {
            e.stopPropagation();
          }
          setActiveMenu && setActiveMenu("tag");
        }}
        className={`${isHover ? "hover" : ""} `}
        style={utils(
          `d-flex ${
            tagPosition === "center"
              ? "justify-content-center"
              : tagPosition === "right"
              ? "justify-content-end"
              : "justify-content-start"
          }`
        )}
      >
        <div
          style={{
            ...utils(
              `tag ${tagBgClass} ${tagTextClass} ${tagBorderRadius} ${tagBgOpacity} ${tagExtraClass}`
            ),
            ...tagBgStyle,
            ...tagTextStyle,
          }}
        >
          {reactHtmlParser(tagText)}
        </div>
      </div>
    );
  };

  // Render title component
  const renderTitle = () => {
    return (
      <div
        title="Title"
        onClick={(e) => {
          if (disablePropagation) {
            e.stopPropagation();
          }
          setActiveMenu && setActiveMenu("title");
        }}
        style={{
          ...utils(` ${titleOpacity} ${titleTextClass}`),
          ...titleTextStyle,
        }}
        className={`${isHover ? "hover" : ""}`}
      >
        <div style={{ ...utils("d-flex align-items-center") }}>
          {startEndorment && (
            <div style={{ ...utils("me-2") }}>
              {reactHtmlParser(startEndorment)}
            </div>
          )}
          {React.createElement(
            TitleTag,
            {
              style: {
                ...utils(`fw-bold ${titleExtraClass}`),
              },
            },
            reactHtmlParser(titleContent)
          )}
          {endEndorment && (
            <div style={{ ...utils("ms-2") }}>
              {reactHtmlParser(endEndorment)}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Render paragraph component
  const renderParagraph = () => {
    if (!paragraphContent) return null;

    return (
      <p
        title="Paragraph"
        onClick={(e) => {
          if (disablePropagation) {
            e.stopPropagation();
          }
          setActiveMenu && setActiveMenu("paragraph");
        }}
        style={{
          ...utils(
            `${paragraphOpacity} ${paragraphTextClass} ${paragraphExtraClass}`
          ),
          ...paragraphTextStyle,
        }}
        className={`${isHover ? "hover" : ""}`}
      >
        {reactHtmlParser(paragraphContent)}
      </p>
    );
  };

  const RenderConsentStatementModal = () => {
    const onClickFn = async () => {
      setShowConsentModal(false);

      if (showConsentDetails?.btn_url && showConsentDetails?.btn_url.trim()) {
        if (showConsentDetails?.action === "internal_redirect") {
          const urls = showConsentDetails.btn_url.includes(",")
            ? showConsentDetails.btn_url.split(",")
            : [showConsentDetails.btn_url];
          urls.forEach((url) => {
            const cleanUrl = url.trim();
            if (cleanUrl) {
              window.location.href = cleanUrl;
            }
          });
        } else {
          openNewTab(showConsentDetails.btn_url);
        }
      }
    };

    const onCancel = () => {
      setShowConsentModal(false);
    };

    const handleBackdropClick = (e) => {
      if (e.target === e.currentTarget) {
        setShowConsentModal(false);
      }
    };

    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
        }}
        onClick={handleBackdropClick}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "24px",
            borderRadius: "16px",
            margin: "20px",
            maxWidth: "500px",
            width: "90%",
            position: "relative",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close (X) Button */}
          <button
            onClick={onCancel}
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              background: "transparent",
              border: "none",
              fontSize: "20px",
              fontWeight: "bold",
              cursor: "pointer",
              lineHeight: "1",
            }}
            aria-label="Close"
          >
            ×
          </button>

          <div style={{ textAlign: "center" }}>
            <p
              style={{
                fontSize: "1.1rem",
                color: "#000",
                fontWeight: "normal",
                marginBottom: "20px",
                lineHeight: "1.5",
              }}
            >
              {showConsentDetails.consent_statement}
            </p>
            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "center",
              }}
            >
              <button
                className="btn btn-secondary"
                style={{ padding: "8px 16px" }}
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                style={{ padding: "8px 16px" }}
                onClick={onClickFn}
              >
                I agree
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // FIXED: Button rendering with proper size classes and action handling
  const renderButtons = (atBottom = false) => {
    if (!button.length) return null;

    return (
      <div
        onClick={(e) => {
          if (disablePropagation) {
            e.stopPropagation();
          }
          setActiveMenu && setActiveMenu("button");
        }}
        style={{
          ...utils(
            `d-flex gap-2 ${atBottom ? "" : "flex-grow-1"} flex-wrap ${
              button.length == 1
                ? button[0].position === "center"
                  ? "justify-content-center"
                  : button[0].position === "right"
                  ? "justify-content-end"
                  : ""
                : ""
            }`
          ),
        }}
      >
        {button.map((btn, index) => {
          // FIXED: Proper button size handling
          const getSizeClass = (size) => {
            switch (size) {
              case "sm":
                return "btn-sm";
              case "lg":
                return "btn-lg";
              case "w-100":
                return "w-100";
              case "md":
              default:
                return "";
            }
          };

          const sizeClass = getSizeClass(btn.size);
          const btnVariationClass = btn.variation?.startsWith("btn-")
            ? btn.variation
            : "btn-primary"; // Default fallback
          const buttonStyle = btn.variation?.startsWith("#")
            ? {
                backgroundColor: btn.variation,
                color: btn.btnTextColor || "#fff",
                border: "none",
              }
            : {};

          const buttonClass = `btn ${btnVariationClass} ${sizeClass} ${
            btn.extraClass || ""
          }`.trim();

          // FIXED: Proper action handling
          const handleButtonClick = (e) => {
            e.preventDefault();
            e.stopPropagation();

            // Check for consent statement first
            if (
              btn?.consent_statement &&
              typeof btn?.consent_statement === "string" &&
              btn?.consent_statement?.trim().length > 0
            ) {
              setShowConsentModal(true);
              setShowConsentDetails({
                consent_statement: btn?.consent_statement,
                cta_type: ctaType,
                cta_type_id: ctaId,
                btn_url: btn?.url,
                action: btn?.action,
              });
              return;
            }

            // Check for form
            if (Array.isArray(formJson) && formJson?.length > 0) {
              setShowFormModal(true);
              return;
            }

            // Handle URL actions
            if (btn?.url && btn?.url.trim()) {
              if (btn?.action === "internal_redirect") {
                // For internal redirect - could be multiple URLs
                const urls = btn.url.includes(",")
                  ? btn.url.split(",")
                  : [btn.url];
                urls.forEach((url) => {
                  const cleanUrl = url.trim();
                  if (cleanUrl) {
                    // For internal redirect, you might want to use window.location.href
                    // or React Router navigation instead of openNewTab
                    window.location.href = cleanUrl;
                  }
                });
              } else {
                // External redirect or default - opens in new tab
                openNewTab(btn.url.trim());
              }
            }
          };

          return (
            <div
              title="Button"
              key={index}
              style={{
                ...utils(
                  `d-flex align-items-center ${
                    btn.size === "w-100" ? "w-100" : ""
                  }`
                ),
              }}
              className={`${isHover ? "hover pe-4" : ""}`}
            >
              <button
                type="button"
                className={buttonClass}
                style={buttonStyle}
                onClick={handleButtonClick}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  {btn.startEndorment && btn.startEndorment.trim() && (
                    <span style={{ marginRight: "8px" }}>
                      {reactHtmlParser(btn.startEndorment)}
                    </span>
                  )}
                  {btn.content && reactHtmlParser(btn.content)}
                  {btn.endEndorment && btn.endEndorment.trim() && (
                    <span style={{ marginLeft: "8px" }}>
                      {reactHtmlParser(btn.endEndorment)}
                    </span>
                  )}
                </div>
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  // Image positioning logic (unchanged, assuming it works correctly)
  const renderImageBasedOnPosition = () => {
    const image = imageObject[0];
    if (!image) return null;

    const { url, position, size, alt = "Card Image", extraClass } = image;

    const positionLayouts = {
      top: { flexDirection: "flex-column" },
      top_center: { flexDirection: "flex-column align-items-center" },
      bottom: { flexDirection: "flex-column-reverse" },
      left: { flexDirection: "flex-row" },
      right: { flexDirection: "flex-row-reverse" },
      "top-left": { special: "topLeftRight" },
      "top-right": { special: "topLeftRight" },
      "bottom-left": { special: "bottomLeftRight" },
      "bottom-right": { special: "bottomLeftRight" },
    };

    const layout = positionLayouts[position];
    if (!layout) {
      return renderDefaultLayout();
    }

    if (layout.special === "topLeftRight") {
      return renderTopLeftRightLayout(
        position === "top-left",
        url,
        size,
        alt,
        extraClass
      );
    }

    if (layout.special === "bottomLeftRight") {
      return renderBottomLeftRightLayout(
        position === "bottom-left",
        url,
        size,
        alt,
        extraClass
      );
    }

    return renderStandardLayout(
      layout.flexDirection,
      url,
      size,
      alt,
      extraClass,
      position
    );
  };

  const renderStandardLayout = (
    flexDirection,
    url,
    size,
    alt,
    extraClass,
    position
  ) => (
    <div style={{ ...utils(`d-flex ${flexDirection} align-items-center`) }}>
      <div
        style={{
          ...utils(
            `d-flex flex-shrink-0 align-items-center justify-content-center`
          ),
        }}
      >
        <img
          onClick={(e) => {
            if (disablePropagation) {
              e.stopPropagation();
            }
            setActiveMenu && setActiveMenu("imageObject");
          }}
          src={url}
          alt={alt}
          style={{
            ...utils(`object-fit-cover ${extraClass}`),
            height: size || "75px",
            width: "auto",
          }}
          title="Image"
          className={`${isHover ? "hover" : ""}`}
        />
      </div>
      <div style={{ ...utils(`flex-grow-1 align-items-center d-flex`) }}>
        {renderTag()}
        <div style={{ ...utils("px-3 py-2") }}>
          {renderTitle()}
          {renderParagraph()}
          {renderButtons()}
        </div>
      </div>
    </div>
  );

  const renderTopLeftRightLayout = (isTopLeft, url, size, alt, extraClass) => (
    <div style={{ ...utils("position-relative") }}>
      {renderTag()}
      <div style={{ ...utils("p-3") }}>
        <div
          style={{
            ...utils(
              `d-flex justify-content-between align-items-center gap-3 ${
                isTopLeft ? "" : "flex-row-reverse"
              }`
            ),
          }}
        >
          <img
            onClick={(e) => {
              if (disablePropagation) {
                e.stopPropagation();
              }
              setActiveMenu && setActiveMenu("imageObject");
            }}
            src={url}
            alt={alt}
            style={{
              ...utils(`d-flex flex-shrink-0 ${extraClass}`),
              height: size || "36px",
              width: "auto",
              maxWidth: "100%",
            }}
            title="Image"
            className={`${isHover ? "hover" : ""}`}
          />
          {renderTitle()}
        </div>
        {renderParagraph()}
        {renderButtons()}
      </div>
    </div>
  );

  const renderBottomLeftRightLayout = (
    isBottomLeft,
    url,
    size,
    alt,
    extraClass
  ) => (
    <div style={{ ...utils("position-relative") }}>
      {renderTag()}
      <div style={{ ...utils("p-3 pt-0 pb-0") }}>
        {renderTitle()}
        {renderParagraph()}
      </div>
      <div
        style={{
          ...utils(
            `d-flex p-3 pt-2 justify-content-between align-items-center gap-3 ${
              isBottomLeft ? "" : "flex-row-reverse"
            }`
          ),
        }}
      >
        <div
          style={{
            ...utils(
              `d-flex ${
                isBottomLeft ? "justify-content-start" : "justify-content-end"
              }`
            ),
          }}
        >
          <img
            onClick={(e) => {
              if (disablePropagation) {
                e.stopPropagation();
              }
              setActiveMenu && setActiveMenu("imageObject");
            }}
            src={url}
            alt={alt}
            style={{
              ...utils(`d-flex flex-shrink-0 ${extraClass}`),
              height: size || "36px",
              width: "auto",
              maxWidth: "100%",
            }}
            title="Image"
            className={`${isHover ? "hover" : ""}`}
          />
        </div>
        {renderButtons(true)}
      </div>
    </div>
  );

  const renderDefaultLayout = () => (
    <div style={{ ...utils("position-relative") }}>
      <div
        style={{
          ...utils(`${
            cardbgImage ? "position-relative" : ""
          } ${cardbgopacity} ${border} 
          ${borderColor} ${borderOpacity} ${borderWidth} ${cardExtraClass} ${cardTextClass} 
           ${borderRadius}`),
          backgroundImage: cardbgImage,
          backgroundColor: cardBgStyle,
          ...cardTextStyle,
        }}
      >
        {renderTag()}
        <div style={{ ...utils("p-3 pt-0 pb-1") }}>
          {renderTitle()}
          {renderParagraph()}
        </div>
        {renderButtons()}
      </div>
    </div>
  );

  return (
    <>
      <div
        title="Card"
        onClick={(e) => {
          if (disablePropagation) {
            e.stopPropagation();
          }
          setActiveMenu && setActiveMenu("cardStyle");
        }}
        className={`overflow-hidden mb-4 dynamic_Cta_Main ${
          cardbgImage ? "position-relative" : ""
        } 
        ${border} ${borderColor} ${borderOpacity} ${borderWidth} 
        ${cardExtraClass} ${cardTextClass} ${borderRadius} ${cardBgClass} ${cardbgopacity} ${
          isHover ? "hover" : ""
        }`}
        style={{
          ...cardBgStyle,
          ...cardTextStyle,
        }}
      >
        {cardbgImage && (
          <div className="position-absolute top-0 start-0 w-100 h-100">
            <img
              src={cardbgImage}
              alt=""
              className="w-100 h-100 object-fit-cover"
            />
            {cardBgClass && (
              <div
                className={`position-absolute z-1 top-0 start-0 w-100 h-100 ${cardBgClass}`}
                style={{
                  "--bs-bg-opacity": cardbgopacity
                    ? cardbgopacity.replace("bg-opacity-", "") / 100
                    : 0.85,
                }}
              ></div>
            )}
          </div>
        )}

        {renderImageBasedOnPosition()}
      </div>

      {/* FIXED: Modal rendering outside main container */}
      {showConsentModal && <RenderConsentStatementModal />}
      {showFormModal && (
        <FormQuestionModal
          show={showFormModal}
          onHide={onHide}
          formJson={formJson}
          postForm={postForm}
        />
      )}
    </>
  );
};
