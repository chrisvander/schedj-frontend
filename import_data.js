import globals from "./globals.js";

export const getData = (term) => {
	var promises = [];
	promises.push(fetch(globals.ROUTES.address)
	.then(res=>res.json())
	.then(resJson=> {
		globals["ADDRESS"] = resJson;
	}));
	return Promise.all(promises);
}