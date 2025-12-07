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

import React, { memo, useState } from "react";
import { toast } from "react-toastify";
import FormQuestionModal from "./FormQuestionModal";
import parse from "html-react-parser";
import "../css/global.css";
import { Fade } from "react-bootstrap";
import { utils } from "../utils/cssExtractor";

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
  console.log("titletitle", title);

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

  console.log("cardBgIsHexColor", cardBgClass);

  const postForm = async (userInput) => {
    console.log("user has clicked submit button");
    if (
      formJson.some((_q) => _q.is_mandatory == 1 && !userInput[_q.field_name])
    ) {
      toast.error("Please fill all mandatory fields");
      return;
    }
    return;
    // let response = await axiosInstance.post("cta/cta_submitted_forms", {
    //   cta_id: ctaId,
    //   cta_type: ctaType,
    //   submitted_form_json: userInput,
    // });
    // console.log("response:", response);
    // if (response.status == 200) {
    //   toast.success("Your Response submitted successfully");
    //   onHide();
    // }
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
          setActiveMenu("tag");
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
          setActiveMenu("title");
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
          setActiveMenu("paragraph");
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

  // render constant statement
  const RenderConstantStatementModal = () => {
    const onClickFn = async () => {
      setShowConsentModal(false);
      if (showConsentDetails?.btn_url) {
        openNewTab(showConsentDetails?.btn_url);
      }
    };

    return (
      <div
        style={{
          ...utils(
            "w-100 h-100 bg-dark bg-opacity-75 rounded d-flex flex-column align-items-center justify-content-center position-absolute top-0 start-0 z-1"
          ),
        }}
      >
        <div style={{ ...utils("bg-white p-4 rounded-4") }}>
          <Fade>
            <div
              style={{ ...utils("rounded") }}
              onClick={() => setShowConsentModal(false)}
            ></div>
          </Fade>
          <div style={{ ...utils("rounded text-center") }}>
            <Fade>
              <p style={{ ...utils("fs-5 text-black fw-normal") }}>
                {showConsentDetails.consent_statement}
              </p>
              <button
                style={{
                  ...utils(
                    "fs-4 bg-primary text-white fw-medium rounded text-center py-2 px-3 mt-3 ctaLink"
                  ),
                }}
                onClick={onClickFn}
              >
                I agree
              </button>
            </Fade>
          </div>
        </div>
      </div>
    );
  };

  // Render button component
  const renderButtons = (atBottom = false) => {
    if (!button.length) return null;

    return (
      <div
        onClick={(e) => {
          if (disablePropagation) {
            e.stopPropagation();
          }
          setActiveMenu("button");
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
        {console.log("btn.btnTextColor", button[0].variation)}
        {button.map((btn, index) => {
          const buttonWidthClass = btn.size?.startsWith("w-") ? btn.size : "";
          const btnVariationClass = btn.variation?.startsWith("btn-")
            ? btn.variation
            : "";
          const buttonStyle = btn.variation?.startsWith("#")
            ? {
                backgroundColor: btn.variation,
                color: btn.btnTextColor,
                border: "none",
              }
            : {};
          // const buttonClassWraper = (btn.buttonClassWraper?.startsWith('w-') || btn.buttonClassWraper?.startsWith('btn-')) ? btn.buttonClassWraper : '';

          const buttonClass = ` ${buttonWidthClass} ${btnVariationClass} ${btn.extraClass}`;
          const buttonWraper = `${buttonWidthClass}`;

          const buttonUrl =
            typeof btn?.action === "string" &&
            btn?.action === "internal_redirect"
              ? btn?.url.split(",")
              : btn?.url;

          return (
            <div
              title="Button"
              key={index}
              style={{
                ...utils(` d-flex align-items-center ${buttonWraper}`),
              }}
              className={`${isHover ? "hover pe-4" : ""}`}
            >
              <button
                type="button"
                style={{
                  ...utils(`btn ${buttonClass} flex-shrink-0`),
                  ...buttonStyle,
                }}
                // onClick={() => btn.url && window.open(btn.url, '_blank')}

                onClick={() => {
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
                    });
                  } else if (Array.isArray(formJson) && formJson?.length > 0) {
                    setShowFormModal(true);
                    return;
                  } else if (btn?.action === "internal_redirect") {
                    openNewTab(buttonUrl);
                  } else {
                    openNewTab(buttonUrl);
                  }
                }}
              >
                <div
                  style={{
                    ...utils(
                      "d-flex align-items-center justify-content-center text-nowrap"
                    ),
                  }}
                >
                  {btn.startEndorment && (
                    <div style={{ ...utils("me-2") }}>
                      {reactHtmlParser(btn.startEndorment)}
                    </div>
                  )}
                  {reactHtmlParser(btn.content)}
                  {btn.endEndorment && (
                    <div style={{ ...utils("ms-2") }}>
                      {reactHtmlParser(btn.endEndorment)}
                    </div>
                  )}
                </div>
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  // Image positioning logic
  const renderImageBasedOnPosition = () => {
    const image = imageObject[0];
    if (!image) return null;

    const { url, position, size, alt = "Card Image", extraClass } = image;

    // Handle different image positions
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

  // Standard layout for top/bottom/left/right positions
  const renderStandardLayout = (
    flexDirection,
    url,
    size,
    alt,
    extraClass,
    position
  ) => (
    <div style={{ ...utils(`d-flex ${flexDirection}`) }}>
      <div style={{ ...utils(`d-flex flex-shrink-0 `) }}>
        {/* ${position !== 'left' ? 'w-100' : ''}  */}
        <img
          onClick={(e) => {
            if (disablePropagation) {
              e.stopPropagation();
            }
            setActiveMenu("imageObject");
          }}
          src={url}
          alt={alt}
          // ${position !== 'left' ? 'w-100' : ''}
          style={{
            ...utils(`object-fit-cover ${extraClass}`),
            aspectRatio: position === "left" ? "4/3" : "16/9",
            width: size || "75px",
            minHeight: position === "left" ? "100%" : null,
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

  // Top left/right layout
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
              setActiveMenu("imageObject");
            }}
            src={url}
            alt={alt}
            style={{
              ...utils(`d-flex flex-shrink-0  w-auto mw-25 ${extraClass}`),
              height: size || "36px",
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

  // Bottom left/right layout
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
              setActiveMenu("imageObject");
            }}
            src={url}
            alt={alt}
            style={{
              ...utils(`d-flex flex-shrink-0 w-auto mw-25 ${extraClass}`),
              height: size || "36px",
            }}
            title="Image"
            className={`${isHover ? "hover" : ""}`}
          />
        </div>
        {renderButtons(true)}
      </div>
    </div>
  );

  // Default layout when no image position is specified
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
    <div
      title="Card"
      onClick={(e) => {
        if (disablePropagation) {
          e.stopPropagation();
        }
        setActiveMenu("cardStyle");
      }}
      style={{
        ...utils(`overflow-hidden position-relative ${
          cardbgImage ? "position-relative" : ""
        } 
    ${border} ${borderColor} ${borderOpacity} ${borderWidth} 
    ${cardExtraClass} ${cardTextClass} ${borderRadius} ${cardBgClass}`),
        ...cardBgStyle,
        ...cardTextStyle,
      }}
      className={`${isHover ? "hover" : ""}`}
    >
      {cardbgImage && (
        <div
          style={{ ...utils("position-absolute top-0 start-0 w-100 h-100") }}
        >
          <img src={cardbgImage} alt="" style={{ ...utils("w-100 h-100") }} />
          {cardBgClass && (
            <div
              style={{
                ...utils(
                  `position-absolute z-1 top-0 start-0 w-100 h-100 ${cardBgClass}`
                ),
                "--bs-bg-opacity": cardbgopacity || 0.85,
              }}
            ></div>
          )}
        </div>
      )}
      {renderImageBasedOnPosition()}
      {Array.isArray(formJson) && formJson?.length > 0 && (
        <FormQuestionModal
          show={showFormModal}
          onHide={onHide}
          submitClick={postForm}
          form={formJson}
        />
      )}
      {showConsentModal && <RenderConstantStatementModal />}
    </div>
  );
};
