import styled from "@emotion/styled/macro"
import { Ability, Color, Type } from "../types"
import { mapColorToHex, mapTypeToHex } from "../utils"
import Abilities from "./Abilities"

const Base = styled.div`
	padding: 20px;
`

const FlavorText = styled.p`
	margin: 0 auto;
	word-break: break-word;
	font-size: 14px;
	color: #374151;
`

const TypeWrapper = styled.div<{ color: string }>`
	background-color: ${({ color }) => color};
	padding: 4px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 4px;
`

const TypeList = styled.div`
	display: flex;
	margin-top: 8px;
	${TypeWrapper} + ${TypeWrapper} {
		margin-left: 8px;
	}
`

const TypeImage = styled.img`
	height: 12px;
`

const TypeLabel = styled.span`
	margin-left: 4px;
	color: #fff;
	font-size: 10px;
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

const InfoContainerWrapper = styled.div`
	margin-top: 32px;
`

const Title = styled.h4<{ color: string }>`
	margin: 0;
	padding: 0;
	font-size: 20px;
	font-weight: bold;
	color: ${({ color }) => color};
`

const InfoContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	margin-top: 20px;
	row-gap: 12px;
`

const InfoItem = styled.div`
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
`

const InfoItemLabel = styled.span`
	font-weight: bold;
	color: #374151;
	font-size: 12px;
`

const InfoItemValue = styled.span<{ color: string }>`
	color: ${({ color }) => color};
	font-size: 12px;
`

interface Props {
	isLoading: boolean
	color?: Color
	growthRate?: string
	flavorText?: string
	genderRate?: number
	isLegendaray?: boolean
	isMythical?: boolean
	types?: Array<Type>
	weight?: number
	height?: number
	baseExp?: number
	abilities?: Array<Ability>
}

const About: React.FC<Props> = ({
	isLoading,
	color,
	growthRate,
	flavorText,
	genderRate,
	isLegendaray,
	isMythical,
	types,
	weight,
	height,
	baseExp,
	abilities,
}) => {
	const rarity = isLegendaray ? "Legendary" : isMythical ? "Mythical" : "Normal"

	return (
		<Base>
			<FlavorText>{flavorText}</FlavorText>
			<TypeList>
				{types?.map(({ type }, idx) => (
					<TypeWrapper key={idx} color={mapTypeToHex(type.name)}>
						<TypeImage src={`/assets/${type.name}.svg`} />
						<TypeLabel>{type.name.toUpperCase()}</TypeLabel>
					</TypeWrapper>
				))}
			</TypeList>
			<InfoContainerWrapper>
				<Title color={mapColorToHex(color?.name)}>Pokedex Data</Title>
				<InfoContainer>
					<InfoItem>
						<InfoItemLabel>Height</InfoItemLabel>
						<InfoItemValue color={mapColorToHex(color?.name)}>{height}</InfoItemValue>
					</InfoItem>
					<InfoItem>
						<InfoItemLabel>Weight</InfoItemLabel>
						<InfoItemValue color={mapColorToHex(color?.name)}>{weight}</InfoItemValue>
					</InfoItem>
					<InfoItem>
						<InfoItemLabel>Gender</InfoItemLabel>
						<InfoItemValue color={mapColorToHex(color?.name)}>
							{genderRate === -1 ? "Unknown" : "Male / Female"}
						</InfoItemValue>
					</InfoItem>
					<InfoItem>
						<InfoItemLabel>Growth Rate</InfoItemLabel>
						<InfoItemValue color={mapColorToHex(color?.name)}>
							{growthRate}
						</InfoItemValue>
					</InfoItem>
					<InfoItem>
						<InfoItemLabel>Base Exp</InfoItemLabel>
						<InfoItemValue color={mapColorToHex(color?.name)}>{baseExp} </InfoItemValue>
					</InfoItem>
					<InfoItem>
						<InfoItemLabel>Rarity</InfoItemLabel>
						<InfoItemValue color={mapColorToHex(color?.name)}>{rarity}</InfoItemValue>
					</InfoItem>
				</InfoContainer>
			</InfoContainerWrapper>
			{abilities && <Abilities abilities={abilities} />}
		</Base>
	)
}

export default About
