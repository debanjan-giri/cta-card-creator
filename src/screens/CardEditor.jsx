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
      const borderOpacity =
        key === "borderOpacity"
          ? `border-opacity-${value}`
          : newState.borderOpacity
          ? `border-opacity-${newState.borderOpacity}`
          : "";
      const cardbgopacity =
        key === "cardbgopacity"
          ? `bg-opacity-${value}`
          : newState.cardbgopacity
          ? `bg-opacity-${newState.cardbgopacity}`
          : "";

      const updatedTitleData = {
        cardbgImage: newState.cardbgImage,
        cardbgcolor: newState.cardbgcolor,
        color: newState.color,
        cardbgopacity: cardbgopacity,
        border: newState.border,
        borderColor: newState.borderColor,
        borderOpacity: borderOpacity,
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
            primary: "#0000FF",
            secondary: "#FF0000",
            dark: "#000000",
            light: "#FFFFFF",
          }}
          value={state.cardbgcolor}
          setValue={(val) => handleStateChange("cardbgcolor", val)}
        />
      </div>

      <div className="mb-3">
        <ColorPickerBox
          label={"Text Color"}
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

      {/* <div className="mb-3">
        <Selector
          data={[
            { key: "25", label: "25%", icon: MdOpacity },
            { key: "50", label: "50%", icon: MdOpacity },
            { key: "75", label: "75%", icon: MdOpacity },
            { key: "100", label: "100%", icon: MdOpacity },
          ]}
          label={"Card Opacity"}
          value={state.cardbgopacity}
          setValue={(val) => handleStateChange("cardbgopacity", val)}
        />
      </div> */}
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
            "border-white": "#FFFFFF",
            "border-dark": "#000000",
            "border-light": "#FFFFFF",
            "border-info": "#0000FF",
            "border-warning": "#FF0000",
            "border-danger": "#FF0000",
            "border-success": "#00FF00",
            "border-secondary": "#FF0000",
            "border-primary": "#0000FF",
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
      {/* <div className="mb-3">
        <Selector
          label={"Border Opacity"}
          data={[
            { key: "25", label: "25%", icon: MdOpacity },
            { key: "50", label: "50%", icon: MdOpacity },
            { key: "75", label: "75%", icon: MdOpacity },
            { key: "100", label: "100%", icon: MdOpacity },
          ]}
          value={state.borderOpacity}
          setValue={(val) => handleStateChange("borderOpacity", val)}
        />
      </div> */}

      {/* slider bar or increment bar */}
      <div className="mb-3">
        <DropdownBox
          label={"border width"}
          value={state.borderWidth}
          setValue={(val) => handleStateChange("borderWidth", val)}
          data={["border-0", "border-1", "border-2", "border-3"]}
        />
      </div>
      <div className="mb-3">
        <InputBox
          label={"Extra Class"}
          isTextarea={true}
          placeholder={"Bootstrap Class"}
          value={state.extraClass}
          setValue={(val) => handleStateChange("extraClass", val)}
        />
      </div>
      <div>{modalComponent}</div>
    </div>
  );
};

export default CardEditor;
