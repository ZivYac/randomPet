import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doLogout } from "./AuthSlice";

const INITIAL_STATE = {
  dogs: [],
  loading: false,
  error: null,
  counter: 0,
  comments: [],
};

const comments = await fetch(
  "https://jsonplaceholder.typicode.com/comments"
).then((response) => response.json());

const getRandomInt = (num = 10) => Math.floor(Math.random() * num) + 1;

export const getRandomDog = createAsyncThunk(
  "dogSlice/getRandomDog",
  async (args, { dispatch, rejectWithValue }) => {
    try {
      const dogUrl = "https://dog.ceo/api/breeds/image/random";
      const dogData = await fetch(dogUrl).then((response) => response.json());
      const commentsStart = getRandomInt(500);
      return {
        image: dogData.message,
        type: "dog",
        favorite: false,
        comments: comments
          .slice(commentsStart, commentsStart + getRandomInt())
          .map((item) => item.name),
      };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const dogSlice = createSlice({
  name: "dogSlice",
  initialState: INITIAL_STATE,
  reducers: {
    deleteDog: (state, action) => {
      const { pet } = action.payload;
      const temp = state.dogs;
      temp.map((dog, i) => {
        if (dog.image === pet.image) temp.splice(i, 1);
      });
    },
    changeTitle: (state, action) => {
      const { pet, title } = action.payload;
      state.dogs.map((dog) => {
        if (dog.image === pet.image) dog.title = title;
      });
    },
    setFavorite: (state, action) => {
      const { pet } = action.payload;
      state.dogs.map((arrDog) => {
        if (arrDog.image === pet.image) arrDog.favorite = !arrDog.favorite;
      });
    },
    deleteComment: (state, action) => {
      const { request } = action.payload;
      console.log("🚀 ~ pet, index:", request);
      const temp = state.dogs;
      const found = state.dogs.findIndex((d) => d.image === request.image);
      console.log("🚀 ~ found:", temp[found]);
      temp[found] = request;
      // temp.map((dog) => {
      //   if (dog.image === pet.image) dog.comments.splice(index, 1);
      // });
      console.log("🚀 ~ found:", temp[found]);
      state.dogs = temp;
    },
    addComment: (state, action) => {
      const { pet, newComment } = action.payload;
      const temp = state.dogs;

      temp.map((dog) => {
        if (dog.image === pet.image) {
          dog.comments.push(newComment);
        }
      });
    },
    editComment: (state, action) => {
      const { pet, index, newComment } = action.payload;
      const temp = state.dogs;
      temp.map((dog) => {
        if (dog.image === pet.image) {
          dog.comments[index] = newComment;
        }
      });
    },
    updateFavorites: (state, action) => {
      const { dog, title, comments } = action.payload;
      const temp = state.favorites;
      temp.map((fav, i) => {
        if (fav.image === dog.image)
          temp[i] = { ...fav, title: title, comments: comments };
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRandomDog.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRandomDog.fulfilled, (state, action) => {
        state.loading = false;
        state.counter++;
        localStorage.setItem("dog_counter", state.counter);
        state.dogs.push({
          ...action.payload,
          title: `Dog Number ${state.counter}`,
        });
      })
      .addCase(getRandomDog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(doLogout, () => INITIAL_STATE);
  },
});

export const {
  deleteDog,
  changeTitle,
  setFavorite,
  deleteComment,
  addComment,
  editComment,
} = dogSlice.actions;
export default dogSlice.reducer;
