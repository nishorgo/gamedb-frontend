import ms from "ms";
import APIClient, { FetchResponse } from "../services/api-client";
import { useQuery } from "@tanstack/react-query";


const apiClient = new APIClient<Platform>('/platforms/lists/parents');

export interface Platform {
    id: number;
    name: string;
    slug: string;
}

const usePlatforms = () => useQuery({
    queryKey: ['platforms'],
    queryFn: apiClient.getAll,
    staleTime: ms('24h'),
});

export default usePlatforms;