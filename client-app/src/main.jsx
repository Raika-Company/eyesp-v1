import React, {Suspense} from "react";
import {BrowserRouter as Router} from "react-router-dom";
import LoadingSpinner from "./app/common/LoadingSpinner.jsx";
import ReactDOM from "react-dom/client";
import App from "./app/App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <App />
      </Suspense>
    </Router>
  </React.StrictMode>
);
