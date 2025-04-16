import { Flex, Input } from "theme-ui";
import { DeleteIcon, EditIcon, SaveIcon } from "../components/icons/index.js";
import { useDispatch } from "react-redux";
import {
  editComment as editDogComment,
  deleteComment as deleteDogComment,
} from "../redux/slices/dogSlice";
import {
  editComment as editCatComment,
  deleteComment as deleteCatComment,
} from "../redux/slices/dogSlice";
import { Children, useEffect, useState } from "react";
import { updateFavorites } from "../redux/slices/favoritesSlice.js";

const CommentFlex = ({ index, pet, comm, children, ...props }) => {
  const [disInp, setDisInp] = useState(true);
  const [inpValue, setInpValue] = useState(comm);
  const dispatch = useDispatch();
  useEffect(() => {
    if (disInp) {
      dispatch(
        updateFavorites({ pet, title: pet.title, comments: pet.comments })
      );
    }
  }, [disInp]);

  return (
    <Flex
      {...props}
      sx={{
        marginY: "0.25rem",
        width: "100%",
        fontSize: "1rem",
        border: "solid 1px",
        borderColor: pet?.favorite ? "#ECBE03" : "black",
        borderRadius: "2rem",
        background: "buttonBackground",
        padding: "1rem",
        fontWeight: "bold",
        maxHeight: "3rem",
        alignItems: "center",
        color: pet?.favorite ? "#ECBE03" : "black",
      }}
    >
      <Input
        sx={{ width: "80%", border: "none" }}
        disabled={disInp}
        value={inpValue}
        onChange={(e) => {
          setInpValue(e.target.value);
        }}
      />
      <Flex
        sx={{ width: "10%", height: "2rem", cursor: "pointer" }}
        onClick={async () => {
          if (!disInp) {
            dispatch(editDogComment({ pet, index, newComment: inpValue }));
            dispatch(
              updateFavorites({
                pet,
                title: pet.title,
                comments: pet.comments.slice().splice(index, 1, inpValue),
              })
            );
          }
          setDisInp((prev) => !prev);
        }}
      >
        {disInp ? (
          <EditIcon color={pet?.favorite ? "#ECBE03" : "black"} />
        ) : (
          <SaveIcon color={pet?.favorite ? "#ECBE03" : "black"} />
        )}
      </Flex>
      {children}
    </Flex>
  );
};

export default CommentFlex;
