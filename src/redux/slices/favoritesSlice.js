import { createSlice } from "@reduxjs/toolkit";
import { doLogout } from "./AuthSlice";
const INITIAL_STATE = {
  favorites: JSON.parse(localStorage.getItem("favorites-arr", null))
    ? JSON.parse(localStorage.getItem("favorites-arr", null))
    : [],
  counter: 0,
  loading: false,
};

const favoritesSlice = createSlice({
  name: "favoritesSlice",
  initialState: INITIAL_STATE,
  reducers: {
    addToFavorites: (state, action) => {
      const { pet } = action.payload;
      let found = false;
      state.favorites.map((arrPet) => {
        if (arrPet.image === pet.image && arrPet.type === pet.type)
          found = true;
      });
      if (!found) {
        state.counter++;
        localStorage.setItem("favorites-counter", state.counter);
        state.favorites.push(pet);
        localStorage.setItem("favorites-arr", JSON.stringify(state.favorites));
      }
    },
    removeFromFavorites: (state, action) => {
      const { pet } = action.payload;
      const temp = state.favorites;
      temp.map((fav, i) => {
        if (fav.image === pet.image) temp.splice(i, 1);
      });
      localStorage.setItem("favorites-arr", JSON.stringify(state.favorites));
    },
    update: (state, action) => {
      const temp = state.favorites;
      temp.map((fav, i) => {
        temp[i] = { ...fav, favorite: true };
      });
      localStorage.setItem("favorites-arr", JSON.stringify(state.favorites));
    },
    updateFavorites: (state, action) => {
      const { pet, title, comments } = action.payload;
      const temp = state.favorites;
      temp.map((fav, i) => {
        if (fav.image === pet.image)
          temp[i] = { ...fav, title: title, comments: comments };
      });
      localStorage.setItem("favorites-arr", JSON.stringify(state.favorites));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(doLogout, () => INITIAL_STATE);
  },
});

export const { addToFavorites, removeFromFavorites, update, updateFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
