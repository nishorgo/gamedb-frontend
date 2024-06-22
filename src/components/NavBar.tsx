import { HStack, Heading, theme } from "@chakra-ui/react";
import "@fontsource/anton";
import { ChakraProvider } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import { useAuthStore } from "../stores/authStore";

const NavBar = () => {
  const { isAuthenticated, username, logout } = useAuthStore();


  return (
    <ChakraProvider theme={theme}>
      <HStack padding="15px">
        <Link to={"/"}>
          <Heading
            marginEnd={10}
            fontFamily="Anton"
            letterSpacing="widest"
            fontSize="5xl"
            color="teal.300"
            _hover={{ color: "#B2F5EA" }}
          >
            GAMEDB
          </Heading>
        </Link>
        <Link to={"/wishlist"}>
          <Heading
            marginEnd="5"
            fontFamily="Anton"
            letterSpacing="wide"
            fontSize="2xl"
            color="white"
            _hover={{ color: "#B2F5EA" }}
          >
            WISHLIST
          </Heading>
        </Link>
        <Link to={"/my-reviews"}>
          <Heading
            marginEnd="5"
            fontFamily="Anton"
            letterSpacing="wide"
            fontSize="2xl"
            color="white"
            _hover={{ color: "#B2F5EA" }}
          >
            REVIEWS
          </Heading>
        </Link>
        {
          isAuthenticated ?
          <Link to={"/"}>
            <Heading
              onClick={() => logout()}
              marginEnd="10"
              fontFamily="Anton"
              letterSpacing="wide"
              fontSize="2xl"
              color="white"
              _hover={{ color: "#B2F5EA" }}
            >
              LOGOUT
            </Heading>
          </Link> : 
          <Link to={"/login"}>
            <Heading
              marginEnd="10"
              fontFamily="Anton"
              letterSpacing="wide"
              fontSize="2xl"
              color="white"
              _hover={{ color: "#B2F5EA" }}
            >
              LOGIN
            </Heading>
          </Link>
        }
        <SearchInput />
        <ColorModeSwitch />
      </HStack>
    </ChakraProvider>
  );
};

export default NavBar;
