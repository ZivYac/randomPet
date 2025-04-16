import { Flex, Input, Image } from "theme-ui";
import Layout from "../components/Layout";
import { EditIcon, ProfileIcon, SaveIcon } from "../components/icons/index.js";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min.js";
import { doLogout } from "../redux/slices/AuthSlice.js";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const [username, setUsername] = useState(localStorage.getItem("user_id", ""));
  const [email, setEmail] = useState(localStorage.getItem("email", ""));
  const [disUsernameInp, setDisUsernameInp] = useState(true);
  const [disEmailInp, setDisEmailInp] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();
  const countDogs = localStorage.getItem("dog_counter", 0);
  const countCats = localStorage.getItem("cat_counter", 0);
  const countFavs = localStorage.getItem("favorites-counter", 0);
  const [profilePic, setProfilePic] = useState(
    localStorage.getItem("profile_picture", null)
  );
  useEffect(() => {
    localStorage.setItem("profile_picture", profilePic);
  }, [profilePic]);
  return (
    <Layout sx={{ background: "mainBackground" }}>
      <Flex sx={{ width: "50%", flexDirection: "column" }}>
        <Flex>
          <Flex
            sx={{
              background: "buttonBackground",
              height: "10rem",
              width: "20%",
              border: "black solid 2px",
              borderRadius: "50%",
              alignItems: "center",
              justifyContent: "center",
              marginY: "0.25rem",
              marginX: "1%",
            }}
          >
            {profilePic ? (
              <Image
                sx={{
                  height: "9rem",
                  width: "9%",
                  borderRadius: "50%",
                  cursor: "pointer",
                  position: "absolute",
                }}
                src={profilePic}
              />
            ) : (
              <ProfileIcon />
            )}
            <Input
              sx={{
                opacity: "0",
                height: "10rem",
                width: "10%",
                borderRadius: "50%",
                cursor: "pointer",
                position: "absolute",
              }}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const url = URL.createObjectURL(file);
                  setProfilePic(url);
                }
              }}
            />
          </Flex>

          <Flex sx={{ flexDirection: "column", width: "74%", marginX: "4%" }}>
            <Flex
              sx={{
                height: "3.5rem",
                width: "100%",
                marginY: "0.75rem",
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
                  padding: "0.5rem",
                  color: "text",
                  border: "none",
                  outline: "none",
                }}
                placeholder="Username"
                value={username}
                disabled={disUsernameInp}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
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
                }}
                onClick={() => {
                  localStorage.setItem("user_id", username);
                  setDisUsernameInp((prev) => !prev);
                }}
              >
                {disUsernameInp ? <EditIcon /> : <SaveIcon />}
              </Flex>
            </Flex>

            <Flex
              sx={{
                height: "3.5rem",
                width: "100%",
                marginY: "0.75rem",
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
                  padding: "0.5rem",
                  color: "text",
                  border: "none",
                  outline: "none",
                }}
                placeholder="E-mail"
                value={email}
                disabled={disEmailInp}
                onChange={(e) => {
                  setEmail(e.target.value);
                  localStorage.setItem("email", e.target.value);
                }}
              />
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
                }}
                onClick={() => setDisEmailInp((prev) => !prev)}
              >
                {disEmailInp ? <EditIcon /> : <SaveIcon />}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex>
          <Flex
            sx={{
              padding: "1rem",
              marginY: "0.25rem",
              marginX: "1%",
              width: "63.5%",
              fontSize: "2rem",
              background: "buttonBackground",
              border: "black solid 1px",
              borderRadius: "10px",
              cursor: "pointer",
              justifyContent: "center",
            }}
            onClick={() => history.push("/favorites")}
          >
            View Your Favorites!
          </Flex>
          <Flex
            sx={{
              padding: "1rem",
              marginY: "0.25rem",
              marginX: "1%",
              width: "30%",
              fontSize: "2rem",
              background: "buttonBackground",
              border: "black solid 1px",
              borderRadius: "10px",
              cursor: "pointer",
              justifyContent: "center",
            }}
            onClick={() => dispatch(doLogout())}
          >
            Log Out
          </Flex>
        </Flex>
      </Flex>

      <Flex sx={{ width: "50%", flexDirection: "column" }}>
        <Flex sx={{ margin: "1rem", fontSize: "3rem" }}>{`Dogs Generated: ${
          countDogs || 0
        }`}</Flex>
        <Flex sx={{ margin: "1rem", fontSize: "3rem" }}>{`Cats Generated: ${
          countCats || 0
        }`}</Flex>
        <Flex sx={{ margin: "1rem", fontSize: "3rem" }}>{`Favorites Saved: ${
          countFavs || 0
        }`}</Flex>
        <Flex
          sx={{ margin: "1rem", fontSize: "3rem" }}
        >{`Total Imaged Fetched: ${
          Number(countDogs) + Number(countCats)
        }`}</Flex>
      </Flex>
    </Layout>
  );
};

export default Profile;
