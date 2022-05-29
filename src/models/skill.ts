import { Identifiable, Characteristic, Specialization } from 'models'

export default class Skill extends Identifiable {
	private _name: string
	private _lowerCaseName: string
	private _characteristic: Characteristic
	private _base: boolean
	private _specializationMandatory: boolean
	private _specializations: Specialization[]

    constructor(
		id: string,
		name: string,
		characteristic: Characteristic,
		base: boolean,
		specializationMandatory: boolean,
		specializations: Specialization[]
	) {
        super(id)
        this._name = name
		this._lowerCaseName = name.toLowerCase()
		this._characteristic = characteristic
		this._base = base
		this._specializationMandatory = specializationMandatory
		this._specializations = specializations
    }

	get name(): string {
        return this._name
    }

	nameContains(search: string) {
		return this._lowerCaseName.includes(search)
	}

	get characteristic(): Characteristic {
		return this._characteristic
	}

	get base(): boolean {
		return this._base
	}

	get specializationMandatory(): boolean {
		return this._specializationMandatory
	}

	get specializations(): Specialization[] {
		return this._specializations
	}

	specializationNamesContains(search: string) {
		return this._specializations.some(specialization => specialization.nameContains(search))
	}

	get grouped(): boolean {
		return this.specializations.length > 0
	}
}
