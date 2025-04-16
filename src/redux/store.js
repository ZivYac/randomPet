import { configureStore } from "@reduxjs/toolkit";

import PiSlice from "./slices/PiSlice";
import auth from "./slices/AuthSlice";
import dogSlice from "./slices/dogSlice";
import favoritesSlice from "./slices/favoritesSlice";
import catSlice from "./slices/catSlice";

const store = configureStore({
  reducer: {
    PiSlice: PiSlice,
    auth: auth,
    dogSlice: dogSlice,
    favoritesSlice: favoritesSlice,
    catSlice: catSlice,
  },
});
export default store;
