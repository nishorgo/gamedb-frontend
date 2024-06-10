import Developer from "./Developer";
import Genre from "./Genre";
import Platform from "./Platform";
import Publisher from "./Publisher";


export default interface Game {
    id: number;
    title: string;
    slug: string;
    release_date: string;
    description: string;
    average_rating: number;
    background_image: string;
    genres: Genre[];
    publisher: Publisher;
    developer: Developer;
    platforms: Platform[];
    trailer: string;
}
