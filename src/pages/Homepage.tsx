import {
  Box,
  Grid,
  Show,
  GridItem,
  Flex,
  Heading,
  HStack,
  Button,
} from "@chakra-ui/react";
import GameGrid from "../components/GameGrid";
import GameHeading from "../components/GameHeading";
import GenreList from "../components/GenreList";
import PlatformSelector from "../components/PlatformSelector";
import SortSelector from "../components/SortSelector";
import { useAuthStore } from "../stores/authStore";

const Homepage = () => {
  const { isAuthenticated, username, logout } = useAuthStore();

  const handleSubmit = () => {
    logout()
  }

  return (
      <>
        <Box paddingLeft={2}>
          {isAuthenticated && (
            <HStack>
              <Heading>Hi {username}!</Heading>{" "}
              <Button onClick={handleSubmit}>Logout</Button>
            </HStack>
          )}
          <GameHeading />
          <Flex marginBottom={5}>
            <Box marginRight={5}>
              <PlatformSelector />
            </Box>
            <SortSelector />
          </Flex>
        </Box>
        <GameGrid />
      </>
  );
};

export default Homepage;
