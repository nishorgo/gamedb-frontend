import { Grid, GridItem, Show } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import GenreList from '../components/GenreList'
import NavBar from '../components/NavBar'

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