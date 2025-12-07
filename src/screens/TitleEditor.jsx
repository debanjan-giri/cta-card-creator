import { useEffect, useRef, useState } from "react";
import InputBox from "../components/InputBox";
import DropdownBox from "../components/DropdownBox";
import ColorPickerBox from "../components/ColorPickerBox";
import { TitleOptions } from "../constants/CtaOptions";
import { Selector } from "../components/Selector";
import { MdOpacity } from "react-icons/md";

const TitleEditor = ({ onChange, changedData, modalComponent }) => {
  const [state, setState] = useState({
    content: changedData?.title?.content || "",
    variation: changedData?.title?.variation || "",
    opacity: changedData?.title?.opacity?.replace("text-opacity-", "") || "",
    startEndorment: changedData?.title?.startEndorment || "",
    endEndorment: changedData?.title?.endEndorment || "",
    extraClass: changedData?.title?.extraClass || "",
    color: changedData?.title?.color || "",
  });

  useEffect(() => {
    setState({
      content: changedData?.title?.content || "",
      variation: changedData?.title?.variation || "",
      opacity: changedData?.title?.opacity?.replace("text-opacity-", "") || "",
      startEndorment: changedData?.title?.startEndorment || "",
      endEndorment: changedData?.title?.endEndorment || "",
      extraClass: changedData?.title?.extraClass || "",
      color: changedData?.title?.color || "",
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

      const updatedTitleData = {
        content: newState.content,
        variation: newState.variation,
        opacity: formattedOpacity,
        color: newState.color,
        startEndorment: newState.startEndorment,
        endEndorment: newState.endEndorment,
        extraClass: newState.extraClass,
      };

      onChange(updatedTitleData);
    }
  };

  const isDisabled = !state.content?.trim();

  return (
    <div className="p-3 bg-white rounded shadow-sm ">
      <div className="mb-3">
        <InputBox
          isTextarea={true}
          label="Title"
          value={state.content}
          setValue={(val) => handleStateChange("content", val)}
          placeholder="Set Title"
        />
      </div>

      <div className="mb-3">
        <DropdownBox
          label="Heading Variation"
          value={state.variation}
          setValue={(val) => handleStateChange("variation", val)}
          data={TitleOptions?.variation}
          disabled={isDisabled}
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
        <ColorPickerBox
          label="Color"
          data={{
            primary: "#0000FF",
            secondary: "#FF0000",
            dark: "#000000",
            light: "#FFFFFF",
          }}
          disabled={isDisabled}
          value={state.color}
          setValue={(val) => handleStateChange("color", val)}
        />
      </div>

      <div className="mb-3">
        <InputBox
          label="Start Endorment"
          placeholder="Submit Svg"
          value={state.startEndorment}
          disabled={isDisabled}
          setValue={(val) => handleStateChange("startEndorment", val)}
        />
      </div>

      <div className="mb-3">
        <InputBox
          label="End Endorment"
          placeholder="Submit Svg"
          value={state.endEndorment}
          disabled={isDisabled}
          setValue={(val) => handleStateChange("endEndorment", val)}
        />
      </div>

      <div className="mb-3">
        <InputBox
          label="Custom Css"
          isTextarea={true}
          placeholder="Bootstrap Class"
          value={state.extraClass}
          disabled={isDisabled}
          setValue={(val) => handleStateChange("extraClass", val)}
        />
      </div>

      {/* Modal container */}
      <div
        className="transition-opacity"
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
export default TitleEditor;
