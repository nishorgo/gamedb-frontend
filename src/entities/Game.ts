import Genre from "./Genre";
import Platform from "./Platform";
import Publisher from "./Publisher";


export default interface Game {
    id: number;
    title: string;
    slug: string;
    release_date: string;
    description: string;
    background_image: string;
    genres: Genre[];
    publishers: Publisher;
    platforms: Platform[];
}
