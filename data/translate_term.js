const translations = {
	1: 'Spring',
	5: 'Summer',
	9: 'Fall'
}

export default (term_in) => {
	return translations[term_in % 100] + " " + Math.floor(term_in/100).toString();
}