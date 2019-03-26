import { EventRegister } from 'react-native-event-listeners';
import globals from "../globals.js";

import moment from "moment";

export const getData = (term) => {
	function getNextClass() {
		for (var i in globals.SCHEDULE.today){
			var cl = globals.SCHEDULE.today[i];
			var next = moment(cl.start_time, 'h:mm a');
			if (moment().isBefore(next)) return cl;
		}
		return null;
	}

	globals.get_next_class = getNextClass;
	globals.get_class_info = async (cl) => {
		if (globals.SCHEDULE.next_class)
			return globals.SCHEDULE.next_class;
		var resJson = await fetch(globals.ROUTES.class_info + cl.CRN)
			.then(res=>res.json())
			.catch(err=>console.log(err));
		resJson["cl"] = cl;
		globals.SCHEDULE.next_class = resJson;
		return resJson;
	}
	globals.get_next_class_info = () => {
		var cl = getNextClass();
		if (cl) return globals.get_class_info(cl);
		return null;
	}

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
		globals.SCHEDULE.loaded = true;
		EventRegister.emit('load_schedule', globals.SCHEDULE);
	});
	
	return Promise.all(promises).catch((err) => {
		console.log(err)
	});
}
