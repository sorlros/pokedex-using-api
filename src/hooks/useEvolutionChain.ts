import axios, { AxiosResponse } from "axios"
import { useQuery, UseQueryResult } from "react-query"

import { EvolutionChainResponse } from "../types"

const useEvolutionChain = (
	url?: string
): UseQueryResult<AxiosResponse<EvolutionChainResponse>, Error> =>
	useQuery(["evolution", { url }], () => (url ? axios.get(url) : null))

export default useEvolutionChain
