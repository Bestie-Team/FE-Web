import "@testing-library/jest-dom";
import React from "react";

global.React = React;
process.env.NEXT_PUBLIC_BACKEND_URL = "https://api.test.com";

// For Portals
if (typeof document !== "undefined") {
    const portalRoot = document.createElement("div");
    portalRoot.setAttribute("id", "root-portal");
    document.body.appendChild(portalRoot);
}
