import Layout from "../components/Layout";
import { Button, Flex, Grid, Spinner } from "theme-ui";
import { useDispatch, useSelector } from "react-redux";
import { getRandomDog, addDog } from "../redux/slices/dogSlice";
import { useState } from "react";
import Card from "../components/Card";

const Dogs = () => {
  const dispatch = useDispatch();
  const [disableNewDog, setDisableNewDog] = useState(false);
  const { dogs, loading } = useSelector((state) => state.dogSlice);
  return (
    <Layout sx={{ flexDirection: "column", overflowX: "hidden" }}>
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
            background:
              loading || disableNewDog ? "disabledButton" : "buttonBackground",
            borderRadius: "1.5rem",
            width: "10rem",
            marginX: "auto",
            marginTop: "2rem",
            fontSize: "20px",
            marginLeft: "40%",
            cursor: "pointer",
          }}
          onClick={() => {
            setDisableNewDog(true);
            setTimeout(() => {
              setDisableNewDog(false);
              dispatch(getRandomDog());
            }, 1500);
          }}
          disabled={loading || disableNewDog}
        >
          {loading || disableNewDog ? <Spinner size={20} /> : "New Dog"}
        </Button>
      </Flex>
      <Grid
        columns={5}
        sx={{
          padding: "2rem",
          overflowX: "hidden",
        }}
      >
        {dogs?.map((dog, index) => (
          <Card key={index} pet={dog} index={index} />
        ))}
      </Grid>
    </Layout>
  );
};

export default Dogs;
