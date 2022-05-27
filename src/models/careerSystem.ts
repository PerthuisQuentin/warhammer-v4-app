import { CareerJsonData, CareerSystemSearchCriteria } from 'types'
import { Career } from 'models'

export default class CareerSystem {
    private _careers: Career[]
    private _careerNames: string[]
    private _careerClasses: string[]
    private _careerRaces: string[]

    constructor(careersJsonData: CareerJsonData[]) {
		this._careers = this.loadCareers(careersJsonData)
		this._careerNames = this.listCareersName(this._careers)
		this._careerClasses = this.listCareersClass(this._careers)
		this._careerRaces = this.listCareersRaces(this._careers)
    }

    get careers(): Career[] {
        return this._careers
    }

    get careerNames(): string[] {
        return this._careerNames
    }

    get careerClasses(): string[] {
        return this._careerClasses
    }

	get careerRaces(): string[] {
        return this._careerRaces
    }

	private careerVerifyCriteria(career: Career, criteria: CareerSystemSearchCriteria) {
		return (
			(career.nameContains(criteria.career) || career.evolutionNamesContains(criteria.career))
			&& career.classContains(criteria.class)
			&& (!criteria.race || career.racesContains(criteria.race))
		)
	}

	public getFilteredCareers(searchCriteria: CareerSystemSearchCriteria): Career[] {
		const criteria: CareerSystemSearchCriteria = {
			career: searchCriteria.career.toLowerCase(),
			class: searchCriteria.class.toLowerCase(),
			race: searchCriteria.race.toLowerCase()
		}

		return this._careers
			.filter(career => this.careerVerifyCriteria(career, criteria))
	}

    private loadCareers(careersJsonData: CareerJsonData[]) {
        return careersJsonData.map(careerJsonData => new Career(careerJsonData))
    }

    private listCareersName(careers: Career[]) {
        const names = new Set<string>()

        careers.forEach(career => {
            if (!names.has(career.name)) names.add(career.name)
        })

        return Array.from(names)
    }

    private listCareersClass(careers: Career[]) {
        const classes = new Set<string>()

        careers.forEach(career => {
            if (!classes.has(career.class)) classes.add(career.class)
        })

        return Array.from(classes)
    }

	private listCareersRaces(careers: Career[]) {
        const races = new Set<string>()

        careers.forEach(career => {
			career.races.forEach(race => {
				if (!races.has(race)) races.add(race)
			})
        })

        return Array.from(races)
    }
}