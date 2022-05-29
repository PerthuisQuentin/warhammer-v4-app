import { Tier } from 'models'

export default class Status {
    private _tier: Tier
	private _standing: number

    constructor(tier: Tier, standing: number) {
        this._tier = tier
        this._standing = standing
    }

    get tier(): Tier {
        return this._tier
    }

	get standing(): number {
        return this._standing
    }
}