import { Status, Characteristic, EvolutionTalent } from 'models'

export default class Evolution {
    private _name: string
    private _lowerCaseName: string

	private _status: Status
	private _characteristics: Characteristic[]
	private _talents: EvolutionTalent[]

    constructor(name: string, status: Status, characteristics: Characteristic[], talents: EvolutionTalent[]) {
        this._name = name
        this._lowerCaseName = name.toLowerCase()
		
		this._status = status
		this._characteristics = characteristics
		this._talents = talents
    }

    get name(): string {
        return this._name
    }

	get status(): Status {
		return this._status
	}

	get characteristics(): Characteristic[] {
		return this._characteristics
	}

	get talents(): EvolutionTalent[] {
		return this._talents
	}

	nameContains(search: string) {
		return this._lowerCaseName.includes(search)
	}
}