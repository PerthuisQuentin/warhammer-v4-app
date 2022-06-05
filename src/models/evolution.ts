import { Status, Characteristic, EvolutionSkill, EvolutionTalent } from 'models'

export default class Evolution {
    private _name: string
    private _lowerCaseName: string

	private _status: Status
	private _characteristics: Characteristic[]
	private _skills: EvolutionSkill[]
	private _talents: EvolutionTalent[]
	private _possessions: string[]

    constructor(
		name: string,
		status: Status,
		characteristics: Characteristic[],
		skills: EvolutionSkill[],
		talents: EvolutionTalent[],
		possessions: string[]
	) {
        this._name = name
        this._lowerCaseName = name.toLowerCase()
		
		this._status = status
		this._characteristics = characteristics
		this._skills = skills
		this._talents = talents
		this._possessions = possessions
    }

    get name(): string {
        return this._name
    }

	get status(): Status {
		return this._status
	}

	get characteristics(): Characteristic[] {
		return this._characteristics
	}

	get skills(): EvolutionSkill[] {
		return this._skills
	}

	get talents(): EvolutionTalent[] {
		return this._talents
	}

	get possessions(): string[] {
		return this._possessions
	}

	nameContains(search: string) {
		return this._lowerCaseName.includes(search)
	}
}