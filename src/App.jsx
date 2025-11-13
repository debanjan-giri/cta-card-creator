import React, { useState, useEffect } from "react";
import Layout from "./layout/Layout";
import FormPage from "./screens/FormPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import NotFoundPage from "./screens/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cta-editor" element={<Layout />} />
        <Route path="/cta-editor/:id" element={<Layout />} />
        <Route path="/" element={<Navigate to="/cta-editor" replace />} />
        <Route path="/form/:id/:ctaType/:token" element={<FormPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
