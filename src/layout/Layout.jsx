// import { useState, useEffect, lazy, Suspense } from "react";
// import {
//   SquarePilcrow,
//   Paintbrush,
//   Image,
//   LetterText,
//   Tag,
//   Pointer,
//   Paperclip,
//   Braces,
//   CircleArrowRight,
// } from "lucide-react";
// import "react-toastify/dist/ReactToastify.css";
// import { toast, ToastContainer } from "react-toastify";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import CodePreviewPanel from "./CodePreviewPanel";
// import DiscardAllChangeModal from "../CTA/DiscardAllChangeModal";
// import templateData from "../constants/templateData";

// const TitleEditor = lazy(() => import("../screens/TitleEditor"));
// const ImageEditor = lazy(() => import("../screens/ImageEditor"));
// const ButtonEditor = lazy(() => import("../screens/ButtonEditor"));
// const TagEditor = lazy(() => import("../screens/TagEditor"));
// const CardEditor = lazy(() => import("../screens/CardEditor"));
// const FormEditor = lazy(() => import("../screens/FormEditor"));
// const ParagraphEditor = lazy(() => import("../screens/ParagraphEditor"));
// const CardPreview = lazy(() => import("./CardPreview"));
// const CardTemplate = lazy(() => import("./CardTemplate"));
// const MenuIconBar = lazy(() => import("./MenuIconBar"));
// const BootstrapVisualController = lazy(() =>
//   import("../components/BootstrapModal")
// );

// const menuDetails = {
//   template: { component: CardTemplate, icon: Braces, text: "Template" },
//   cardStyle: { component: CardEditor, icon: Paintbrush, text: "Card" },
//   title: { component: TitleEditor, icon: LetterText, text: "Title" },
//   paragraph: {
//     component: ParagraphEditor,
//     icon: SquarePilcrow,
//     text: "Subtitle",
//   },
//   button: { component: ButtonEditor, icon: Pointer, text: "Button" },
//   imageObject: { component: ImageEditor, icon: Image, text: "Image" },
//   tag: { component: TagEditor, icon: Tag, text: "Tag" },
//   formJson: { component: FormEditor, icon: Paperclip, text: "Form" },
// };

// const STORAGE_KEY = "editorData";

// const Layout = () => {
//   const [editorData, setEditorData] = useState(templateData[0]?.data);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const [activeMenu, setActiveMenu] = useState("template");
//   const [mobile, setMobile] = useState(0);
//   const [showMobileMenu, setShowMobileMenu] = useState(false);
//   const [domTree, setDomTree] = useState("");
//   const [formHtml, setFormHtml] = useState("");
//   const [showDiscardModal, setShowDiscardModal] = useState(false);
//   const [pendingMenuChange, setPendingMenuChange] = useState(null);

//   let parentId = null;
//   const parentPath = window.top.location.pathname; // e.g. "/manualcta/4654/edit"
//   console.log("Parent path:", parentPath);
//   const parts = parentPath.split("/"); // ["", "manualcta", "4654", "edit"]
//   console.log("Parts:", parts);
//   parentId = parts.find((p) => /^\d+$/.test(p)); // find the numeric part
//   console.log("Parent ID:", parentId);

//   const clirdevUrl = `https://be.clirdev.com/manualcta/${4654}/editjson`;

//   const parentOrigin = window.top.location.origin;
//   // const parentOrigin = "https://st4zqms7-8002.inc1.devtunnels.ms";
//   const API_URL = `http://${parentOrigin}/manualcta/${parentId}/editjson`;

//   console.log("Parent origin:", parentOrigin);

//   const ActiveComponent = menuDetails[activeMenu]?.component || CardTemplate;
//   useEffect(() => {
//     const fetchEditorData = async () => {
//       try {
//         console.log("Fetching editor data for ID:", parentId);
//         if (!parentId) {
//           console.warn("No ID found in route, using default templateData");
//           setEditorData(templateData[0]?.data);
//           setLoading(false);
//           return;
//         }

//         const response = await fetch(clirdevUrl);
//         console.log("Fetched editor data response status:", response);
//         if (!response.ok) throw new Error("Failed to fetch editor data");

//         const data = await response.json();
//         console.log("Fetched editor data response:", data);
//         if (data && Object.keys(data).length > 0) {
//           console.log("Fetched editor data: 1", data);
//           console.log("Fetched editor data: 2", JSON.parse(data));
//           setEditorData(data);
//         } else {
//           console.warn("No editor data found, using default templateData");
//           setEditorData(templateData[0]?.data);
//         }
//       } catch (error) {
//         console.error("Error fetching editor data:", error);
//         // toast.error("Failed to load editor data, using default template");
//         setEditorData(templateData[0]?.data);
//       } finally {
//         setLoading(false);
//       }
//     };
//     console.log("Fetching editor data for ID:", parentId);
//     fetchEditorData();
//   }, [parentId]);

//   const clearStorage = () => {
//     localStorage.removeItem(STORAGE_KEY);
//     setEditorData(templateData[0]?.data);
//   };

//   // Warn before closing tab
//   useEffect(() => {
//     const handleBeforeUnload = (e) => {
//       if (editorData && activeMenu !== "template") {
//         e.preventDefault();
//         e.returnValue =
//           "You have unsaved changes. Are you sure you want to leave?";
//       }
//     };
//     window.addEventListener("beforeunload", handleBeforeUnload);
//     return () => window.removeEventListener("beforeunload", handleBeforeUnload);
//   }, [editorData, activeMenu]);

//   // Handle template selection
//   const handleTemplateSelect = (templateData) => {
//     setEditorData(templateData);
//   };

//   // Handle editor changes
//   const handleEditorChange = (updatedData, section = null) => {
//     setEditorData((prev) => {
//       if (section) return { ...prev, [section]: updatedData };
//       return { ...prev, [activeMenu]: updatedData };
//     });
//   };

//   const handleMenuChange = (newMenu) => {
//     if (newMenu === "template" && activeMenu !== "template" && editorData) {
//       setPendingMenuChange(newMenu);
//       setShowDiscardModal(true);
//     } else {
//       setActiveMenu(newMenu);
//     }
//   };

//   const handleDiscardConfirm = () => {
//     setActiveMenu(pendingMenuChange);
//     setShowDiscardModal(false);
//     setPendingMenuChange(null);
//   };

//   const handleDiscardCancel = () => {
//     setShowDiscardModal(false);
//     setPendingMenuChange(null);
//   };

//   const handleOutsideClick = (e) => {
//     if (!e.target.closest(".mobile-menu-container")) setShowMobileMenu(false);
//   };

//   useEffect(() => {
//     if (showMobileMenu) {
//       document.addEventListener("click", handleOutsideClick);
//       return () => document.removeEventListener("click", handleOutsideClick);
//     }
//   }, [showMobileMenu]);

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center vh-100 text-muted">
//         Loading Editor...
//       </div>
//     );
//   }

//   return (
//     <div className="d-flex flex-column vh-100">
//       <DiscardAllChangeModal
//         show={showDiscardModal}
//         onConfirm={handleDiscardConfirm}
//         onCancel={handleDiscardCancel}
//       />

//       {/* Navbar */}
//       <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom px-4 py-3">
//         <div
//           onClick={() => navigate("/")}
//           style={{ cursor: "pointer" }}
//           className="navbar-brand text-muted fw-bold fs-5 d-flex align-items-center"
//         >
//           <Braces className="me-2" />
//           Dynamic CTA Creator
//         </div>

//         <div className="ms-auto d-none d-sm-flex align-items-center gap-2">
//           <button
//             className="btn btn-outline-secondary text-nowrap"
//             onClick={() => toast.info("Draft feature under development")}
//           >
//             Save as Draft
//           </button>
//           <button
//             className="btn btn-primary d-flex align-items-center gap-1"
//             onClick={() => {
//               clearStorage();
//               const dataToSend = {
//                 json: editorData || {},
//                 html: domTree || "<h1>No Data</h1>",
//                 form: formHtml || "<h1>No Data</h1>",
//               };
//               window.submitCtaContent?.(dataToSend);
//             }}
//           >
//             Publish <CircleArrowRight size={18} />
//           </button>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div className="flex-grow-1 overflow-hidden">
//         <div className="row g-0 h-100">
//           {/* Editor Section */}
//           <div className="col-md-4 h-100 border-end d-flex">
//             <div
//               className="bg-light border-end d-flex flex-column align-items-center py-3"
//               style={{ minWidth: "90px", maxWidth: "100px" }}
//             >
//               <MenuIconBar
//                 activeMenu={activeMenu}
//                 setActiveMenu={handleMenuChange}
//                 menuDetails={menuDetails}
//               />
//             </div>
//             <div className="flex-grow-1 overflow-auto p-3">
//               <Suspense
//                 fallback={<div className="text-center p-3">Loading...</div>}
//               >
//                 <ActiveComponent
//                   activeMenu={activeMenu}
//                   changedData={editorData}
//                   onChange={handleEditorChange}
//                   setEditorData={setEditorData}
//                   editorData={editorData}
//                   onSelectTemplate={handleTemplateSelect}
//                   modalComponent={
//                     <BootstrapVisualController
//                       onChange={handleEditorChange}
//                       changedData={editorData}
//                       activeMenu={activeMenu}
//                     />
//                   }
//                 />
//               </Suspense>
//             </div>
//           </div>

//           {/* Preview */}
//           <div className="col-md-5 h-100 border-end bg-light">
//             <div className="h-100 overflow-auto">
//               {console.log("editorData", editorData)}
//               <CardPreview
//                 domTree={domTree}
//                 setDomTree={setDomTree}
//                 isHover={true}
//                 setFormHtml={setFormHtml}
//                 setActiveMenu={handleMenuChange}
//                 editorData={editorData}
//                 handleEditorChange={handleEditorChange}
//               />
//             </div>
//           </div>

//           {/* Code Preview */}
//           <div className="col-md-3 h-100">
//             <CodePreviewPanel
//               formHtml={formHtml}
//               editorData={editorData}
//               domTree={domTree}
//             />
//           </div>
//         </div>
//       </div>

//       <ToastContainer position="top-center" autoClose={2000} />
//     </div>
//   );
// };

// export default Layout;

import { useState, useEffect, lazy, Suspense } from "react";
import {
  SquarePilcrow,
  Paintbrush,
  Image,
  LetterText,
  Tag,
  Pointer,
  Paperclip,
  Braces,
  CircleArrowRight,
} from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CodePreviewPanel from "./CodePreviewPanel";
import DiscardAllChangeModal from "../CTA/DiscardAllChangeModal";
import templateData from "../constants/templateData";

const TitleEditor = lazy(() => import("../screens/TitleEditor"));
const ImageEditor = lazy(() => import("../screens/ImageEditor"));
const ButtonEditor = lazy(() => import("../screens/ButtonEditor"));
const TagEditor = lazy(() => import("../screens/TagEditor"));
const CardEditor = lazy(() => import("../screens/CardEditor"));
const FormEditor = lazy(() => import("../screens/FormEditor"));
const ParagraphEditor = lazy(() => import("../screens/ParagraphEditor"));
const CardPreview = lazy(() => import("./CardPreview"));
const CardTemplate = lazy(() => import("./CardTemplate"));
const MenuIconBar = lazy(() => import("./MenuIconBar"));
const BootstrapVisualController = lazy(() =>
  import("../components/BootstrapModal")
);

const menuDetails = {
  template: { component: CardTemplate, icon: Braces, text: "Template" },
  cardStyle: { component: CardEditor, icon: Paintbrush, text: "Card" },
  title: { component: TitleEditor, icon: LetterText, text: "Title" },
  paragraph: {
    component: ParagraphEditor,
    icon: SquarePilcrow,
    text: "Subtitle",
  },
  button: { component: ButtonEditor, icon: Pointer, text: "Button" },
  imageObject: { component: ImageEditor, icon: Image, text: "Image" },
  tag: { component: TagEditor, icon: Tag, text: "Tag" },
  formJson: { component: FormEditor, icon: Paperclip, text: "Form" },
};

const STORAGE_KEY = "editorData";

const Layout = () => {
  const [editorData, setEditorData] = useState(templateData[0]?.data);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState("template");
  const [domTree, setDomTree] = useState("");
  const [formHtml, setFormHtml] = useState("");
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [pendingMenuChange, setPendingMenuChange] = useState(null);

  // Extract parent ID from URL
  const parentPath = window.top.location.pathname; // e.g. /manualcta/4654/edit
  const parentId = parentPath.split("/").find((p) => /^\d+$/.test(p));
  const parentOrigin = window.top.location.origin;
  const clirdevUrl = `https://be.clirdev.com/manualcta/${4654}/editjson`;
  // Construct API URL safely
  const API_URL = `${parentOrigin}/manualcta/${parentId}/editjson`;

  console.log("Parent origin:", parentOrigin);
  console.log("Parent ID:", parentId);
  console.log("API URL:", API_URL);

  const ActiveComponent = menuDetails[activeMenu]?.component || CardTemplate;

  useEffect(() => {
    const fetchEditorData = async () => {
      try {
        console.log("Fetching editor data for ID:", parentId);

        if (!parentId) {
          console.warn("⚠️ No ID found — using default template data");
          setEditorData(templateData[0]?.data);
          setLoading(false);
          return;
        }

        const response = await fetch(clirdevUrl, { method: "GET" });

        if (!response.ok) {
          console.error("❌ Fetch failed with status:", response.status);
          throw new Error("Failed to fetch editor data");
        }

        const data = await response.json();
        console.log("✅ Fetched editor data:", data);

        if (data && Object.keys(data).length > 0) {
          setEditorData(data);
        } else {
          console.warn("⚠️ Empty editor data — using default template");
          setEditorData(templateData[0]?.data);
        }
      } catch (error) {
        console.error("💥 Error fetching editor data:", error.message);
        toast.error("Failed to load editor data. Using default template.");
        setEditorData(templateData[0]?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchEditorData();
  }, [API_URL, parentId]);

  const clearStorage = () => {
    localStorage.removeItem(STORAGE_KEY);
    setEditorData(templateData[0]?.data);
  };

  // Warn before leaving
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (editorData && activeMenu !== "template") {
        e.preventDefault();
        e.returnValue =
          "You have unsaved changes. Are you sure you want to leave?";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [editorData, activeMenu]);

  const handleTemplateSelect = (data) => setEditorData(data);

  const handleEditorChange = (updatedData, section = null) => {
    setEditorData((prev) => {
      if (section) return { ...prev, [section]: updatedData };
      return { ...prev, [activeMenu]: updatedData };
    });
  };

  const handleMenuChange = (newMenu) => {
    if (newMenu === "template" && activeMenu !== "template" && editorData) {
      setPendingMenuChange(newMenu);
      setShowDiscardModal(true);
    } else {
      setActiveMenu(newMenu);
    }
  };

  const handleDiscardConfirm = () => {
    setActiveMenu(pendingMenuChange);
    setShowDiscardModal(false);
    setPendingMenuChange(null);
  };

  const handleDiscardCancel = () => {
    setShowDiscardModal(false);
    setPendingMenuChange(null);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 text-muted">
        Loading Editor...
      </div>
    );
  }

  return (
    <div className="d-flex flex-column vh-100">
      <DiscardAllChangeModal
        show={showDiscardModal}
        onConfirm={handleDiscardConfirm}
        onCancel={handleDiscardCancel}
      />

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom px-4 py-3">
        <div
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
          className="navbar-brand text-muted fw-bold fs-5 d-flex align-items-center"
        >
          <Braces className="me-2" />
          Dynamic CTA Creator
        </div>

        <div className="ms-auto d-none d-sm-flex align-items-center gap-2">
          <button
            className="btn btn-outline-secondary text-nowrap"
            onClick={() => toast.info("Draft feature under development")}
          >
            Save as Draft
          </button>
          <button
            className="btn btn-primary d-flex align-items-center gap-1"
            onClick={() => {
              clearStorage();
              const dataToSend = {
                json: editorData || {},
                html: domTree || "<h1>No Data</h1>",
                form: formHtml || "<h1>No Data</h1>",
              };
              window.submitCtaContent?.(dataToSend);
            }}
          >
            Publish <CircleArrowRight size={18} />
          </button>
        </div>
      </nav>

      {/* Main Layout */}
      <div className="flex-grow-1 overflow-hidden">
        <div className="row g-0 h-100">
          {/* Sidebar */}
          <div className="col-md-4 h-100 border-end d-flex">
            <div
              className="bg-light border-end d-flex flex-column align-items-center py-3"
              style={{ minWidth: "90px", maxWidth: "100px" }}
            >
              <MenuIconBar
                activeMenu={activeMenu}
                setActiveMenu={handleMenuChange}
                menuDetails={menuDetails}
              />
            </div>

            {/* Active Editor */}
            <div className="flex-grow-1 overflow-auto p-3">
              <Suspense
                fallback={<div className="text-center p-3">Loading...</div>}
              >
                <ActiveComponent
                  activeMenu={activeMenu}
                  changedData={editorData}
                  onChange={handleEditorChange}
                  setEditorData={setEditorData}
                  editorData={editorData}
                  onSelectTemplate={handleTemplateSelect}
                  modalComponent={
                    <BootstrapVisualController
                      onChange={handleEditorChange}
                      changedData={editorData}
                      activeMenu={activeMenu}
                    />
                  }
                />
              </Suspense>
            </div>
          </div>

          {/* Preview */}
          <div className="col-md-5 h-100 border-end bg-light">
            <div className="h-100 overflow-auto">
              <CardPreview
                domTree={domTree}
                setDomTree={setDomTree}
                isHover={true}
                setFormHtml={setFormHtml}
                setActiveMenu={handleMenuChange}
                editorData={editorData}
                handleEditorChange={handleEditorChange}
              />
            </div>
          </div>

          {/* Code Panel */}
          <div className="col-md-3 h-100">
            <CodePreviewPanel
              formHtml={formHtml}
              editorData={editorData}
              domTree={domTree}
            />
          </div>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default Layout;
