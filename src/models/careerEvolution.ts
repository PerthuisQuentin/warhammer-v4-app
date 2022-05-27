import { CareerEvolutionJsonData } from "types"
import { CareerRank } from 'models'

export default class CareerEvolution {
    private _name: string
    private _lowerCaseName: string
	private _rank: CareerRank

    constructor(careerEvolutionData: CareerEvolutionJsonData) {
        this._name = careerEvolutionData.name
        this._lowerCaseName = careerEvolutionData.name.toLowerCase()
		this._rank = new CareerRank(careerEvolutionData.rank)
    }

    get name(): string {
        return this._name
    }

	get rank(): CareerRank {
		return this._rank
	}
}