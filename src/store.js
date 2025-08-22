import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./features/auth/loginSlice";
import registerReducer from "./features/auth/registerSlice";
import otpReducer from "./features/auth/otpSlice";
import resetPasswordReducer from "./features/auth/resetPasswordSlice";
import googleRducer from "./features/auth/googleSlice";
import homeReducer from "./features/data/homeSlice";
import landinPageReducer from "./features/data/landingPageSlice";
import clinicReducer from "./features/data/clinicsSlice";
import cosmeticReducer from "./features/data/cosmeticSlice";
import navBarReducer from "./features/data/navBarSlice";
export default configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    otp: otpReducer,
    resetPassword: resetPasswordReducer,
    googleLogin: googleRducer,
    homeData: homeReducer,
    landingData: landinPageReducer,
    clinicsData: clinicReducer,
    cosmeticData: cosmeticReducer,
    navBarData: navBarReducer,
  },
});
