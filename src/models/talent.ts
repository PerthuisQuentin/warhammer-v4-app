import { Identifiable, Characteristic, Specialization } from 'models'
import { TalentMaxType } from 'types'

export default class Talent extends Identifiable {
	private _name: string
	private _lowerCaseName: string
	private _specializationName: string
	private _specializations: Specialization[]
	private _maxType: TalentMaxType
	private _maxRaw?: number
	private _maxCharacteristic?: Characteristic
	private _maxText?: string

	constructor(
		id: string,
		name: string,
		specializationName: string,
		specializations: Specialization[],
		maxType: TalentMaxType.Raw,
		maxRaw: number
	)
	constructor(
		id: string,
		name: string,
		specializationName: string,
		specializations: Specialization[],
		maxType: TalentMaxType.Characteristic,
		maxCharacteristic: Characteristic
	)
	constructor(
		id: string,
		name: string,
		specializationName: string,
		specializations: Specialization[],
		maxType: TalentMaxType.Text,
		maxText: string
	)
	constructor(
		id: string,
		name: string,
		specializationName: string,
		specializations: Specialization[],
		maxType: TalentMaxType.None
	)
    constructor(
		id: string,
		name: string,
		specializationName: string,
		specializations: Specialization[],
		maxType: TalentMaxType,
		maxValue?: number | string | Characteristic
	) {
        super(id)
        this._name = name
		this._lowerCaseName = name.toLowerCase()
		this._specializationName = specializationName
		this._specializations = specializations
		this._maxType = maxType

		switch (maxType) {
			case TalentMaxType.Raw:
				this._maxRaw = maxValue as number
				break;
			case TalentMaxType.Characteristic:
					this._maxCharacteristic = maxValue as Characteristic
					break;
			case TalentMaxType.Text:
				this._maxText = maxValue as string
				break;
		}
    }

	get name(): string {
        return this._name
    }

	nameContains(search: string) {
		return this._lowerCaseName.includes(search)
	}

	get specializationName(): string {
		return this._specializationName
	}

	get specializations(): Specialization[] {
		return this._specializations
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