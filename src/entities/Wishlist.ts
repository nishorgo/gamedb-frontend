import Game from "./Game";

export default interface Wishlist {
    id: number;
    game_object: Game;
    timestamp: string;
}