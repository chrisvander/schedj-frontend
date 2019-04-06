const exclude = [
	'in','of','for','and','the','to'
]

const include = [
	'ai','hci','rcos'
]

function capitalize(s) {
	return s.charAt(0).toUpperCase() + s.slice(1);
}

export default (title) => {
	if (title) {
		var arr = title.toLowerCase().split(' ')
		arr.forEach((word, i) => {
			if (include.find((el) => word===el))
				arr[i] = word.toUpperCase();
			else if (!exclude.find((el) => word===el))
				arr[i] = capitalize(word); 
		});
		title = capitalize(arr.join(' '));
	}
	return title;
}