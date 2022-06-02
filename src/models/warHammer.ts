import {
	Career,
	Category,
	Characteristic,
	Evolution,
	Identifiable,
	Race,
	Skill,
	Specialization,
	Status,
	Talent,
	Tier,
} from 'models'
import {
	CareerJson,
	CareerSearchCriteria,
	CategoryJson,
	CharacteristicJson,
	RaceJson,
	SkillJson,
	SkillSearchCriteria,
	TalentJson,
	TalentMaxType,
	TalentSearchCriteria,
	TierJson,
} from 'types'

import characteristicsFile from '../../data/characteristics.json'
import racesFile from '../../data/races.json'
import tiersFile from '../../data/tiers.json'
import categoriesFile from '../../data/categories.json'
import careersFile from '../../data/careers.json'
import skillsFile from '../../data/skills.json'
import talentsFile from '../../data/talents.json'

const characteristicsJson: CharacteristicJson[] = characteristicsFile
const racesJson: RaceJson[] = racesFile
const tiersJson: TierJson[] = tiersFile 
const categoriesJson: CategoryJson[] = categoriesFile
const careersJson: CareerJson[] = careersFile
const skillsJson: SkillJson[] = skillsFile
const talentsJson: TalentJson[] = talentsFile

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

	private _skills: Skill[]
	private _skillsById: Map<string, Skill>

	private _talents: Talent[]
	private _talentsById: Map<string, Talent>

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

		this._skills = this.buildSkills(skillsJson)
		this._skillsById = this.buildMap(this._skills)

		this._talents = this.buildTalents(talentsJson)
		this._talentsById = this.buildMap(this._talents)
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

	private buildSkills(skills: SkillJson[]): Skill[] {
		return skills.map(skill => {
			const skillCharacteristic = this.getCharacteristic(skill.characteristic)
			if (!skillCharacteristic) throw new Error(`Unknown characteristic: ${skill.characteristic}`)

			const skillSpecializations = skill.specializations.map(specialization => {
				return new Specialization(specialization.id, specialization.name)
			})

			return new Skill(skill.id, skill.name, skillCharacteristic, skill.base, skill.specializationMandatory, skillSpecializations)
		})
	}

	private buildTalents(talents: TalentJson[]): Talent[] {
		return talents.map(talent => {
			const specializationName = talent.specializationName ?? ''

			const talentSpecializations = talent.specializations
				? talent.specializations.map(specialization => {
					return new Specialization(specialization.id, specialization.name)
				})
				: []

			if (talent.maxRaw) {
				return new Talent(talent.id, talent.name, specializationName, talentSpecializations, TalentMaxType.Raw, talent.maxRaw)
			} else if (talent.maxCharacteristicId) {
				const talentCharacteritic = this.getCharacteristic(talent.maxCharacteristicId)
				if (!talentCharacteritic) throw new Error(`Unknown characteristic: ${talent.maxCharacteristicId}`)

				return new Talent(talent.id, talent.name, specializationName, talentSpecializations, TalentMaxType.Characteristic, talentCharacteritic)
			} else if (talent.maxText) {
				return new Talent(talent.id, talent.name, specializationName, talentSpecializations, TalentMaxType.Text, talent.maxText)
			} else {
				return new Talent(talent.id, talent.name, specializationName, talentSpecializations, TalentMaxType.None)
			}
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

	get skills(): Skill[] {
		return this._skills
	}

	public getSkill(id: string): Skill | undefined {
		return this._skillsById.get(id)
	}

	get talents(): Talent[] {
		return this._talents
	}

	public getTalent(id: string): Talent | undefined {
		return this._talentsById.get(id)
	}

	private careerVerifyCriteria(career: Career, criteria: CareerSearchCriteria): boolean {
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

	private skillVerifyCriteria(skill: Skill, criteria: SkillSearchCriteria): boolean {
		const searchCriteria = (
			!criteria.search
			|| skill.nameContains(criteria.search)
			|| skill.specializationNamesContains(criteria.search)
		)

		const characteristicCriteria = (
			!criteria.characteristicId
			|| skill.characteristic.id === criteria.characteristicId
		)

		return searchCriteria && characteristicCriteria
	}

	public getFilteredSkills(searchCriteria: SkillSearchCriteria): Skill[] {
		const criteria: SkillSearchCriteria = {
			search: searchCriteria.search.toLowerCase(),
			characteristicId: searchCriteria.characteristicId
		}

		return this._skills
			.filter(skill => this.skillVerifyCriteria(skill, criteria))
	}

	private talentVerifyCriteria(talent: Talent, criteria: TalentSearchCriteria): boolean {
		const searchCriteria = (
			!criteria.search
			|| talent.nameContains(criteria.search)
		)

		return searchCriteria
	}

	public getFilteredTalents(searchCriteria: TalentSearchCriteria): Talent[] {
		const criteria: TalentSearchCriteria = {
			search: searchCriteria.search.toLowerCase()
		}

		return this._talents
			.filter(talent => this.talentVerifyCriteria(talent, criteria))
	}
}