import { Identifiable } from 'models'

export default class Specialization extends Identifiable {
	private _name: string
	private _lowerCaseName: string

    constructor(id: string, name: string) {
        super(id)
        this._name = name
		this._lowerCaseName = name.toLowerCase()
    }

	get name(): string {
        return this._name
    }

	nameContains(search: string) {
		return this._lowerCaseName.includes(search)
	}
}