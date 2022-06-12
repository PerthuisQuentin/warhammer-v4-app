import { Identifiable } from 'models'

export default class Characteristic extends Identifiable {
	private _name: string
	private _abbreviation: string

    constructor(id: string, name: string, abbreviation: string) {
        super(id)
        this._name = name
		this._abbreviation = abbreviation
    }

	get name(): string {
        return this._name
    }

	get abbreviation(): string {
		return this._abbreviation
	}
}