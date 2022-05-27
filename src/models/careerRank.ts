import { CareerRankJsonData } from "types"

export default class CareerRank {
    private _type: string
	private _level: number

    constructor(careerRankData: CareerRankJsonData) {
        this._type = careerRankData.type
        this._level = careerRankData.level
    }

    get type(): string {
        return this._type
    }

	get level(): number {
        return this._level
    }
}