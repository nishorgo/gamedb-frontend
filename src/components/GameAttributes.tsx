import { SimpleGrid, Text } from '@chakra-ui/react';
import Game from '../entities/Game';
import DefinitionItem from './DefinitionItem';

interface Props {
    game: Game;
}

const GameAttributes = ({game}: Props) => {
  return (
    <SimpleGrid columns={2} justifyContent={'space-between'}>
        <DefinitionItem term="Platforms">
          {game.platforms?.map(({ id, name }) => (
            <Text key={id}>{name}</Text>
          ))}
        </DefinitionItem>
        {/* <DefinitionItem term="Metascore">
          <CriticScore score={game.metacritic} />
        </DefinitionItem> */}

        <DefinitionItem term="Genres">
          {game.genres.map((genre) => (
            <Text key={genre.id}>{genre.name}</Text>
          ))}
        </DefinitionItem>
        <DefinitionItem term="Publishers">
            <Text key={game.publisher.id}>{game.publisher.name}</Text>
        </DefinitionItem>
        <DefinitionItem term="Developers">
            <Text key={game.developer.id}>{game.developer.name}</Text>
        </DefinitionItem>
    </SimpleGrid>
  )
}

export default GameAttributes