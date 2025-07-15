import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store.js";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


// Font Awesome Setup 
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronRight , faBars , faTooth } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
library.add(faChevronRight, faTwitter, faGithub , faBars , faTooth);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
