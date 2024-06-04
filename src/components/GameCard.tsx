import { Card, CardBody, HStack, Heading, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Game from "../entities/Game";
import CriticScore from "./CriticScore";
import PlatformIconList from "./PlatformIconList";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  return (
    <Card>
      <Image src={game.background_image} />
      <CardBody>
        <HStack justifyContent={"space-between"} marginBottom={1}>
          <PlatformIconList
            platforms={game.platforms}
          />
        </HStack>
        <Heading fontSize="2xl">
          <Link to={"/games/" + game.id}>{game.title}</Link>
        </Heading>
      </CardBody>
    </Card>
  );
};

export default GameCard;
