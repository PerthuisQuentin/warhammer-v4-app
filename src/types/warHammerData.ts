export interface IdName {
	id: string
	name: string
}

export interface CharacteristicJson extends IdName {
	abbreviation: string
}

export interface CategoryJson extends IdName {}
export interface TierJson extends IdName {}
export interface SpecializationJson extends IdName {}

export interface RaceJson extends IdName {
	dice100: number[]
	characteristicsBonuses: Record<string, number>
}

export interface StatusJson {
	tier: string
	standing: number
} 

export interface EvolutionTalentJson {
	id: string
	specializationIds?: string[]
}

export interface EvolutionSkillJson {
	id: string
	specializationIds?: string[]
}

export interface EvolutionJson {
	name: string
	status: StatusJson
	characteristics: string[]
	skills: EvolutionSkillJson[]
	talents: EvolutionTalentJson[]
	possessions: string[]
}

export interface CareerJson {
	id: string
	name: string
	category: string
	races: string[]
	raceDices100: Record<string, number[] | undefined>
	evolutions: EvolutionJson[]
}

export interface SkillJson {
	id: string
	name: string
	description: string
	characteristic: string
	base: boolean
	specializationMandatory: boolean
	specializations: SpecializationJson[]
}

export interface TalentJson {
	id: string
	name: string
	tests?: string
	description: string
	maxRaw?: number
	maxCharacteristicId?: string
	maxText?: string
	specializationName?: string
	specializations?: SpecializationJson[]
}