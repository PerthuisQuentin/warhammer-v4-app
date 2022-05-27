export interface CareerJsonData {
	name: string
    class: string
	races: string[]
	evolutions: CareerEvolutionJsonData[]
}

export interface CareerEvolutionJsonData {
	name: string
    rank: CareerRankJsonData
	characteristics: string[]
}

export interface CareerRankJsonData {
	type: string
    level: number
}