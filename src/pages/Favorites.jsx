import { Flex, Grid, Text } from "theme-ui";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import { useEffect } from "react";
import { update, updateFavorites } from "../redux/slices/favoritesSlice";

const Favorites = () => {
  let favoritesArr = JSON.parse(localStorage.getItem("favorites-arr", null));
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.favoritesSlice);
  const { dogs } = useSelector((state) => state.dogSlice);
  useEffect(() => {
    dispatch(update());
    dogs.map((pet) => {
      dispatch(
        updateFavorites({ pet, title: pet.title, comments: pet.comments })
      );
    });
  }, []);
  useEffect(() => {
    favoritesArr = JSON.parse(localStorage.getItem("favorites-arr", null));
  }, [favorites]);

  return (
    <Layout sx={{ background: "mainBackground" }}>
      <Flex
        sx={{ flexDirection: "column", alignItems: "center", width: "100%" }}
      >
        <Flex sx={{ fontSize: "3rem" }}>Favorites</Flex>
        <Grid
          columns={5}
          sx={{
            padding: "2rem",
            overflowX: "hidden",
            width: "100%",
          }}
        >
          {favoritesArr?.map((pet, index) => {
            return <Card key={index} pet={pet} index={index} isInFav={true} />;
          })}
        </Grid>
      </Flex>
    </Layout>
  );
};

export default Favorites;
