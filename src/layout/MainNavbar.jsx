import { Braces } from "lucide-react";
import React from "react";
import { Navbar } from "react-bootstrap";

const MainNavbar = () => {
  return (
    <div>
      <Navbar bg="white" expand="lg" className="border-bottom px-4 py-3">
        <Navbar.Brand className="text-gray-500 fw-bold fs-5">
          <Braces /> Dynamic CTA creator
        </Navbar.Brand>
      </Navbar>
    </div>
  );
};

export default MainNavbar;
