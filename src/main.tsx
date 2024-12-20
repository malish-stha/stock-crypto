import { StrictMode } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import App from "./App.tsx";
import store from "./app/store.ts";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <GoogleOAuthProvider clientId="703345136929-4bf93i7utide3rednuau7n8bgsng04hu.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
      </Router>
    </Provider>
  </StrictMode>
);
