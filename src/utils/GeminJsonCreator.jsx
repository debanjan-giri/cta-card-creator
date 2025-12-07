import React, { useState } from "react";
import ctaSchema from "../schema/ctaSchema";
import { Button } from "react-bootstrap";
import { FaGoogle } from "react-icons/fa";
import templateData from "../constants/templateData";
const llmKey = "AIzaSyDqx0k3OauXUK6fnJ6aG3rMwVzgKMjwqAY";

const initialData = {
  id: 812,
  name: "Workshop Series",
  data: {
    tag: {
      text: "Certified",
      position: "right",
      bgColor: "success",
      textColor: "white",
      borderRadius: "rounded-pill",
      bgOpacity: "bg-opacity-90",
      extraClass: "mt-3 ms-3 px-3 py-1 fw-medium",
    },
    title: {
      content: "Workshop Series: Master New Skills",
      variation: "h3",
      opacity: "text-opacity-100",
      color: "success",
      startEndorment: "",
      endEndorment: "",
      extraClass: "fw-bold lh-sm mb-3",
    },
    paragraph: {
      content: "<p>Enhance your knowledge with expert-led sessions</p>",
      opacity: "text-opacity-90",
      color: "dark",
      extraClass: "fs-5 mb-4",
    },
    button: [
      {
        url: "",
        content: "Register Today",
        variation: "btn-success",
        size: "",
        position: "center",
        startEndorment: "",
        endEndorment: "",
        extraClass: "px-4 py-2 fw-semibold fs-5 shadow-sm",
      },
    ],
    cardStyle: {
      cardbgcolor: "white",
      color: "success",
      cardbgopacity: "bg-opacity-100",
      border: "border",
      borderColor: "success",
      borderOpacity: "border-opacity-25",
      borderWidth: "rounded-4",
      extraClass: "shadow-lg p-4",
      borderRadius: "",
    },
    imageObject: [
      {
        url: "/api/placeholder/400/320",
        position: "top-right",
        size: "60px",
        alt: "Workshop Series Icon",
        extraClass: "rounded-circle",
      },
    ],
  },
};
const index = Math.floor(templateData.length * Math.random());
function GeminJsonCreator({ onSelectTemplate }) {
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);

    try {
      const apiKey = llmKey; // Ensure this is declared or passed via props/env
      if (!apiKey) {
        alert("API key not found.");
        setLoading(false);
        return;
      }

      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      const prompt = `
        I have the one below sample JSON data:
        ${JSON.stringify(
          templateData[index],
          null,
          2
        )} and there is various styling structure. ${JSON.stringify(
        ctaSchema,
        null,
        2
      )}
        Please generate a completely new JSON data with different styling (e.g. change colors, opacity, variation) while keeping the structure same. Only return the JSON object without explanation or markdown
      `;

      const requestBody = {
        contents: [{ parts: [{ text: prompt }] }],
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const json = await response.json();
      const text = json.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) throw new Error("No response content from Gemini.");

      // Try to parse JSON (strip extra formatting if needed)
      const cleanedText = text.trim().replace(/^```(?:json)?|```$/g, "");
      const parsedData = JSON.parse(cleanedText);

      // Pass to parent
      onSelectTemplate(parsedData?.data);
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to generate JSON: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        variant="light"
        className="d-flex align-items-center gap-2"
        onClick={handleGenerate}
        disabled={loading}
      >
        <FaGoogle />
        <span>{`${loading ? "Generating..." : "Gemini"}`}</span>
      </Button>
    </div>
  );
}

export default GeminJsonCreator;
