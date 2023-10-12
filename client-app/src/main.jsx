import React, {Suspense} from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.jsx";
import {BrowserRouter as Router} from "react-router-dom";
import LoadingSpinner from "./app/common/LoadingSpinner.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <App />
      </Suspense>
    </Router>
  </React.StrictMode>
);
