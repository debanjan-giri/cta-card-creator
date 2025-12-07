import React from "react";
import FormQuestionModal from "../CTA/FormQuestionModal";

const FromPage = () => {
  return (
    <div>
      {/* {Array.isArray(formJson) && formJson?.length > 0 && ( */}
      <FormQuestionModal
        show={true}
        onHide={() => setModalVisible(false)}
        submitClick={() => {}}
        form={[
          {
            label: "Data 2",
            field_name: "Name",
            type: "radio",
            is_mandatory: "0",
            options: "",
            extraClass: "",
          },
          {
            label: "Data 2",
            field_name: "",
            type: "radio",
            is_mandatory: "0",
            options: "",
            extraClass: "",
          },
        ]}
        disableModalBehavior={false}
        fullscreen={true}
      />
      {/* )} */}
    </div>
  );
};

export default FromPage;
