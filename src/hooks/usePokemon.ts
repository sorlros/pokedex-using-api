import axios, { AxiosResponse } from "axios"
import { useQueries, useQuery, UseQueryResult } from "react-query"
import { PokemonResponse } from "../types"

const pokemonApi = (id?: string) => {
	return axios.get(`https://pokeapi.co/api/v2/pokemon/${id || ""}`, { params: { limit: 151 } })
}

const usePokemon = <T>(id?: string): UseQueryResult<AxiosResponse<T>, Error> =>
	useQuery(id ? ["pokemon", id] : "pokemon", () => pokemonApi(id))

export const usePokemonQuries = (
	names: string[]
): Array<UseQueryResult<AxiosResponse<PokemonResponse>, Error>> => {
	const quries = names.map((name, idx) => ({
		queryKey: ["evolution", `${name}_${idx}`],
		queryFn: () => pokemonApi(name),
	}))
	return useQueries(quries) as Array<UseQueryResult<AxiosResponse<PokemonResponse>, Error>>
}

export default usePokemon
