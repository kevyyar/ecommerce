import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.tsx";
import "./index.css";
import NavLayout from "./layouts/nav-layout.tsx";
import AboutPage from "./pages/about-page.tsx";

const root = document.getElementById("root")!;

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<NavLayout />}>
          <Route path="/" element={<App />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
