import { useEffect, useRef, useState } from "react";
import InputBox from "../components/InputBox";
import { Selector } from "../components/Selector";
import ColorPickerBox from "../components/ColorPickerBox";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MdOpacity, MdOutlineCircle } from "react-icons/md";
import { TbBorderCorners, TbBorderTop } from "react-icons/tb";
import { RxBorderBottom, RxBorderLeft, RxBorderRight } from "react-icons/rx";
import {
  CgBorderBottom,
  CgBorderLeft,
  CgBorderRight,
  CgBorderTop,
} from "react-icons/cg";

const TagEditor = ({ onChange, changedData, modalComponent }) => {
  const [state, setState] = useState({
    position: changedData?.tag?.position || "",
    text: changedData?.tag?.text || "",
    bgColor: changedData?.tag?.bgColor || "",
    textColor: changedData?.tag?.textColor || "",
    borderRadius: changedData?.tag?.borderRadius || "",
    bgOpacity: changedData?.tag?.bgOpacity?.replace("bg-opacity-", "") || "",
    extraClass: changedData?.tag?.extraClass || "",
  });

  useEffect(() => {
    setState({
      position: changedData?.tag?.position || "",
      text: changedData?.tag?.text || "",
      bgColor: changedData?.tag?.bgColor || "",
      textColor: changedData?.tag?.textColor || "",
      borderRadius: changedData?.tag?.borderRadius || "",
      bgOpacity: changedData?.tag?.bgOpacity?.replace("bg-opacity-", "") || "",
      extraClass: changedData?.tag?.extraClass || "",
    });
  }, [changedData]);

  const handleStateChange = (key, value) => {
    const newState = { ...state, [key]: value };
    setState(newState);

    if (onChange) {
      const formattedBgOpacity =
        key === "bgOpacity" ? `bg-opacity-${value}` : "";

      const updatedTitleData = {
        text: newState.text,
        position: newState.position,
        bgColor: newState.bgColor,
        textColor: newState.textColor,
        borderRadius: newState.borderRadius,
        bgOpacity: formattedBgOpacity,
        extraClass: newState.extraClass,
      };
      onChange(updatedTitleData);
    }
  };

  const isDisabled = !state.text?.trim();

  return (
    <div className="p-3 bg-white rounded shadow-sm ">
      <div className="mb-3">
        <InputBox
          label={"text"}
          isTextarea={true}
          placeholder={"text"}
          value={state.text}
          setValue={(val) => handleStateChange("text", val)}
        />
      </div>
      <div className="mb-3">
        {/* required only left right */}
        <Selector
          label={"tag position"}
          disabled={isDisabled}
          data={[
            { key: "left", label: "Left", icon: ArrowLeft },
            { key: "right", label: "Right", icon: ArrowRight },
          ]}
          value={state.position}
          onSelect={(position) => handleStateChange("position", position)}
        />
      </div>
      <div className="mb-3">
        <ColorPickerBox
          disabled={isDisabled}
          label={"Background Color"}
          data={{
            primary: "#0000FF",
            secondary: "#FF0000",
            dark: "#000000",
            light: "#FFFFFF",
          }}
          value={state.bgColor}
          setValue={(val) => handleStateChange("bgColor", val)}
        />
      </div>
      <div className="mb-3">
        <ColorPickerBox
          disabled={isDisabled}
          label={"text Color"}
          data={{
            primary: "#0000FF",
            secondary: "#FF0000",
            dark: "#000000",
            light: "#FFFFFF",
          }}
          value={state.textColor}
          setValue={(val) => handleStateChange("textColor", val)}
        />
      </div>

      <div className="mb-3">
        <Selector
          label={"Border Redius"}
          data={[
            { key: "rounded", label: "All", icon: TbBorderCorners },
            { key: "rounded-start", label: "Start", icon: CgBorderLeft },
            { key: "rounded-end", label: "End", icon: CgBorderRight },
            { key: "rounded-top", label: "Top", icon: CgBorderTop },
            { key: "rounded-bottom", label: "Bottom", icon: CgBorderBottom },
            { key: "rounded-circle", label: "circle", icon: MdOutlineCircle },
            { key: "rounded-pill", label: "pill", icon: MdOpacity },
          ]}
          value={state.borderRadius}
          onSelect={(position) => handleStateChange("borderRadius", position)}
        />
      </div>

      <div className="mb-3">
        <Selector
          label={"Background Opacity"}
          data={[
            { key: "25", label: "25%", icon: MdOpacity },
            { key: "50", label: "50%", icon: MdOpacity },
            { key: "75", label: "75%", icon: MdOpacity },
            { key: "100", label: "100%", icon: MdOpacity },
          ]}
          value={state.bgOpacity}
          onSelect={(val) => handleStateChange("bgOpacity", val)}
        />
      </div>
      <div className="mb-3">
        <InputBox
          disabled={isDisabled}
          label={"Extra Class"}
          placeholder={"Bootstrap Class"}
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

export default TagEditor;
