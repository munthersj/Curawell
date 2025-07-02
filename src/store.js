import { configureStore } from "@reduxjs/toolkit";
import loginreducer from "./features/auth/loginSlice";
import registerreducer from "./features/auth/registerSlice";
export default configureStore({
  reducer: {
    login: loginreducer,
    register: registerreducer,
  },
});
