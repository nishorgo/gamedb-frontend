import { HStack, Heading, theme } from "@chakra-ui/react";
import "@fontsource/anton";
import { ChakraProvider } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";

const NavBar = () => {
  return (
    <ChakraProvider theme={theme}>
      <HStack padding="15px">
        <Link to={"/"}>
          <Heading
            marginEnd="10"
            fontFamily="Anton"
            letterSpacing="widest"
            fontSize="5xl"
            color="teal.300"
            _hover={{ color: "#B2F5EA" }}
          >
            GAMEDB
          </Heading>
        </Link>
        <SearchInput />
        <ColorModeSwitch />
      </HStack>
    </ChakraProvider>
  );
};

export default NavBar;
