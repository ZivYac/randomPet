import { FormattedMessage } from "react-intl";
import { Image, Flex, Text, ThemeProvider } from "theme-ui";

import pi_header from "../assets/images/pi_header.png";
import LanguageSwitch from "./LanguageSwitch";
import MyButton from "./MyButton";

import { doLogout } from "../redux/slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";

import { useColorMode } from "theme-ui";
import { theme } from "../common/theme";
import DogIcon from "./icons/DogIcon";
import CatIcon from "./icons/CatIcon";
import ProfileIcon from "./icons/ProfileICon";
import StarIcon from "./icons/StarIcon";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Header = () => {
  const dispatch = useDispatch();
  const [colorMode, setColorMode] = useColorMode();
  const history = useHistory();
  const MenuItem = ({ Icon, path }) => {
    return (
      <Flex
        sx={{
          width: "4rem",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={() => history.push("/" + path)}
      >
        <Icon />
        <Text>{path}</Text>
      </Flex>
    );
  };

  return (
    <Flex
      id="Pi_Flex"
      sx={{
        backgroundColor: "headerFooter",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        height: "141px",
        py: "10px",
      }}
    >
      <Flex
        sx={{
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text color="text" sx={{ width: "auto" }}>
          <FormattedMessage
            id="lbl.formateDate"
            values={{ dateParam: new Date() }}
          />
        </Text>
        <LanguageSwitch sx={{ width: "10rem" }} />
      </Flex>

      <MenuItem Icon={DogIcon} path="dog" />
      <MenuItem Icon={CatIcon} path="cat" />
      <MenuItem Icon={ProfileIcon} path="profile" />
      <MenuItem Icon={StarIcon} path="favorites" />

      <Flex
        sx={{
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MyButton
          id="LogOut"
          sx={{
            color: "text",
            backgroundColor: "buttonBackground",
            width: "auto",
            whiteSpace: "nowrap",
          }}
          onClick={() => {
            dispatch(doLogout());
            localStorage.clear();
            sessionStorage.clear();
            dispatch({ type: "auth/setLoggedIn", payload: false });
          }}
        >
          <FormattedMessage id="lbl.logout" />
        </MyButton>

        <MyButton
          sx={{
            color: "text",
            backgroundColor: "buttonBackground",
            width: "auto",
            whiteSpace: "nowrap",
          }}
          onClick={() => {
            setColorMode(colorMode === "light" ? "dark" : "light");
          }}
        >
          {colorMode === "light" ? (
            <FormattedMessage id="lbl.theme_button_light" />
          ) : (
            <FormattedMessage id="lbl.theme_button_dark" />
          )}
        </MyButton>
      </Flex>
    </Flex>
  );
};

export default Header;
