import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import ctaSchema from "../schema/ctaSchema";
import { PiOpenAiLogoLight } from "react-icons/pi";
import { SiOpenai } from "react-icons/si";
// Your initialData JSON
const sampleData = {
  id: 2,
  name: "Anxiety Treatment",
  data: {
    tag: {
      text: "Recommended For You",
      position: "left",
      bgColor: "",
      textColor: "dark",
      borderRadius: "rounded-start",
      bgOpacity: "bg-opacity-10",
      extraClass: "mt-3 ms-3",
    },
    title: {
      content: "Longstanding Treatment For Anxiety",
      variation: "sub_header",
      opacity: "text-opacity-100",
      color: "dark",
      startEndorment: "",
      endEndorment: "",
      extraClass: "justify-content-center fs-4 fw-semibold lh-base",
    },
    paragraph: {
      content: "<h5>Precise Dosage and Recommendation</h5>",
      opacity: "text-opacity-100",
      color: "dark",
      extraClass: "pt-3",
    },
    button: [
      {
        url: "",
        content: "Read Now",
        variation: "btn-primary",
        size: "w-100",
        position: "center",
        startEndorment: "",
        endEndorment: "",
        extraClass: "py-3 fw-semibold fs-5",
      },
    ],
    cardStyle: {
      cardbgcolor: "white",
      color: "primary",
      cardbgopacity: "bg-opacity-10",
      border: "",
      borderColor: "",
      borderOpacity: "",
      borderWidth: "rounded-3",
      extraClass: "shadow",
      borderRadius: "",
    },
    imageObject: [
      {
        url: "https://img-cdn.clirnet.com/medwiki/43_server/video/1722859266_1654599815_having-schizophrenia-and-paranoia-can-be-lonely.png",
        position: "top-right",
        size: "45px",
        alt: "image text",
        extraClass: "",
      },
    ],
  },
};

const apiKey =
  "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";

function GenerateJsonComponent({ onSelectTemplate }) {
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);

    try {
      if (!apiKey) {
        alert("API key not found.");
        setLoading(false);
        return;
      }

      const prompt = `
      You are given a JSON object used for advertisement, marketing, or promotional content — specifically for a CTA (Call To Action) card.
      
      Below is a sample JSON object with actual values:
      ${JSON.stringify(sampleData, null, 2)}
      
      Also, here is the schema describing the possible structure and values:
      ${JSON.stringify(ctaSchema, null, 2)}
      
      Now, generate a **new JSON object** that:
      - Uses the **same structure and keys** as the sample.
      - **DOES NOT reuse values** from the sample JSON.
      - Follows the schema for valid variations, styles, and attributes.
      - Changes styling aspects like: **colors, opacity, variations, positions, icons, button styles, etc.**
      - Reflects a **completely new design** while keeping the same structural format.
      
      Return **only** the raw JSON object (no markdown, no explanation).
      `;

      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "openai/gpt-3.5-turbo", // <- valid model from OpenRouter
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
            max_tokens: 1000,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `OpenRouter API error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      const text = data.choices?.[0]?.message?.content;

      if (!text) throw new Error("No content returned from OpenRouter.");

      const cleanedText = text.trim().replace(/^```(?:json)?|```$/g, "");

      let parsedData;
      try {
        parsedData = JSON.parse(cleanedText);
        console.log("Generated JSON:", parsedData);
      } catch (parseErr) {
        throw new Error("Failed to parse JSON: " + parseErr.message);
      }

      console.log("Generated JSON:", parsedData);

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
        onClick={() => {
          handleGenerate();
        }}
        disabled={loading}
      >
        <SiOpenai />
        <span>{`${loading ? "Generating..." : "ChatGpt"}`}</span>
      </Button>
    </div>
  );
}

export default GenerateJsonComponent;
