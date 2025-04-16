import { useEffect, useState } from "react";
import { Flex, Text, Image, Button, Input, Spinner } from "theme-ui";
import {
  deleteDog,
  changeTitle as changeDogTitle,
  setFavorite as setDogFavorite,
} from "../redux/slices/dogSlice";
import {
  deleteCat,
  changeTitle as changeCatTitle,
  setFavorite as setCatFavorite,
} from "../redux/slices/catSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { SaveIcon, EditIcon, DeleteIcon, StarIcon } from "./icons/index.js";
import {
  addToFavorites,
  removeFromFavorites,
  update,
  updateFavorites,
} from "../redux/slices/favoritesSlice.js";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min.js";

const Card = ({ pet, index, isInFav = false, ...props }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(pet?.title);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSave = () => {
    if (pet.type === "dog") dispatch(changeDogTitle({ pet, title }));
    else dispatch(changeCatTitle({ pet, title }));
    dispatch(updateFavorites({ pet, title, comments: pet.comments }));
  };

  const handleDelete = () => {
    if (pet.type === "dog") dispatch(deleteDog({ pet }));
    else dispatch(deleteCat({ pet }));
  };

  const handleSetFavorite = () => {
    if (!pet.favorite) dispatch(addToFavorites({ pet }));
    else dispatch(removeFromFavorites({ pet }));
    if (pet.type === "dog") dispatch(setDogFavorite({ pet }));
    else dispatch(setCatFavorite({ pet }));
  };
  return (
    <Flex
      {...props}
      sx={{
        background: "boxesBackground",
        color: "text",
        height: "100%",
        width: "20rem",
        borderRadius: "2rem",
        paddingX: "0.5rem",
        paddingY: "0.25rem",
        flexDirection: "column",
        maxHeight: "27rem",
      }}
    >
      <Flex sx={{ flexDirection: "row", width: "100%", height: "10%" }}>
        <Flex
          sx={{
            width: "60%",
            margin: "0.25rem",
            background: "buttonBackground",
            border: "solid 1px",
            borderColor: "#000",
            borderRadius: "0.5rem",
          }}
        >
          <Input
            sx={{
              width: "90%",
              height: "100%",
              fontSize: "1rem",
              color: "text",
              border: "none",
              outline: "none",
            }}
            placeholder="Pet Title"
            value={editing ? title : pet.title}
            disabled={!editing}
            onChange={(e) => setTitle(e.target.value)}
          />
          {isInFav ? (
            ""
          ) : (
            <Flex
              sx={{
                color: "text",
                background: "buttonBackground",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                marginRight: "0.5rem",
                borderRadius: "50%",
                cursor: "pointer",
              }}
              onClick={() => {
                if (editing) {
                  handleSave();
                }
                setEditing((prev) => !prev);
                setTitle(pet.title);
              }}
            >
              {editing ? <SaveIcon /> : <EditIcon />}
            </Flex>
          )}
        </Flex>
        {isInFav ? (
          ""
        ) : (
          <Flex
            sx={{
              height: "100%",
              width: "3rem",
              background: "buttonBackground",
              border: "solid 1px",
              borderRadius: "50%",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              margin: "0.1rem",
            }}
            onClick={handleDelete}
          >
            <DeleteIcon />
          </Flex>
        )}

        <Flex
          sx={{
            height: "100%",
            width: "3rem",
            background: "buttonBackground",
            border: "solid 1px",
            borderRadius: "50%",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            margin: "0.1rem",
          }}
          onClick={handleSetFavorite}
        >
          {pet?.favorite ? <StarIcon color="#FFD902" /> : <StarIcon />}
        </Flex>
      </Flex>
      <Image
        src={pet?.image}
        sx={{
          width: "100%",
          aspectRatio: "1 / 1",
          aspectFit: "cover",
          borderRadius: "2rem",
          marginY: "0.5rem",
        }}
      />
      <Flex
        sx={{
          width: "100%",
          margin: "0.25rem",
          background: "buttonBackground",
          border: "solid 1px",
          borderColor: "#000",
          borderRadius: "0.5rem",
          justifyContent: "center",
          padding: "0.5rem",
          cursor: "pointer",
        }}
        onClick={() => {
          history.push("/comments", { pet: pet });
        }}
      >
        Click To View {pet.comments.length} Comments
      </Flex>
    </Flex>
  );
};

export default Card;
