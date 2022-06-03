import { Talent, Specialization } from 'models'

export default class EvolutionTalent {
    private _talent: Talent
    private _specializations?: Specialization[]

    constructor(talent: Talent, specialization?: Specialization[]) {
		this._talent = talent
		this._specializations = specialization
	}

    get talent(): Talent {
        return this._talent
    }

	get name(): string {
		return this._talent.name
	}

	get specialized(): boolean {
		return this._talent.specialized
	}

	get specializations(): Specialization[] | undefined {
		return this._specializations
	}

	get definedSpecialization(): boolean {
		return this.specialized && this._specializations !== undefined && this._specializations.length > 0
	}
}