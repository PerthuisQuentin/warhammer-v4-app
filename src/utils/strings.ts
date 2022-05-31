export const startWithVowel = (value: string) => {
	return /^[aieouâêîôûäëïöüàéèùœAIEOUÂÊÎÔÛÄËÏÖÜÀÉÈÙŒ].*/i.test(value)
}