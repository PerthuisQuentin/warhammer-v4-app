import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
	isCharacteristicOpen: boolean
	characteristicId: string
	isSkillOpen: boolean
	skillId: string
	isTalentOpen: boolean
	talentId: string
}

const initialState: CounterState = {
	isCharacteristicOpen: false,
	characteristicId: '',
	isSkillOpen: false,
	skillId: '',
	isTalentOpen: false,
	talentId: '',
}

export const warHammerModalsSlice = createSlice({
	name: 'warHammerModals',
	initialState,
	reducers: {
		openCharacteristic: (state, action: PayloadAction<string>) => {
			state.isCharacteristicOpen = true
			state.characteristicId = action.payload
		},
		closeCharacteristic: (state) => {
			state.isCharacteristicOpen = false
			state.characteristicId = ''
		},
		openSkill: (state, action: PayloadAction<string>) => {
			state.isSkillOpen = true
			state.skillId = action.payload
		},
		closeSkill: (state) => {
			state.isSkillOpen = false
			state.skillId = ''
		},
		openTalent: (state, action: PayloadAction<string>) => {
			state.isTalentOpen = true
			state.talentId = action.payload
		},
		closeTalent: (state) => {
			state.isTalentOpen = false
			state.talentId = ''
		},
	},
})

export const {
	openCharacteristic,
	closeCharacteristic,
	openSkill,
	closeSkill,
	openTalent,
	closeTalent,
} = warHammerModalsSlice.actions

export default warHammerModalsSlice.reducer