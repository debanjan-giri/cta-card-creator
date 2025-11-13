import React, { useState, useEffect } from "react";
import { RiResetLeftFill } from "react-icons/ri";

const InputBox = ({
  label,
  value,
  setValue,
  placeholder,
  disabled = false,
  isTextarea = false,
  rows = 3,
}) => {
  const [tempContent, setTempContent] = useState("");
  const [height, setHeight] = useState("40");
  const [width, setWidth] = useState("40");

  // Check if it's a valid URL
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  // Check if input is an SVG (URL or inline)
  const isSvg = (string) => {
    if (!string) return false;
    const trimmed = string.trim().toLowerCase();
    return (
      trimmed.endsWith(".svg") ||
      trimmed.startsWith("<svg")
    );
  };

  const shouldShowSizeInputs = () =>
    isValidUrl(tempContent) &&
    !tempContent.trim().toLowerCase().startsWith("<svg");

  const isEndormentField =
    label === "Start Endorment" || label === "End Endorment";

  useEffect(() => {
    if (isEndormentField) {
      let contentToSet = tempContent;
      if (isValidUrl(tempContent)) {
        // For URLs (png, jpg, gif, svg, etc.)
        contentToSet = `<img height=${height} width=${width} src="${tempContent}"/>`;
      }
      // For inline SVGs, leave as is
      setValue(contentToSet);
    }
  }, [tempContent, height, width, isEndormentField, setValue]);

  const handleReset = () => {
    setTempContent("");
    setHeight("40");
    setWidth("40");
    setValue("");
  };

  return (
    <div>
      <p className="mb-2 fw-semibold text-secondary small">{label}</p>
      <div className="d-flex align-items-start gap-2">
        {isTextarea ? (
          <textarea
            placeholder={placeholder}
            className="form-control"
            value={isEndormentField ? tempContent : value}
            disabled={disabled}
            rows={rows}
            style={{ resize: "none" }}
            onChange={(e) =>
              isEndormentField
                ? setTempContent(e.target.value)
                : setValue(e.target.value)
            }
          />
        ) : (
          <input
            type="text"
            placeholder={placeholder}
            className="form-control"
            value={isEndormentField ? tempContent : value}
            disabled={disabled}
            onChange={(e) =>
              isEndormentField
                ? setTempContent(e.target.value)
                : setValue(e.target.value)
            }
          />
        )}
        <RiResetLeftFill
          onClick={handleReset}
          className="text-danger mt-1"
          size={22}
          style={{ cursor: "pointer" }}
        />
      </div>

      {isEndormentField && shouldShowSizeInputs() && (
        <div className="mt-2 d-flex gap-2">
          <div className="flex-fill">
            <label className="form-label small fw-semibold">Height (px)</label>
            <input
              type="number"
              className="form-control"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className="flex-fill">
            <label className="form-label small fw-semibold">Width (px)</label>
            <input
              type="number"
              className="form-control"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default InputBox;
