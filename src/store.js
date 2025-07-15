import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./features/auth/loginSlice";
import registerReducer from "./features/auth/registerSlice";
import otpReducer from "./features/auth/otpSlice";
import resetPasswordReducer from "./features/auth/resetPasswordSlice";
import googleRducer from "./features/auth/googleSlice";

export default configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    otp: otpReducer,
    resetPassword: resetPasswordReducer,
    googleLogin: googleRducer,
  },
});
