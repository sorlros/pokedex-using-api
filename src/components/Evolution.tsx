import styled from "@emotion/styled/macro"
import { useEffect, useState } from "react"
import { Chain, Color } from "../types"
import { mapColorToHex } from "../utils"
import EvolutionStage from "./EvolutionStage"
import useEvolutionChain from "../hooks/useEvolutionChain"

const Base = styled.div`
	margin-top: 32px;
	padding: 0 20px 20px;
`

const Title = styled.h4<{ color: string }>`
	margin: 0;
	padding: 0;
	font-size: 20px;
	font-weight: bold;
	color: ${({ color }) => color};
`

const ImageWrapper = styled.div`
	width: 100%;
	height: 160px;
	display: flex;
	justify-content: center;
	align-items: center;
`

const Image = styled.img`
	width: 120px;
	height: 120px;
	object-fit: contain;
`

const List = styled.ul`
	list-style: none;
	margin: 20px 0 0 0;
	padding: 0;
	> li + li {
		margin-top: 24px;
	}
`

const EmptyWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: calc(100vh - 444px);
`

interface Props {
	isLoading: boolean
	id?: string
	color?: Color
	url?: string
}

const Empty = styled.div<{ color: string }>`
	color: ${({ color }) => color};
`

const Evolution: React.FC<Props> = ({ url, color }) => {
	const { isLoading, isError, isSuccess, data } = useEvolutionChain(url)

	const [evolutionChain, setEvolutionChain] = useState<
		Array<{
			from: { name: string; url: string }
			to: { name: string; url: string }
			level: number
		}>
	>([])

	useEffect(() => {
		const makeEvolutionChain = (chain: Chain) => {
			if (chain.evolves_to.length) {
				const [evolvesTo] = chain.evolves_to

				const from = chain.species
				const to = evolvesTo.species
				const level = evolvesTo.evolution_details[0].min_level

				setEvolutionChain((prev) => [...prev, { from, to, level }])
				makeEvolutionChain(chain.evolves_to[0])
			}
		}
		isSuccess && data && makeEvolutionChain(data.data.chain)

		return (): void => {
			setEvolutionChain([])
		}
	}, [isSuccess, data])

	return (
		<Base>
			<Title color={mapColorToHex(color?.name)}>Evolution</Title>
			{isLoading || isError ? (
				<ImageWrapper>
					<Image src="/assets/loading.gif" />
				</ImageWrapper>
			) : evolutionChain.length ? (
				<List>
					{evolutionChain.map(({ from, to, level }, idx) => (
						<EvolutionStage key={idx} level={level} from={from} to={to} color={color} />
					))}
				</List>
			) : (
				<EmptyWrapper>
					<Empty color={mapColorToHex(color?.name)}>This Pokemon does not evolve.</Empty>
				</EmptyWrapper>
			)}
		</Base>
	)
}

export default Evolution
