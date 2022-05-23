import { CareerJsonData } from 'types'

export default class Career {
    private _name: string
    private _lowerCaseName: string
    private _class: string
    private _lowerCaseClass: string
    private _races: string[]
    private _lowerCaseRaces: string[]

    constructor(careerData: CareerJsonData) {
        this._name = careerData.name
        this._lowerCaseName = careerData.name.toLowerCase()
        this._class = careerData.class
        this._lowerCaseClass = careerData.class.toLowerCase()
        this._races = careerData.races
        this._lowerCaseRaces = careerData.races.map(race => race.toLowerCase())
    }

    get name(): string {
        return this._name
    }

    get class(): string {
        return this._class
    }

	get races(): string[] {
        return this._races
    }

	nameContains(search: string) {
		return this._lowerCaseName.includes(search)
	}

	classContains(search: string) {
		return this._lowerCaseClass.includes(search)
	}

	racesContains(race: string) {
		return this._lowerCaseRaces.includes(race)
	}
}