import { useEffect, useRef, useState } from "react";
import InputBox from "../components/InputBox";
import DropdownBox from "../components/DropdownBox";
import ColorPickerBox from "../components/ColorPickerBox";
import { Selector } from "../components/Selector";
import {
  CgBorderBottom,
  CgBorderLeft,
  CgBorderRight,
  CgBorderTop,
} from "react-icons/cg";
import { TbBorderCorners } from "react-icons/tb";
import { MdOpacity } from "react-icons/md";

const CardEditor = ({ onChange, changedData, modalComponent }) => {
  const [state, setState] = useState({
    cardbgImage: changedData?.cardStyle?.cardbgImage || "",
    cardbgcolor: changedData?.cardStyle?.cardbgcolor || "",
    color: changedData?.cardStyle?.color || "",
    cardbgopacity:
      changedData?.cardStyle?.cardbgopacity?.replace("bg-opacity-", "") || "",
    border: changedData?.cardStyle?.border || "",
    borderColor: changedData?.cardStyle?.borderColor || "",
    borderRadius: changedData?.cardStyle?.borderRadius || "",
    borderOpacity:
      changedData?.cardStyle?.borderOpacity?.replace("border-opacity-", "") ||
      "",
    borderWidth: changedData?.cardStyle?.borderWidth || "",
    extraClass: changedData?.cardStyle?.extraClass || "",
  });

  // update when template changes
  useEffect(() => {
    setState({
      cardbgImage: changedData?.cardStyle?.cardbgImage || "",
      cardbgcolor: changedData?.cardStyle?.cardbgcolor || "",
      color: changedData?.cardStyle?.color || "",
      cardbgopacity:
        changedData?.cardStyle?.cardbgopacity?.replace("bg-opacity-", "") || "",
      border: changedData?.cardStyle?.border || "",
      borderColor: changedData?.cardStyle?.borderColor || "",
      borderRadius: changedData?.cardStyle?.borderRadius || "",
      borderOpacity:
        changedData?.cardStyle?.borderOpacity?.replace("border-opacity-", "") ||
        "",
      borderWidth: changedData?.cardStyle?.borderWidth || "",
      extraClass: changedData?.cardStyle?.extraClass || "",
    });
  }, [changedData]);

  const handleStateChange = (key, value) => {
    const newState = { ...state, [key]: value };
    setState(newState);

    if (onChange) {
      const formattedOpacityborder =
        key === "borderOpacity"
          ? `border-opacity-${value}`
          : newState.borderOpacity
          ? `border-opacity-${newState.borderOpacity}`
          : "";
      const formattedOpacitycardbg =
        key === "cardbgopacity"
          ? `bg-opacity-${value}`
          : newState.cardbgopacity
          ? `bg-opacity-${newState.cardbgopacity}`
          : "";

      const updatedTitleData = {
        cardbgImage: newState.cardbgImage,
        cardbgcolor: newState.cardbgcolor,
        color: newState.color,
        cardbgopacity: formattedOpacitycardbg,
        border: newState.border,
        borderColor: newState.borderColor,
        borderOpacity: formattedOpacityborder,
        borderWidth: newState.borderWidth,
        extraClass: newState.extraClass,
        borderRadius: newState.borderRadius,
      };

      onChange(updatedTitleData);
    }
  };

  return (
    <div className="p-3 bg-white rounded shadow-sm ">
      <div className="mb-3">
        <InputBox
          label={"Background Image"}
          placeholder={"Image Url"}
          value={state.cardbgImage}
          setValue={(val) => handleStateChange("cardbgImage", val)}
        />
      </div>
      <div className="mb-3">
        <ColorPickerBox
          label={"Background Color"}
          data={{
            primary: { label: "Primary", color: "#0d6efd" },
            secondary: { label: "Secondary", color: "#6c757d" },
            success: { label: "Success", color: "#198754" },
            danger: { label: "Danger", color: "#dc3545" },
            warning: { label: "Warning", color: "#ffc107" },
            info: { label: "Info", color: "#0dcaf0" },
            light: { label: "Light", color: "#f8f9fa" },
            dark: { label: "Dark", color: "#212529" },
          }}
          value={state.cardbgcolor}
          setValue={(val) => handleStateChange("cardbgcolor", val)}
        />
      </div>

      {/* <div className="mb-3">
        <ColorPickerBox
          label={"Text Color"}
          data={{
            primary: { label: "Primary", color: "#0d6efd" },
            secondary: { label: "Secondary", color: "#6c757d" },
            success: { label: "Success", color: "#198754" },
            danger: { label: "Danger", color: "#dc3545" },
            warning: { label: "Warning", color: "#ffc107" },
            info: { label: "Info", color: "#0dcaf0" },
            light: { label: "Light", color: "#f8f9fa" },
            dark: { label: "Dark", color: "#212529" },
          }}
          value={state.color}
          setValue={(val) => handleStateChange("color", val)}
        />
      </div> */}

      <div className="mb-3">
        <Selector
          data={[
            { key: "25", label: "25%", icon: MdOpacity },
            { key: "50", label: "50%", icon: MdOpacity },
            { key: "75", label: "75%", icon: MdOpacity },
            { key: "100", label: "100%", icon: MdOpacity },
          ]}
          label={"Card Background Opacity"}
          value={state.cardbgopacity}
          onSelect={(val) => handleStateChange("cardbgopacity", val)}
        />
      </div>
      <div className="mb-3">
        <Selector
          label={"Border"}
          data={[
            { key: "border-top", label: " Top", icon: CgBorderTop },
            { key: "border-end", label: "End", icon: CgBorderRight },
            { key: "border-bottom", label: "Bottom", icon: CgBorderBottom },
            { key: "border-start", label: "Start", icon: CgBorderLeft },
            { key: "border", label: "All", icon: TbBorderCorners },
          ]}
          value={state.border}
          onSelect={(position) => handleStateChange("border", position)}
        />
      </div>
      <div className="mb-3">
        <ColorPickerBox
          label={"Border Color"}
          data={{
            "border-primary": { label: "Primary", color: "#0d6efd" },
            "border-secondary": { label: "Secondary", color: "#6c757d" },
            "border-success": { label: "Success", color: "#198754" },
            "border-danger": { label: "Danger", color: "#dc3545" },
            "border-warning": { label: "Warning", color: "#ffc107" },
            "border-info": { label: "Info", color: "#0dcaf0" },
            "border-light": { label: "Light", color: "#f8f9fa" },
            "border-dark": { label: "Dark", color: "#212529" },
          }}
          value={state.borderColor}
          setValue={(val) => handleStateChange("borderColor", val)}
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
          ]}
          value={state.borderRadius}
          onSelect={(position) => handleStateChange("borderRadius", position)}
        />
      </div>
      <div className="mb-3">
        <Selector
          label={"Border Opacity"}
          data={[
            { key: "25", label: "25%", icon: MdOpacity },
            { key: "50", label: "50%", icon: MdOpacity },
            { key: "75", label: "75%", icon: MdOpacity },
            { key: "100", label: "100%", icon: MdOpacity },
          ]}
          value={state.borderOpacity}
          onSelect={(val) => handleStateChange("borderOpacity", val)}
        />
      </div>

      {/* slider bar or increment bar */}
      <div className="mb-3">
        <DropdownBox
          label="Border Width"
          value={state.borderWidth}
          setValue={(val) => handleStateChange("borderWidth", val)}
          data={[
            { label: "None", value: "border-0" },
            { label: "Thin (1px)", value: "border-1" },
            { label: "Medium (2px)", value: "border-2" },
            { label: "Thick (3px)", value: "border-3" },
            { label: "Thickest (4px)", value: "border-4" },
          ]}
        />
      </div>
      {/* <div className="mb-3">
        <InputBox
          label={"Extra Class"}
          isTextarea={true}
          placeholder={"Bootstrap Class"}
          value={state.extraClass}
          setValue={(val) => handleStateChange("extraClass", val)}
        />
      </div> */}
      <div>{modalComponent}</div>
    </div>
  );
};

export default CardEditor;
