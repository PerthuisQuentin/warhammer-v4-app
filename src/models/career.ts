import { Identifiable } from 'models'

import { Category, Race, Evolution } from 'models'

export default class Career extends Identifiable {
    private _name: string
    private _lowerCaseName: string
    
	private _category: Category
    private _races: Race[]
	private _raceDices100: Record<string, number[] | undefined>
	private _evolutions: Evolution[]

    constructor(
		id: string,
		name: string,
		category: Category,
		races: Race[],
		raceDices100: Record<string, number[] | undefined>,
		evolutions: Evolution[]
	) {
		super(id)
        this._name = name
        this._lowerCaseName = name.toLowerCase()

        this._category = category
        this._races = races
		this._raceDices100 = raceDices100
		this._evolutions = evolutions
    }

    get name(): string {
        return this._name
    }

	nameContains(search: string) {
		return this._lowerCaseName.includes(search)
	}

    get category(): Category {
        return this._category
    }

	categoryContains(search: string) {
		return this._category.nameContains(search)
	}

	get races(): Race[] {
        return this._races
    }

	hasRace(raceId: string) {
		return this._races.some(race => race.id === raceId)
	}

	isRollInRaceDice100(raceId: string, roll: number): boolean {
		if (!this.hasRace(raceId)) return false

		const dice100 = this._raceDices100[raceId]
		if (!dice100) return false

		if (dice100.length === 1) return roll === dice100[0]
		if (dice100.length === 2) return (roll >= dice100[0]) && (roll <= dice100[1])
		return false 
	}

	get evolutions(): Evolution[] {
		return this._evolutions
	}

	evolutionNamesContains(search: string) {
		return this._evolutions.some(careerEvolution => careerEvolution.nameContains(search))
	}
}