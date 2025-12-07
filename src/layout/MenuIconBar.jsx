import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import packageJson from "../../package.json"; // Adjust the path as necessary

const MenuIconBar = ({ activeMenu, setActiveMenu, menuDetails }) => {
  return (
    <>
      {Object.entries(menuDetails).map(([menuKey, menuValue]) => {
        const Icon = menuValue.icon;
        return (
          <Button
            style={{
              width: "90%",
              minWidth: "30px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "55px",
            }}
            key={menuKey}
            title={menuValue.title}
            variant={activeMenu === menuKey ? "primary" : "light"}
            className={`mb-2 ${activeMenu === menuKey ? "active" : "text-muted"}`}
            onClick={() => setActiveMenu(menuKey)}
          >
            <Icon size={20} />
            <p
              className="fs-6 m-0 p-0 text-center"
              style={{
                fontSize: "10px",
                lineHeight: "1",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "100%",
              }}
            >
              {menuValue.text}
            </p>
          </Button>
        );
      })}

      <p className="text-muted text-center mt-2">
        v{packageJson.version}
      </p>

      <ToastContainer position="top-center" autoClose={2000} />
    </>

  );
};

export default MenuIconBar;

