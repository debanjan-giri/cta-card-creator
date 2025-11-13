// import { Copy, Check, AlertTriangle } from "lucide-react";
// import { memo, useState, useEffect } from "react";
// import { Button } from "react-bootstrap";
// import { ToastContainer, toast } from "react-toastify";
// import { DynamicCTATemplateCard } from "../CTA/DynamicCTATemplateCard";
// import { BsFillCheckCircleFill } from "react-icons/bs";
// import GenerateJsonComponent from "../utils/GenerateJsonComponent";
// import { FaPlus } from "react-icons/fa6";
// import "../css/global.css";

// // You can keep this for local fallback or remove if not needed
// import templateData from "../constants/templateData";
// // https://be.clirdev.com/manualcta/template-options
// const parentOrigin = window.top.location.origin;
// const clirdevUrl = "https://be.clirdev.com/manualcta/template-options";
// const API_URL = `http://${parentOrigin}/manualcta/template-options`;

// const InitialJson = {
//   tag: {
//     text: "",
//     position: "",
//     bgColor: "",
//     textColor: "",
//     borderRadius: "",
//     bgOpacity: "",
//     extraClass: "",
//   },
//   title: {
//     content: "Select a Header",
//     variation: "h4",
//     opacity: "text-opacity-100",
//     color: "dark",
//     startEndorment: "",
//     endEndorment: "",
//     extraClass: "justify-content-center",
//   },
//   paragraph: {
//     content: "Select a Paragraph",
//     opacity: "text-opacity-100",
//     color: "dark",
//     extraClass: "mt-2",
//   },
//   button: [
//     {
//       url: "",
//       content: "Click here",
//       variation: "btn-primary",
//       size: "",
//       position: "center",
//       startEndorment: "",
//       endEndorment: "",
//       extraClass: "px-4 fw-medium fs-5",
//     },
//   ],
//   cardStyle: {
//     cardbgcolor: "white",
//     color: "primary",
//     cardbgopacity: "",
//     border: "",
//     borderColor: "",
//     borderOpacity: "",
//     borderWidth: "rounded-3",
//     extraClass: "",
//     borderRadius: "",
//   },
//   imageObject: [
//     {
//       url: "https://clirnet-cms.b-cdn.net/medwiki/43_server/video/1696423230_1688713284_78rr-removebg-preview_(1).png?tr=w-411,h-108,pr=true,c-at_max",
//       position: "top-right",
//       size: "30px",
//       alt: "",
//       extraClass: "",
//     },
//   ],
// };

// // Session storage helper functions
// const STORAGE_KEYS = {
//   EDITOR_DATA: "cta_editor_data",
//   SELECTED_TEMPLATE_ID: "cta_selected_template_id",
// };

// const getStoredData = (key, defaultValue = null) => {
//   try {
//     const stored = sessionStorage.getItem(key);
//     return stored ? JSON.parse(stored) : defaultValue;
//   } catch (error) {
//     console.warn("Error reading from sessionStorage:", error);
//     return defaultValue;
//   }
// };

// const setStoredData = (key, value) => {
//   try {
//     sessionStorage.setItem(key, JSON.stringify(value));
//   } catch (error) {
//     console.warn("Error writing to sessionStorage:", error);
//   }
// };

// const CardTemplate = memo(
//   ({ editorData, onSelectTemplate, setEditorData, activeMenu, onChange }) => {
//     const [selectedTemplateId, setSelectedTemplateId] = useState(null);
//     const [fetchedTemplates, setFetchedTemplates] = useState([]);
//     const [loading, setLoading] = useState(true);

//     // 🔹 Fetch template data dynamically
//     useEffect(() => {
//       const fetchTemplates = async () => {
//         try {
//           const res = await fetch(API_URL);
//           if (!res.ok) throw new Error("Failed to fetch templates");
//           const data = await res.json();
//           if (Array.isArray(data)) {
//             setFetchedTemplates(data);
//             console.log("Fetched templates:", data);
//           } else {
//             console.warn("API response not an array, using fallback");
//             setFetchedTemplates(templateData);
//           }
//         } catch (error) {
//           console.error("Error fetching template options:", error);
//           // toast.error("Failed to load templates, using default samples");
//           setFetchedTemplates(templateData); // fallback
//         } finally {
//           setLoading(false);
//         }
//       };

//       console.log("Fetching templates...", API_URL);

//       fetchTemplates();
//     }, []);

//     console.log("Fetched templates:", fetchedTemplates);

//     // 🔹 Session storage setup
//     useEffect(() => {
//       const storedEditorData = getStoredData(STORAGE_KEYS.EDITOR_DATA);
//       const storedTemplateId = getStoredData(STORAGE_KEYS.SELECTED_TEMPLATE_ID);

//       if (storedEditorData) {
//         setSelectedTemplateId(storedTemplateId);
//         onSelectTemplate(storedEditorData);
//         setEditorData(storedEditorData);
//       } else {
//         onSelectTemplate(InitialJson);
//         setEditorData(InitialJson);
//         setStoredData(STORAGE_KEYS.EDITOR_DATA, InitialJson);
//         setStoredData(STORAGE_KEYS.SELECTED_TEMPLATE_ID, null);
//       }
//     }, []);

//     // 🔹 Handle template selection
//     const handleTemplateSelect = (template) => {
//       setSelectedTemplateId(template.id);
//       onSelectTemplate(template.data);

//       setStoredData(STORAGE_KEYS.EDITOR_DATA, template.data);
//       setStoredData(STORAGE_KEYS.SELECTED_TEMPLATE_ID, template.id);
//     };

//     const handleCreateNewCard = () => {
//       setEditorData(InitialJson);
//       setSelectedTemplateId(null);
//       setStoredData(STORAGE_KEYS.EDITOR_DATA, InitialJson);
//       setStoredData(STORAGE_KEYS.SELECTED_TEMPLATE_ID, null);
//     };

//     return (
//       <div className="p-1 pe-2 ps-2">
//         <div
//           className="d-flex flex-column gap-1 mt-3"
//           style={{ maxHeight: "100vh", overflow: "hidden" }}
//         >
//           {/* Sticky Create Card section */}
//           <div
//             style={{
//               position: "sticky",
//               top: 0,
//               background: "white",
//               zIndex: 10,
//             }}
//           >
//             <p>Create Your Cards</p>
//             <div className="d-flex gap-2 flex-wrap">
//               <Button
//                 variant={"light"}
//                 className="mb-3 d-flex align-items-center gap-2"
//                 onClick={handleCreateNewCard}
//               >
//                 <FaPlus className="icon-animate" />
//                 Create New Card
//               </Button>

//               <GenerateJsonComponent onSelectTemplate={onSelectTemplate} />
//             </div>
//             <hr />
//           </div>

//           {/* 🔹 Template list */}
//           <div
//             style={{
//               overflowY: "scroll",
//               flex: 1,
//               scrollbarWidth: "none",
//               msOverflowStyle: "none",
//               WebkitOverflowScrolling: "touch",
//               marginRight: "-16px",
//               paddingRight: "16px",
//             }}
//           >
//             <p>Select Sample Cards :</p>

//             {loading ? (
//               <p className="text-muted">Loading templates...</p>
//             ) : (
//               <div className="m-2">
//                 {fetchedTemplates &&
//                   fetchedTemplates.map((template) => {
//                     const isSelected = selectedTemplateId === template.id;
//                     const templateData = template?.data;
//                     console.log("template", template);
//                     console.log(templateData, "templateData");
//                     return (
//                       <div
//                         key={template.id}
//                         className={`template-card p-2 rounded mb-3 position-relative ${
//                           isSelected
//                             ? "template-card-selected"
//                             : "template-card-default"
//                         }`}
//                         onClick={() => handleTemplateSelect(template)}
//                         style={{ cursor: "pointer" }}
//                       >
//                         {isSelected && (
//                           <div className="selected-check">
//                             <BsFillCheckCircleFill color="#0d6efd" size={18} />
//                           </div>
//                         )}

//                         {templateData && (
//                           <DynamicCTATemplateCard {...templateData} />
//                         )}
//                       </div>
//                     );
//                   })}
//               </div>
//             )}
//           </div>
//         </div>

//         <ToastContainer position="top-center" autoClose={2000} />
//       </div>
//     );
//   }
// );

// export default CardTemplate;

import { Copy, Check, AlertTriangle } from "lucide-react";
import { memo, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { DynamicCTATemplateCard } from "../CTA/DynamicCTATemplateCard";
import { BsFillCheckCircleFill } from "react-icons/bs";
import GenerateJsonComponent from "../utils/GenerateJsonComponent";
import { FaPlus } from "react-icons/fa6";
import "../css/global.css";

// You can keep this for local fallback or remove if not needed
import templateData from "../constants/templateData";
// https://be.clirdev.com/manualcta/template-options
const parentOrigin = window.top.location.origin;
const clirdevUrl = "https://be.clirdev.com/manualcta/template-options";
// const API_URL = `http://${parentOrigin}/manualcta/template-options`;

const InitialJson = {
  tag: {
    text: "",
    position: "",
    bgColor: "",
    textColor: "",
    borderRadius: "",
    bgOpacity: "",
    extraClass: "",
  },
  title: {
    content: "Select a Header",
    variation: "h4",
    opacity: "text-opacity-100",
    color: "dark",
    startEndorment: "",
    endEndorment: "",
    extraClass: "justify-content-center",
  },
  paragraph: {
    content: "Select a Paragraph",
    opacity: "text-opacity-100",
    color: "dark",
    extraClass: "mt-2",
  },
  button: [
    {
      url: "",
      content: "Click here",
      variation: "btn-primary",
      size: "",
      position: "center",
      startEndorment: "",
      endEndorment: "",
      extraClass: "px-4 fw-medium fs-5",
    },
  ],
  cardStyle: {
    cardbgcolor: "white",
    color: "primary",
    cardbgopacity: "",
    border: "",
    borderColor: "",
    borderOpacity: "",
    borderWidth: "rounded-3",
    extraClass: "",
    borderRadius: "",
  },
  imageObject: [
    {
      url: "https://clirnet-cms.b-cdn.net/medwiki/43_server/video/1696423230_1688713284_78rr-removebg-preview_(1).png?tr=w-411,h-108,pr=true,c-at_max",
      position: "top-right",
      size: "30px",
      alt: "",
      extraClass: "",
    },
  ],
};

// Session storage helper functions
const STORAGE_KEYS = {
  EDITOR_DATA: "cta_editor_data",
  SELECTED_TEMPLATE_ID: "cta_selected_template_id",
};

const getStoredData = (key, defaultValue = null) => {
  try {
    const stored = sessionStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.warn("Error reading from sessionStorage:", error);
    return defaultValue;
  }
};

const setStoredData = (key, value) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn("Error writing to sessionStorage:", error);
  }
};

const CardTemplate = memo(
  ({ editorData, onSelectTemplate, setEditorData, activeMenu, onChange }) => {
    const [selectedTemplateId, setSelectedTemplateId] = useState(null);
    const [fetchedTemplates, setFetchedTemplates] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🔹 Fetch template data dynamically
    useEffect(() => {
      const fetchTemplates = async () => {
        try {
          const res = await fetch(clirdevUrl, { method: "GET" });
          if (!res.ok) throw new Error("Failed to fetch templates");
          const data = await res.json();
          if (Array.isArray(data)) {
            setFetchedTemplates(data);
            console.log("Fetched templates:", data);
          } else {
            console.warn("API response not an array, using fallback");
            setFetchedTemplates(templateData);
          }
        } catch (error) {
          console.error("Error fetching template options:", error);
          // toast.error("Failed to load templates, using default samples");
          setFetchedTemplates(templateData); // fallback
        } finally {
          setLoading(false);
        }
      };

      console.log("Fetching templates...", clirdevUrl);

      fetchTemplates();
    }, []);

    console.log("Fetched templates:", fetchedTemplates);

    // 🔹 Session storage setup
    useEffect(() => {
      const storedEditorData = getStoredData(STORAGE_KEYS.EDITOR_DATA);
      const storedTemplateId = getStoredData(STORAGE_KEYS.SELECTED_TEMPLATE_ID);

      if (storedEditorData) {
        setSelectedTemplateId(storedTemplateId);
        onSelectTemplate(storedEditorData);
        setEditorData(storedEditorData);
      } else {
        onSelectTemplate(InitialJson);
        setEditorData(InitialJson);
        setStoredData(STORAGE_KEYS.EDITOR_DATA, InitialJson);
        setStoredData(STORAGE_KEYS.SELECTED_TEMPLATE_ID, null);
      }
    }, []);

    // 🔹 Handle template selection
    const handleTemplateSelect = (template) => {
      setSelectedTemplateId(template.id);
      onSelectTemplate(template.data);

      setStoredData(STORAGE_KEYS.EDITOR_DATA, template.data);
      setStoredData(STORAGE_KEYS.SELECTED_TEMPLATE_ID, template.id);
    };

    const handleCreateNewCard = () => {
      setEditorData(InitialJson);
      setSelectedTemplateId(null);
      setStoredData(STORAGE_KEYS.EDITOR_DATA, InitialJson);
      setStoredData(STORAGE_KEYS.SELECTED_TEMPLATE_ID, null);
    };

    return (
      <div className="p-1 pe-2 ps-2">
        <div
          className="d-flex flex-column gap-1 mt-3"
          style={{ maxHeight: "100vh", overflow: "hidden" }}
        >
          {/* Sticky Create Card section */}
          <div
            style={{
              position: "sticky",
              top: 0,
              background: "white",
              zIndex: 10,
            }}
          >
            <p>Create Your Cards</p>
            <div className="d-flex gap-2 flex-wrap">
              <Button
                variant={"light"}
                className="mb-3 d-flex align-items-center gap-2"
                onClick={handleCreateNewCard}
              >
                <FaPlus className="icon-animate" />
                Create New Card
              </Button>

              <GenerateJsonComponent onSelectTemplate={onSelectTemplate} />
            </div>
            <hr />
          </div>

          {/* 🔹 Template list */}
          <div
            style={{
              overflowY: "scroll",
              flex: 1,
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
              marginRight: "-16px",
              paddingRight: "16px",
            }}
          >
            <p>Select Sample Cards :</p>

            {loading ? (
              <p className="text-muted">Loading templates...</p>
            ) : (
              <div className="m-2">
                {fetchedTemplates &&
                  fetchedTemplates.map((template) => {
                    const isSelected = selectedTemplateId === template.id;
                    const templateData = template?.data;
                    console.log("template", template);
                    console.log(templateData, "templateData");
                    return (
                      <div
                        key={template.id}
                        className={`template-card p-2 rounded mb-3 position-relative ${
                          isSelected
                            ? "template-card-selected"
                            : "template-card-default"
                        }`}
                        onClick={() => handleTemplateSelect(template)}
                        style={{ cursor: "pointer" }}
                      >
                        {isSelected && (
                          <div className="selected-check">
                            <BsFillCheckCircleFill color="#0d6efd" size={18} />
                          </div>
                        )}

                        {templateData && (
                          <DynamicCTATemplateCard {...templateData} />
                        )}
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>

        <ToastContainer position="top-center" autoClose={2000} />
      </div>
    );
  }
);

export default CardTemplate;
