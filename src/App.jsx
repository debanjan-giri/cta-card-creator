import React, { useState, useEffect } from "react";
import Layout from "./layout/Layout";
import FormPage from "./screens/FormPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import templateData from "./constants/templateData";
import LandingPage from "./screens/LandingPage";
import NotFoundPage from "./screens/NotFound";

const STORAGE_KEY = "editorData";

const App = () => {
  const [editorData, setEditorData] = useState(templateData[0]?.data);

  // const [editorData, setEditorData] = useState(() => {
  //   try {
  //     const savedData = localStorage.getItem(STORAGE_KEY);
  //     return savedData ? JSON.parse(savedData) : templateData[0]?.data;
  //   } catch (error) {
  //     console.error("Error loading data from localStorage:", error);
  //     return templateData[0]?.data;
  //   }
  // });

  // useEffect(() => {
  //   if (editorData) {
  //     try {
  //       localStorage.setItem(STORAGE_KEY, JSON.stringify(editorData));
  //     } catch (error) {
  //       console.error("Error saving data to localStorage:", error);
  //     }
  //   }
  // }, [editorData]);

  // const resetToTemplate = () => {
  //   const templateDataReset = templateData[0]?.data;
  //   setEditorData(templateDataReset);
  //   localStorage.setItem(STORAGE_KEY, JSON.stringify(templateDataReset));
  // };

  // useEffect(() => {
  //   navigate("/cta-editor", { replace: true });
  // }, []);

  const clearStorage = () => {
    localStorage.removeItem(STORAGE_KEY);
    setEditorData(templateData[0]?.data);
    return;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/cta-editor"
          element={
            <Layout
              clearStorage={clearStorage}
              editorData={editorData}
              setEditorData={setEditorData}
            />
          }
        />
        <Route path="/" element={<Navigate to="/cta-editor" replace />} />
        <Route path="/form/:id/:ctaType/:token" element={<FormPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
