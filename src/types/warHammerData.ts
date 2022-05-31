export interface IdName {
	id: string
	name: string
}

export interface CharacteristicJson extends IdName {}
export interface CategoryJson extends IdName {}
export interface RaceJson extends IdName {}
export interface TierJson extends IdName {}
export interface SpecializationJson extends IdName {}

export interface StatusJson {
	tier: string
	standing: number
} 

export interface EvolutionJson {
	name: string
	status: StatusJson
	characteristics: string[]
	skills: string[]
}

export interface CareerJson {
	id: string
	name: string
	category: string
	races: string[]
	evolutions: EvolutionJson[]
}

export interface SkillJson {
	id: string
	name: string
	characteristic: string
	base: boolean
	specializationMandatory: boolean
	specializations: SpecializationJson[]
}

export interface TalentJson {
	id: string
	name: string
	maxRaw?: number
	maxCharacteristicId?: string
	maxText?: string
}