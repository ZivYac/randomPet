import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doLogout } from "./AuthSlice";
const INITIAL_STATE = {
  cats: [],
  loading: false,
  error: null,
  counter: 0,
};

export const getRandomCat = createAsyncThunk(
  "catSlice/getRandomCat",
  async (catNum, { dispatch, rejectWithValue }) => {
    try {
      // const url = "https://random.cat/view/" + String(catNum);
      // const url = "https://aws.random.cat/meow";
      const url = "https://api.thecatapi.com/v1/images/search"; //!!!
      // const url = "https://cataas.com/cat";
      const fetchData = fetch(url).then((response) => response.json());
      return fetchData;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const catSlice = createSlice({
  name: "catSlice",
  initialState: INITIAL_STATE,
  reducers: {
    deleteCat: (state, action) => {
      const { pet } = action.payload;
      const temp = state.cats;
      temp.map((cat, i) => {
        if (cat.image === pet.image) temp.splice(i, 1);
      });
    },
    changeTitle: (state, action) => {
      const { pet, title } = action.payload;
      state.cats.map((cat) => {
        if (cat.image === pet.image) cat.title = title;
      });
    },
    setFavorite: (state, action) => {
      const { pet } = action.payload;
      state.cats.map((cat) => {
        if (cat.image === pet.image) cat.favorite = !cat.favorite;
      });
    },
    deleteComment: (state, action) => {
      const { pet, index } = action.payload;
      state.cats.map((cat) => {
        if (cat.image === pet.image) cat.comments.splice(index, 1);
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRandomCat.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRandomCat.fulfilled, (state, action) => {
        state.loading = false;
        state.counter++;
        localStorage.setItem("cat_counter", state.counter);
        state.cats.push({
          image: action.payload.message,
          title: `Cat Number ${state.counter}`,
          type: "cat",
          favorite: false,
        });
      })
      .addCase(getRandomCat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(doLogout, () => INITIAL_STATE);
  },
});

export const { deleteCat, changeTitle, setFavorite, deleteComment } =
  catSlice.actions;
export default catSlice.reducer;
