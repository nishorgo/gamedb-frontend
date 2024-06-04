import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { Box, Button, Flex, Grid, GridItem, HStack, Heading, Show } from '@chakra-ui/react'
import GameGrid from '../components/GameGrid'
import GameHeading from '../components/GameHeading'
import GenreList from '../components/GenreList'
import PlatformSelector from '../components/PlatformSelector'
import SortSelector from '../components/SortSelector'

const Layout = () => {
  return (
    <>
        <NavBar />
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
        <Outlet />
      </GridItem>
    </Grid>
    </>
  )
}

export default Layout