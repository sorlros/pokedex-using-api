import styled from "@emotion/styled/macro"
import { Ability, Color } from "../types"
import { mapColorToHex } from "../utils"
import useAbilities from "../hooks/useAbilities"

const Base = styled.div`
	margin-top: 32px;
`

const Title = styled.h4<{ color: string }>`
	margin: 0;
	padding: 0;
	font-size: 20px;
	font-weight: bold;
	color: ${({ color }) => color};
`

const ListItem = styled.li`
	display: flex;
`

const List = styled.ul`
	list-style: none;
	padding: 0;
	margin: 20px 0 0 0;
	${ListItem} + ${ListItem} {
		margin-top: 12px;
	}
`

const Label = styled.span`
	flex: 1 0 30%;
	text-transform: capitalize;
	color: #374151;
	font-size: 12px;
	font-weight: bold;
`

const Description = styled.span`
	flex: 1 0 70%;
	font-weight: 400;
	font-size: 12px;
	color: #374151;
	word-wrap: break-word;
`

interface Props {
	color?: Color
	abilities: Array<Ability>
}

const Abilities: React.FC<Props> = ({ color, abilities }) => {
	const results = useAbilities(abilities)

	return (
		<Base>
			<Title color={mapColorToHex(color?.name)}>Abilities</Title>
			<List>
				{results.map(
					({ data }, idx) =>
						data && (
							<ListItem>
								<Label>{data.data.name}</Label>
								<Description>{data.data.effect_entries[0].effect}</Description>
							</ListItem>
						)
				)}
			</List>
		</Base>
	)
}

export default Abilities
