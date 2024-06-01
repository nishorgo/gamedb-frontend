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
    <Grid
      templateAreas={{
        base: `"main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "250px 1fr",
      }}
    >
      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
          <GenreList />
        </GridItem>
      </Show>
      <GridItem area="main">
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
      </GridItem>
    </Grid>
  );
};

export default Homepage;
