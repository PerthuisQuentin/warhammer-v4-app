import { Identifiable } from 'models'

export default class Race extends Identifiable {
	private _name: string

    constructor(id: string, name: string) {
        super(id)
        this._name = name
    }

	get name(): string {
        return this._name
    }
}