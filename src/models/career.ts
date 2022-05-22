import CareerJsonData from '../types/careerData'

export default class Career {
    private _name: string
    private _class: string
    private _races: string[]

    constructor(careerData: CareerJsonData) {
        this._name = careerData.name
        this._class = careerData.class
        this._races = careerData.races
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
		return this._name.includes(search)
	}

	classContains(search: string) {
		return this._class.includes(search)
	}

	racesContains(race: string) {
		return this._races.includes(race)
	}
}