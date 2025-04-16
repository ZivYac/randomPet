import { Flex, Image, Input } from "theme-ui";
import Layout from "../components/Layout";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import {
  DeleteIcon,
  EditIcon,
  PlusIcon,
  SaveIcon,
} from "../components/icons/index.js";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComment as deleteDogComment,
  addComment as addDogComment,
  editComment as editDogComment,
} from "../redux/slices/dogSlice";
import { deleteComment as deleteCatComment } from "../redux/slices/catSlice";
import { useEffect, useState } from "react";
import { update, updateFavorites } from "../redux/slices/favoritesSlice.js";
import CommentFlex from "../components/CommentFlex.jsx";

const Comments = () => {
  const { state } = useLocation();
  const { dogs } = useSelector((state) => state.dogSlice);
  const { cats } = useSelector((state) => state.catSlice);
  const pet = state.pet;
  const theDog = dogs.find((d) => d.image === pet.image);
  console.log("🚀 ~ theDog:", theDog);
  const dispatch = useDispatch();
  // const [comments, setComments] = useState(theDog?.comments);
  const [newComment, setNewComment] = useState("");
  const history = useHistory();
  const [render, setRender] = useState(0);
  console.log("🚀 ~ render:", render);

  const forceRender = () => {
    setRender((prev) => prev + 1);
  };

  useEffect(() => {
    if (!dogs.includes(pet) && !cats.includes(pet) && !pet.favorite)
      history.push("/dog");
  }, []);

  // useEffect(() => {
  //   dispatch(updateFavorites({ pet, title: pet.title, comments }));
  //   console.log(comments);
  // }, [comments]);

  // const handleDelete = (pet, index) => {
  //   console.log(index);
  //   if (pet.type === "dog") dispatch(deleteDogComment({ pet, index }));
  //   else dispatch(deleteCatComment({ pet, index }));
  //   setComments(comments.filter((item, i) => i !== index)); //deletes well, renders as delete last
  // };

  return (
    <Layout>
      <Flex sx={{ flexDirection: "column", width: "50%", margin: "1rem" }}>
        <Image
          sx={{
            border: "solid 2px",
            borderColor: pet?.favorite ? "#ECBE03" : "black",
            borderRadius: "4rem",
            width: "70%",
          }}
          src={pet?.image}
        />
        <Flex
          sx={{
            marginY: "1rem",
            width: "100%",
            fontSize: "3rem",
            fontWeight: "bold",
            flexDirection: "column",
            color: pet?.favorite ? "#ECBE03" : "black",
          }}
        >
          {pet?.title}
          <Flex
            sx={{
              fontWeight: "normal",
              fontSize: "1.5rem",
              color: pet?.favorite ? "#ECBE03" : "black",
            }}
          >
            {pet?.favorite ? "Favorite" : "Not Favorite"}
          </Flex>
        </Flex>
      </Flex>
      <Flex sx={{ flexDirection: "column", width: "50%", marginRight: "5%" }}>
        <Flex
          sx={{
            marginY: "1rem",
            width: "100%",
            fontSize: "3rem",
            justifyContent: "center",
            fontWeight: "bold",
            color: pet?.favorite ? "#ECBE03" : "black",
          }}
        >
          Comments:
        </Flex>
        {theDog?.comments?.map((comm, index) => {
          console.log("🚀 ~ comm:", index, "___________", comm);
          return (
            <CommentFlex key={index} index={index} pet={pet} comm={comm}>
              <Flex
                sx={{ width: "10%", height: "2rem", cursor: "pointer" }}
                onClick={() => {
                  console.log("________🚀 ", pet.comments);
                  const temp = theDog.comments.slice();

                  console.log("🚀 ~ {comments?.map ~ temp:", temp);
                  temp.splice(index, 1);
                  const request = {
                    ...pet,
                    comments: temp,
                  };
                  console.log(
                    "🚀 ~ {comments?.map ~ request:",
                    request.comments
                  );
                  if (pet.type === "dog")
                    dispatch(deleteDogComment({ request }));
                  else dispatch(deleteCatComment({ pet, index }));
                  // setComments(comments.filter((item, i) => i !== index));

                  forceRender();
                }}
              >
                <DeleteIcon color={pet?.favorite ? "#ECBE03" : "black"} />
              </Flex>
            </CommentFlex>
          );
        })}
        <Flex
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
            sx={{
              width: "90%",
              height: "100%",
              fontSize: "1rem",
              padding: "0.5rem",
              border: "none",
              outline: "none",
              color: pet?.favorite ? "#ECBE03" : "black",
            }}
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
          />
          <Flex
            sx={{
              width: "10%",
              height: "2rem",
              cursor: "pointer",
            }}
            onClick={() => {
              if (newComment) {
                dispatch(addDogComment({ pet, newComment }));
                // setComments([...comments, newComment]);
                setNewComment("");
              }
            }}
          >
            {pet?.favorite ? <PlusIcon color="#ECBE03" /> : <PlusIcon />}
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default Comments;
