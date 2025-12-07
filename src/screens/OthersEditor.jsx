import { useState } from "react";
import InputBox from "../components/InputBox";
import DropdownBox from "../components/DropdownBox";

const OthersEditor = () => {
  const [state, setState] = useState({
    consent_statement: "",
    type: "",
    type_id: "",
    position: "",
  });

  const handleStateChange = (key, value) => {
    const newState = { ...state, [key]: value };
    setState(newState);
  };
  const isDisabled = !state.type?.trim() || !state.type_id?.trim();
  return (
    <div className="p-3 bg-white rounded shadow-sm ">
      <div className="mb-3">
        <InputBox
          label={"Type"}
          placeholder={"Enter Type"}
          value={state.type}
          setValue={(val) => handleStateChange("type", val)}
        />
      </div>
      <div className="mb-3">
        <InputBox
          label={"Type ID"}
          placeholder={"Enter Type ID"}
          value={state.type_id}
          setValue={(val) => handleStateChange("type_id", val)}
        />
      </div>
      <div className="mb-3">
        <InputBox
          isDisabled={isDisabled}
          label={"consent statement"}
          placeholder={"Enter consent statement"}
          value={state.consent_statement}
          setValue={(val) => handleStateChange("consent_statement", val)}
        />
      </div>
      <div className="mb-3">
        <DropdownBox
          label={"Position"}
          value={state.position}
          setValue={(position) => handleStateChange("position", position)}
          data={[
            "after_content",
            "before_content",
            "before_related",
            "after_related",
            "left_panel_before",
            "left_panel_after",
            "top",
          ]}
        />
      </div>
    </div>
  );
};

export default OthersEditor;
