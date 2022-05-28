import { Identifiable, Characteristic, Race, Tier, Category, Career, Evolution, Status } from 'models'
import { CareerJson, CharacteristicJson, RaceJson, TierJson, CategoryJson, CareerSearchCriteria } from 'types'

import characteristicsFile from '../../data/characteristics.json'
import racesFile from '../../data/races.json'
import tiersFile from '../../data/tiers.json'
import categoriesFile from '../../data/categories.json'
import careersFile from '../../data/careers.json'

const characteristicsJson: CharacteristicJson[] = characteristicsFile
const racesJson: RaceJson[] = racesFile
const tiersJson: TierJson[] = tiersFile 
const categoriesJson: CategoryJson[] = categoriesFile
const careersJson: CareerJson[] = careersFile


export default class WarHammer {
	private _characteristics: Characteristic[]
	private _characteristicsById: Map<string, Characteristic>
	
	private _races: Race[]
	private _racesById: Map<string, Race>
	
	private _tiers: Tier[]
	private _tiersById: Map<string, Tier>

	private _categories: Category[]
	private _categoriesById: Map<string, Category>

	private _careers: Career[]
	private _careersById: Map<string, Career>

	constructor() {
		this._characteristics = characteristicsJson.map(characteristic => new Characteristic(characteristic.id, characteristic.name))
		this._characteristicsById = this.buildMap(this._characteristics)

		this._races = racesJson.map(race => new Race(race.id, race.name))
		this._racesById = this.buildMap(this._races)

		this._tiers = tiersJson.map(tier => new Tier(tier.id, tier.name))
		this._tiersById = this.buildMap(this._tiers)

		this._categories = categoriesJson.map(category => new Category(category.id, category.name))
		this._categoriesById = this.buildMap(this._categories)

		this._careers = this.buildCareers(careersJson)
		this._careersById = this.buildMap(this._careers)
	}

	private buildCareers(careers: CareerJson[]): Career[] {
		return careers.map(career => {
			const careerCategory = this.getCategory(career.category)
			if (!careerCategory) throw new Error(`Unknown category: ${career.category}`)

			const careerRaces = career.races.map(race => {
				const careerRace = this.getRace(race)
				if (!careerRace) throw new Error(`Unknown race: ${race}`)
				return careerRace
			})

			const careerEvolutions = this.buildCareerEvolutions(career)

			return new Career(career.id, career.name, careerCategory, careerRaces, careerEvolutions)
		})
	}

	private buildCareerEvolutions(career: CareerJson): Evolution[] {
		return career.evolutions.map(evolution => {
			const evolutionTier = this.getTier(evolution.status.tier)
			if (!evolutionTier) throw new Error(`Unknown tier: ${evolution.status.tier}`)

			const evolutionStatus = new Status(evolutionTier, evolution.status.standing)

			const evolutionCharacteristics = evolution.characteristics.map(characteristic => {
				const evolutionCharacteristic = this.getCharacteristic(characteristic)
				if (!evolutionCharacteristic) throw new Error(`Unknown characteristic: ${characteristic}`)
				return evolutionCharacteristic
			})

			return new Evolution(evolution.name, evolutionStatus, evolutionCharacteristics)
		})
	}

	private buildMap(list: Identifiable[]) {
		const map = new Map()
		list.forEach(item => map.set(item.id, item))
		return map
	}

	get characteristics(): Characteristic[] {
		return this._characteristics
	}

	public getCharacteristic(id: string): Characteristic | undefined {
		return this._characteristicsById.get(id)
	}

	get races(): Race[] {
		return this._races
	}

	public getRace(id: string): Race | undefined {
		return this._racesById.get(id)
	}

	get tiers(): Tier[] {
		return this._tiers
	}

	public getTier(id: string): Tier | undefined {
		return this._tiersById.get(id)
	}
	
	get categories(): Category[] {
		return this._categories
	}

	public getCategory(id: string): Category | undefined {
		return this._categoriesById.get(id)
	}

	get careers(): Career[] {
		return this._careers
	}

	public getCareer(id: string): Career | undefined {
		return this._careersById.get(id)
	}

	private careerVerifyCriteria(career: Career, criteria: CareerSearchCriteria) {
		const careerCriteria = (
			!criteria.career
			|| career.nameContains(criteria.career)
			|| career.evolutionNamesContains(criteria.career)
		)

		const categoryCriteria = (
			!criteria.category
			|| career.category.nameContains(criteria.category)
		)

		const raceCriteria = (
			!criteria.raceId
			|| career.hasRace(criteria.raceId)
		)

		return careerCriteria && categoryCriteria && raceCriteria
	}

	public getFilteredCareers(searchCriteria: CareerSearchCriteria): Career[] {
		const criteria: CareerSearchCriteria = {
			career: searchCriteria.career.toLowerCase(),
			category: searchCriteria.category.toLowerCase(),
			raceId: searchCriteria.raceId
		}

		return this._careers
			.filter(career => this.careerVerifyCriteria(career, criteria))
	}
}