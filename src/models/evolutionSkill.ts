import { Skill, Specialization } from 'models'

export default class EvolutionSkill {
    private _skill: Skill
    private _specializations?: Specialization[]

    constructor(skill: Skill, specialization?: Specialization[]) {
		this._skill = skill
		this._specializations = specialization
	}

    get skill(): Skill {
        return this._skill
    }

	get name(): string {
		return this._skill.name
	}

	get grouped(): boolean {
		return this._skill.grouped
	}

	get specializations(): Specialization[] | undefined {
		return this._specializations
	}

	get definedSpecialization(): boolean {
		return this.grouped && this._specializations !== undefined && this._specializations.length > 0
	}
}