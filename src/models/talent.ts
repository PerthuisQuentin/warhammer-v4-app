import { Identifiable, Characteristic, Specialization } from 'models'
import { TalentMaxType, TalentPayload } from 'types'
import { buildMap } from 'utils'

export default class Talent extends Identifiable {
	private _name: string
	private _lowerCaseName: string
	private _tests?: string
	private _description: string
	private _specializationName?: string
	private _specializations: Specialization[]
	private _specializationsById: Map<string, Specialization>
	private _maxType: TalentMaxType
	private _maxRaw?: number
	private _maxCharacteristic?: Characteristic
	private _maxText?: string

    constructor(talentPayload: TalentPayload) {
        super(talentPayload.id)
        this._name = talentPayload.name
		this._lowerCaseName = talentPayload.name.toLowerCase()
		this._tests = talentPayload.tests
		this._description = talentPayload.description
		this._specializationName = talentPayload.specializationName
		this._specializations = talentPayload.specializations
		this._specializationsById = buildMap(this._specializations)
		this._maxType = talentPayload.maxType
		this._maxRaw = talentPayload.maxRaw
		this._maxCharacteristic = talentPayload.maxCharacteristic
		this._maxText = talentPayload.maxText
    }

	get name(): string {
        return this._name
    }

	nameContains(search: string) {
		return this._lowerCaseName.includes(search)
	}

	get tests(): string | undefined {
		return this._tests
	}

	get description(): string {
		return this._description
	}

	get specializationName(): string | undefined {
		return this._specializationName
	}

	get specializations(): Specialization[] {
		return this._specializations
	}

	public getSpecialization(id: string): Specialization | undefined {
		return this._specializationsById.get(id)
	}

	get specialized(): boolean {
		return this.specializations.length > 0
	}

	get maxType(): TalentMaxType {
		return this._maxType
	}

	get maxRaw(): number | undefined {
		return this._maxRaw
	}

	get maxCharacteristic(): Characteristic | undefined {
		return this._maxCharacteristic
	}

	get maxText(): string | undefined {
		return this._maxText
	}
}