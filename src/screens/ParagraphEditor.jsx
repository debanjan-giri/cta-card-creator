import { useEffect, useRef, useState } from "react";
import InputBox from "../components/InputBox";
import ColorPickerBox from "../components/ColorPickerBox";
import { Selector } from "../components/Selector";
import { MdOpacity } from "react-icons/md";

const ParagraphEditor = ({ onChange, changedData, modalComponent }) => {
  const [state, setState] = useState({
    content: changedData?.paragraph?.content || "",
    color: changedData?.paragraph?.color || "",
    opacity:
      changedData?.paragraph?.opacity?.replace("text-opacity-", "") || "",
    extraClass: changedData?.paragraph?.extraClass || "",
  });

  useEffect(() => {
    setState({
      content: changedData?.paragraph?.content || "",
      color: changedData?.paragraph?.color || "",
      opacity:
        changedData?.paragraph?.opacity?.replace("text-opacity-", "") || "",
      extraClass: changedData?.paragraph?.extraClass || "",
    });
  }, [changedData]);

  const handleStateChange = (key, value) => {
    const newState = { ...state, [key]: value };
    setState(newState);
    if (onChange) {
      const formattedOpacity =
        key === "opacity"
          ? `text-opacity-${value}`
          : newState.opacity
          ? `text-opacity-${newState.opacity}`
          : "";

      const updatedParagraphData = {
        content: newState.content,
        color: newState.color,
        opacity: formattedOpacity,
        extraClass: newState.extraClass,
      };
      onChange(updatedParagraphData);
    }
  };

  const isDisabled = !state.content?.trim();
  return (
    <div className="p-3 bg-white rounded shadow-sm ">
      <div className="mb-3">
        <InputBox
          label="Content"
          isTextarea={true}
          value={state.content}
          setValue={(val) => handleStateChange("content", val)}
          placeholder="Set Title"
        />
      </div>

      <div className="mb-3">
        <ColorPickerBox
          isDisabled={isDisabled}
          label={"Color"}
          data={{
            primary: "#0000FF",
            secondary: "#FF0000",
            dark: "#000000",
            light: "#FFFFFF",
          }}
          value={state.color}
          setValue={(val) => handleStateChange("color", val)}
        />
      </div>

      <div className="mb-3">
        <Selector
          label={"Text Opacity"}
          data={[
            { key: "25", label: "25%", icon: MdOpacity },
            { key: "50", label: "50%", icon: MdOpacity },
            { key: "75", label: "75%", icon: MdOpacity },
            { key: "100", label: "100%", icon: MdOpacity },
          ]}
          value={state.opacity}
          onSelect={(val) => handleStateChange("opacity", val)}
        />
      </div>

      <div className="mb-3">
        <InputBox
          isDisabled={isDisabled}
          label={"Extra Class"}
          isTextarea={true}
          placeholder={"Bootstrap Class"}
          value={state.extraClass}
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

export default ParagraphEditor;
