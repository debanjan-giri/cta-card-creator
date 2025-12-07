import { useRef, useEffect, useState } from "react";
import InputBox from "../components/InputBox";
import DropdownBox from "../components/DropdownBox";

import { Selector } from "../components/Selector";

import {
  ArrowUpRight,
  ArrowUpLeft,
  ArrowDownLeft,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  AlignCenter,
  ArrowDown,
} from "lucide-react";
const ImageEditor = ({ onChange, changedData, modalComponent }) => {
  const [state, setState] = useState({
    url: changedData?.imageObject?.[0]?.url || "",
    size: changedData?.imageObject?.[0]?.size.replace("px", "") || "",
    position: changedData?.imageObject?.[0]?.position || "",
    alt: changedData?.imageObject?.[0]?.alt || "",
    extraClass: changedData?.imageObject?.[0]?.extraClass || "",
  });

  // Update local state when changedData prop changes (for template selection)
  useEffect(() => {
    setState({
      url: changedData?.imageObject?.[0]?.url || "",
      size: changedData?.imageObject?.[0]?.size.replace("px", "") || "",
      position: changedData?.imageObject?.[0]?.position || "",
      alt: changedData?.imageObject?.[0]?.alt || "",
      extraClass: changedData?.imageObject?.[0]?.extraClass || "",
    });
  }, [changedData]);

  const handleStateChange = (key, value) => {
    const newState = { ...state, [key]: value };
    setState(newState);

    if (onChange) {
      const updatedImageData = [
        {
          url: newState.url,
          size: `${newState.size}px`, // Always add px to the current size
          position: newState.position,
          alt: newState.alt,
          extraClass: newState.extraClass,
        },
      ];

      onChange(updatedImageData);
    }
  };

  const isDisabled = !state.url?.trim();
  console.log("ImageEditor", isDisabled);

  return (
    <div className="p-3 bg-white rounded shadow-sm ">
      <div className="mb-3">
        <InputBox
          label={"Url"}
          placeholder={"Image Url"}
          value={state.url}
          setValue={(val) => handleStateChange("url", val)}
        />
      </div>
      <div className="mb-3">
        <InputBox
          label={"Size in pixels"}
          placeholder={"Image Size in pixels"}
          value={state.size}
          isDisabled={isDisabled}
          setValue={(val) => handleStateChange("size", val)}
        />
      </div>
      <div className="mb-3">
        <Selector
          isDisabled={isDisabled}
          label="Select Position"
          data={[
            { key: "right", label: "Right", icon: ArrowRight },
            { key: "left", label: "Left", icon: ArrowLeft },
            { key: "top", label: "Top", icon: ArrowUp },
            { key: "bottom", label: "Bottom", icon: ArrowDown },
            { key: "top-right", label: "Top Right", icon: ArrowUpRight },
            { key: "top-left", label: "Top Left", icon: ArrowUpLeft },
            { key: "bottom-left", label: "Bottom Left", icon: ArrowDownLeft },
            {
              key: "bottom-right",
              label: "Bottom Right",
              icon: ArrowDownRight,
            },
            { key: "top-center", label: "Top Center", icon: AlignCenter },
          ]}
          value={state.position}
          onSelect={(position) => handleStateChange("position", position)}
        />
      </div>

      <div className="mb-3">
        <InputBox
          isDisabled={isDisabled}
          label={"Alt Text"}
          value={state.alt}
          setValue={(val) => handleStateChange("alt", val)}
          placeholder={"Enter Alt Text"}
        />
      </div>

      <div className="mb-3">
        <InputBox
          isDisabled={isDisabled}
          label={"Extra Class"}
          placeholder={"Enter Bootstrap Class"}
          value={state.extraClass}
          isTextarea={true}
          setValue={(val) => handleStateChange("extraClass", val)}
        />
      </div>
      <div
        style={{
          opacity: isDisabled ? 0.5 : 1,
          pointerEvents: isDisabled ? "none" : "auto",
        }}
      >
        {modalComponent}
      </div>
    </div>
  );
};

export default ImageEditor;
