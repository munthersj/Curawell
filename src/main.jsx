import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import "react-day-picker/dist/style.css";

import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store.js";

// Font Awesome Setup
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronRight,
  faBars,
  faTooth,
} from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons";
library.add(faChevronRight, faTwitter, faGithub, faBars, faTooth);

import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "swiper/css";
import "swiper/css/pagination";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="1093330906369-ack3l8i8mg9f52tclb71d0470clq7rsi.apps.googleusercontent.com">
      <BrowserRouter>
        <Provider store={store}>
          <Toaster position="bottom-right" richColors />
          <App />
        </Provider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);
