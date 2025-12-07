import React, { useEffect, useRef } from "react";
import Quill from "quill";
import { RiResetLeftFill } from "react-icons/ri";
import "quill/dist/quill.snow.css";

const QuilEditor = ({
  label,
  value,
  setValue,
  placeholder,
  disabled = false,
}) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const skipNextTextChange = useRef(false);

  // Initialize Quill only once
  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder,
        readOnly: disabled,
        modules: {
          toolbar: [
            [
              "bold",
              "italic",
              "underline",
              "strike",
              // { color: [] },
              // { background: [] },
              { script: "sub" },
              { script: "super" },
              { list: "ordered" },
              { list: "bullet" },
              "link",
              //   "clean",
            ],
          ],
        },
      });

      if (value) {
        skipNextTextChange.current = true; // skip next text-change event
        quillRef.current.clipboard.dangerouslyPasteHTML(value);
      }

      quillRef.current.on("text-change", () => {
        if (skipNextTextChange.current) {
          // We just updated content programmatically, ignore this event
          skipNextTextChange.current = false;
          return;
        }
        const html = quillRef.current.root.innerHTML;
        const content = html === "<p><br></p>" ? "" : html;

        if (content !== value) {
          setValue(content);
        }
      });
    }
  }, []);

  // Sync external value changes
  useEffect(() => {
    if (quillRef.current) {
      const editorContent = quillRef.current.root.innerHTML;
      if (value !== editorContent && value !== "<p><br></p>") {
        skipNextTextChange.current = true;
        quillRef.current.clipboard.dangerouslyPasteHTML(value || "");
      }
    }
  }, [value]);

  // Sync readOnly mode dynamically
  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.enable(!disabled);
    }
  }, [disabled]);

  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <div className="position-relative">
        <div ref={editorRef} style={{ minHeight: "100px" }} />
        {value && (
          <RiResetLeftFill
            onClick={() => setValue("")}
            className="text-danger cursor-pointer position-absolute"
            style={{ top: 10, right: 10, zIndex: 1 }}
            size={22}
            aria-label="Reset editor"
            role="button"
          />
        )}
      </div>
    </div>
  );
};

export default QuilEditor;