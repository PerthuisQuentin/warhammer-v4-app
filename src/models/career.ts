import { Identifiable } from 'models'

import { Category, Race, Evolution } from 'models'

export default class Career extends Identifiable {
    private _name: string
    private _lowerCaseName: string
    
	private _category: Category
    private _races: Race[]
	private _evolutions: Evolution[]

    constructor(id: string, name: string, category: Category, races: Race[], evolutions: Evolution[]) {
		super(id)
        this._name = name
        this._lowerCaseName = name.toLowerCase()

        this._category = category
        this._races = races
		this._evolutions = evolutions
    }

    get name(): string {
        return this._name
    }

    get category(): Category {
        return this._category
    }

	get races(): Race[] {
        return this._races
    }

	get evolutions(): Evolution[] {
		return this._evolutions
	}

	nameContains(search: string) {
		return this._lowerCaseName.includes(search)
	}

	categoryContains(search: string) {
		return this._category.nameContains(search)
	}

	hasRace(raceId: string) {
		return this._races.some(race => race.id === raceId)
	}

	evolutionNamesContains(search: string) {
		return this._evolutions.some(careerEvolution => careerEvolution.nameContains(search))
	}
}