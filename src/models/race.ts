import { Identifiable } from 'models'

export default class Race extends Identifiable {
	private _name: string
	private _dice100: number[]

    constructor(id: string, name: string, dice100: number[]) {
        super(id)
        this._name = name
		this._dice100 = dice100
    }

	get name(): string {
        return this._name
    }

	isRollInDice100(roll: number): boolean {
		if (this._dice100.length === 1) return roll === this._dice100[0]
		if (this._dice100.length === 2) return (roll >= this._dice100[0]) && (roll <= this._dice100[1])
		return false 
	}
}