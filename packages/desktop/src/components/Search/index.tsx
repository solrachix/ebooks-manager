import React from 'react'

import { Container, SearchIcon, Box, FilterOptions } from './styles'
import Input from './../Form/Input/index'

const Search: React.FC = () => {
  return (
    <Container>

      <Input
        name="search"
        icon={<SearchIcon />}
      />

      <Box>
        <header>
          <FilterOptions >All</FilterOptions>
          <FilterOptions>Movie</FilterOptions>
          <FilterOptions actived>Anime</FilterOptions>
          <FilterOptions>Anime</FilterOptions>
        </header>

      </Box>
    </Container>
  )
}

export default Search
