import ms from "ms";
import APIClient, { FetchResponse } from "../services/api-client";
import { useQuery } from "@tanstack/react-query";
import Platform from "../entities/Platform";


const apiClient = new APIClient<Platform>('/platforms/');

const usePlatforms = () => useQuery({
    queryKey: ['platforms'],
    queryFn: apiClient.getAll,
    staleTime: ms('24h'),
});

export default usePlatforms;