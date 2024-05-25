import { Identifiable } from 'models'

export default class Race extends Identifiable {
	private _name: string
	private _dice100: number[]
	private _characteristicsBonuses: Map<string, number>
	private _extraPoints: number

    constructor(
		id: string,
		name: string,
		dice100: number[],
		characteristicsBonuses: Map<string, number>,
		extraPoints: number,
	) {
        super(id)
        this._name = name
		this._dice100 = dice100
		this._characteristicsBonuses = characteristicsBonuses
		this._extraPoints = extraPoints
    }

	get name(): string {
        return this._name
    }

	isRollInDice100(roll: number): boolean {
		if (this._dice100.length === 1) return roll === this._dice100[0]
		if (this._dice100.length === 2) return (roll >= this._dice100[0]) && (roll <= this._dice100[1])
		return false 
	}

	get characteristicsBonuses(): Map<string, number> {
		return this._characteristicsBonuses
	}

	getCharacteristicBonus(characteristicId: string): number | undefined {
		return this._characteristicsBonuses.get(characteristicId)
	}

	getExtraPoints(): number {
		return this._extraPoints
	}
}