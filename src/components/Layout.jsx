import { Flex } from "theme-ui";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children, ...props }) => {
  return (
    <Flex
      sx={{
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        background: "mainBackground",
        overflowX: "hidden",
      }}
    >
      <Header />

      <Flex {...props} sx={{ width: "100%", height: "100%", ...props.sx }}>
        {children}
      </Flex>
      <Footer />
    </Flex>
  );
};

export default Layout;
