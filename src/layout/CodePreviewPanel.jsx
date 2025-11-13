import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const CodePreviewPanel = ({ editorData, domTree, formHtml }) => {
  const [activeTab, setActiveTab] = useState("Json");

  const handleCopy = (data) => {
    const copyData =
      typeof data === "string" ? data : JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(copyData);
    toast.success(`Copied to clipboard`);
  };

  const tabs = [
    { key: "Json", title: "JSON" },
    { key: "Html", title: "HTML" },
    { key: "Form", title: "Form" },
  ];

  const getCurrentTabData = () => {
    return activeTab === "Json"
      ? editorData
      : activeTab === "Html"
      ? domTree
      : formHtml;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Json":
        return (
          <pre
            className="m-0 p-3 bg-light rounded"
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              overflow: "visible",
              maxWidth: "100%",
              fontSize: "12px",
            }}
          >
            {JSON.stringify(editorData, null, 2)}
          </pre>
        );
      case "Html":
        return (
          <pre
            className="m-0 p-3 bg-light rounded"
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              overflow: "visible",
              maxWidth: "100%",
              fontSize: "12px",
            }}
          >
            {/* {parse(`${domTree}`)} */}
            {domTree}
          </pre>
        );
      case "Form":
        return (
          <pre
            className="m-0 p-3 bg-light rounded"
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              overflow: "visible",
              maxWidth: "100%",
              fontSize: "12px",
            }}
          >
            {formHtml}
          </pre>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-100 d-flex flex-column">
      <style>{`
        .tab-btn-small {
          background: none;
          border: none;
          padding: 0.4rem 0.8rem;
          font-size: 0.8rem;
          color: #6c757d;
          position: relative;
          cursor: pointer;
          font-weight: 500;
          transition: color 0.2s ease;
          border-radius: 4px;
        }
        .tab-btn-small:hover {
          color: #0d6efd;
          background-color: #f8f9fa;
        }
        .tab-btn-small.active {
          color: #0d6efd;
          background-color: #e3f2fd;
        }
      `}</style>

      {/* Header */}
      <div className="p-3 border-bottom bg-white">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="m-0 fw-semibold">Code Preview</h6>
          <button
            className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1"
            onClick={(e) => {
              e.stopPropagation();
              handleCopy(getCurrentTabData());
            }}
          >
            Copy
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="d-flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`tab-btn-small ${
                activeTab === tab.key ? "active" : ""
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow-1 overflow-auto p-3">{renderTabContent()}</div>
    </div>
  );
};

export default CodePreviewPanel;
