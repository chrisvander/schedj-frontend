import { EventRegister } from 'react-native-event-listeners';
import globals from "./globals.js";

export const getData = (term) => {
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

	fetch(globals.ROUTES.schedule_weekly)
	.then(res=>res.json())
	.then(resJson=> {
		globals["SCHEDULE"] = resJson;
		EventRegister.emit('load_schedule');
		globals.SCHEDULE.loaded = true;
	});
	
	return Promise.all(promises).catch((err) => {
		console.log(err)
	});
}