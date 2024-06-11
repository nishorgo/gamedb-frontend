import Game from "./Game";

export default interface Review {
    id: number;
    username: string;
    game_id: number;
    game_title: string;
    rating: number;
    review_title: string;
    review_body: string;
    timestamp: string;
}