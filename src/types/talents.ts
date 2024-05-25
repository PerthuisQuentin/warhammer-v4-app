import { Characteristic, Specialization } from 'models'

export enum TalentMaxType {
	Raw = 'RAW',
	Characteristic = 'CHARACTERISTIC',
	Text = 'TEXT',
	None = 'NONE',
}

export interface TalentPayload {
	id: string
	name: string
	tests?: string
	description: string
	specializationName?: string
	specializations: Specialization[]
	maxType: TalentMaxType
	maxRaw?: number
	maxCharacteristic?: Characteristic
	maxText?: string
}
