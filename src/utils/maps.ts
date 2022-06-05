import { Identifiable } from 'models'

export const buildMap = <Type>(list: Identifiable[]): Map<string, Type> => {
	const map = new Map()
	list.forEach(item => map.set(item.id, item))
	return map
}