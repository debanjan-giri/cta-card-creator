/**
 * JSON Schema for Dynamic CTA Creator
 * This file defines the schema for creating dynamic Call-To-Action (CTA) cards
 */

const ctaSchema = {
  title: {
    content: "This is a heading",
    variation: ["H1", "H2", "H3", "H4", "H5", "H6", "sub_header"],
    opacity: [
      "text-opacity-10",
      "text-opacity-25",
      "text-opacity-50",
      "text-opacity-75",
      "text-opacity-100",
    ],
    color: ["primary", "secondary", "dark", "light", "#000000"],
    startEndorment:
      "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'><path d='M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z'/><path d='M13.293 7.293 8.586 12l4.707 4.707 1.414-1.414L11.414 12l3.293-3.293-1.414-1.414z'/></svg>",
    endEndorment:
      "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'><path d='M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z'/><path d='M13.293 7.293 8.586 12l4.707 4.707 1.414-1.414L11.414 12l3.293-3.293-1.414-1.414z'/></svg>",
    extraClass: "",
  },
  imageObject: [
    {
      position: [
        "top-right",
        "top-left",
        "bottom-left",
        "bottom-right",
        "left",
        "right",
        "top",
        "top_center",
        "bottom",
      ],
      url: "https://www.img.com",
      size: ["W-25", "W-50", "W-75", "W-100", "H-25", "H-50", "H-75", "H-100"],
      alt: "Alternative text",
      extraClass: "",
    },
  ],
  paragraph: {
    content: "This is a paragraph.",
    opacity: [
      "text-opacity-10",
      "text-opacity-25",
      "text-opacity-50",
      "text-opacity-75",
      "text-opacity-100",
    ],
    color: ["primary", "secondary", "dark", "light", "#000000"],
    extraClass: "",
  },
  button: [
    {
      variation: [
        "btn-primary",
        "btn-secondary",
        "btn-success",
        "btn-danger",
        "btn-warning",
        "btn-info",
        "btn-light",
        "btn-dark",
        "btn-link",
        "#000000",
      ],
      btnTextColor: "#000000",
      text: "Click me",
      url: "https://example.com",
      action: ["internal_redirect", "external_redirect"],
      size: ["sm", "md", "lg", "w-100", "32px"],
      position: ["Left", "Right", "Center"],
      startEndorment:
        "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'><path d='M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z'/><path d='M13.293 7.293 8.586 12l4.707 4.707 1.414-1.414L11.414 12l3.293-3.293-1.414-1.414z'/></svg>",
      endEndorment:
        "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'><path d='M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z'/><path d='M13.293 7.293 8.586 12l4.707 4.707 1.414-1.414L11.414 12l3.293-3.293-1.414-1.414z'/></svg>",
      extraClass: "",
    },
  ],
  cardStyle: {
    cardbgImage: {
      url: "https://example.com/image.jpg",
    },
    cardbgcolor: ["primary", "secondary", "dark", "light", "#000000"],
    color: ["primary", "secondary", "dark", "light", "#000000"],
    cardbgopacity: "0.0 to 1.0",
    border: [
      "border",
      "border-top",
      "border-end",
      "border-bottom",
      "border-start",
    ],
    borderColor: [
      "border-white",
      "border-dark",
      "border-light",
      "border-info",
      "border-warning",
      "border-danger",
      "border-success",
      "border-secondary",
      "border-primary",
    ],
    "border-radius": [
      "rounded",
      "rounded-start",
      "rounded-end",
      "rounded-top",
      "rounded-bottom",
    ],
    borderOpacity: [
      "border-opacity-10",
      "border-opacity-25",
      "border-opacity-50",
      "border-opacity-75",
      "border-opacity-100",
    ],
    borderWidth: ["border-0", "border-1", "border-2", "border-3"],
    extraClass: "",
  },
  tag: {
    position: ["left", "right"],
    text: "Sample tag",
    bgColor: ["primary", "secondary", "dark", "light", "#000000"],
    textColor: ["primary", "secondary", "dark", "light", "#000000"],
    borderRadius: [
      "rounded-top",
      "rounded-end",
      "rounded-bottom",
      "rounded-start",
      "rounded-circle",
      "rounded-pill",
    ],
    bgOpacity: [
      "bg-opacity-10",
      "bg-opacity-25",
      "bg-opacity-50",
      "bg-opacity-75",
      "bg-opacity-100",
    ],
    extraClass: "",
  },
  formJson: [
    {
      label: "Gender",
      field_name: "gender",
      type: ["text", "number", "textarea", "radio", "checkbox", "dropdown"],
      is_mandatory: true,
      options: ["male", "female", "other"],
      extraClass: "",
    },
  ],
  consent_statement: {
    text: "I agree to the terms and conditions.",
    type: "consent",
    type_id: 101,
    position: [
      "after_content",
      "before_content",
      "before_related",
      "after_related",
      "left_panel_before",
      "left_panel_after",
      "top",
    ],
  },
};

export default ctaSchema;
