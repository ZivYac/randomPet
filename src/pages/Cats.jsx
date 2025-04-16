import { Button, Flex, Grid, Spinner } from "theme-ui";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getRandomCat } from "../redux/slices/catSlice";
import Card from "../components/Card";

const Cats = () => {
  const dispatch = useDispatch();
  const [disableNewCat, setDisableNewCat] = useState(false);
  const { cats } = useSelector((state) => state.catSlice);
  const getRandomInt = () => Math.floor(Math.random() * 1677) + 1;

  return (
    <Layout sx={{ flexDirection: "column", overflowX: "hidden" }}>
      {" "}
      <Flex
        sx={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          sx={{
            color: "text",
            background: "buttonBackground",
            borderRadius: "1.5rem",
            width: "fit-content",
            marginX: "auto",
            marginTop: "2rem",
            fontSize: "20px",
            marginLeft: "40%",
            cursor: "pointer",
          }}
          onClick={() => {
            setDisableNewCat(true);
            setTimeout(() => {
              setDisableNewCat(false);
              const catNum = getRandomInt();
              dispatch(getRandomCat(catNum));
            }, 1500);
          }}
          disabled={disableNewCat}
        >
          {disableNewCat ? <Spinner size={20} /> : "New Cat"}
        </Button>
      </Flex>
      <Grid
        columns={5}
        sx={{
          padding: "2rem",
          overflowX: "hidden",
        }}
      >
        {cats?.map((dog, index) => (
          <Card key={index} pet={dog} index={index}></Card>
        ))}
      </Grid>
    </Layout>
  );
};

export default Cats;
