import globals from "./globals.js";

export const getData = (term) => {
	console.log(" ---- ");
	var promises = [];
	promises.push(fetch(globals.ROUTES.address)
	.then(res=>res.json())
	.then(resJson=> {
		globals["ADDRESS"] = resJson;
	}));
	promises.push(fetch(globals.ROUTES.registration + globals.TERM)
	.then(res=>res.json())
	.then(resJson=> {
		globals["REGISTRATION"] = resJson;
	}));
	promises.push(fetch(globals.ROUTES.holds)
	.then(res=>res.json())
	.then(resJson=> {
		globals["HOLDS"] = resJson;
	}));
	return Promise.all(promises).catch((err) => {
		console.log(err)
	});
}