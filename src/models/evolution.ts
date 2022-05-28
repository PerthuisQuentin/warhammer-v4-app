import { Status, Characteristic } from 'models'

export default class Evolution {
    private _name: string
    private _lowerCaseName: string

	private _status: Status
	private _characteristics: Characteristic[]

    constructor(name: string, status: Status, characteristics: Characteristic[]) {
        this._name = name
        this._lowerCaseName = name.toLowerCase()
		
		this._status = status
		this._characteristics = characteristics
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

	nameContains(search: string) {
		return this._lowerCaseName.includes(search)
	}
}