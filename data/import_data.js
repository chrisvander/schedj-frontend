/*  eslint no-restricted-syntax: "off"  */
import { EventRegister } from 'react-native-event-listeners';
import moment from 'moment';
import globals from '../globals';
import translateTerm from './translate_term';


function calculateGPA(data) {
  const grades = [];
  for (const entry in data) if (entry !== 'loaded') grades.push({ term: translateTerm(entry), content: data[entry] });
  grades.sort().reverse();
  if (grades) {
    let total = 0;
    let earned = 0;
    for (const i in grades) {
      if (Object.prototype.hasOwnProperty.call(grades, i)) {
        for (const j in grades[i].content) {
          if (Object.prototype.hasOwnProperty.call(grades[i].content, j)) {
            total += parseFloat(grades[i].content[j].GPA_HRS);
            earned += parseFloat(grades[i].content[j].POINTS);
          }
        }
      }
    }
    return Number((earned / total).toFixed(2));
  }
  return '';
}

function getNextClass() {
  for (const i in globals.SCHEDULE.today) {
    if (Object.prototype.hasOwnProperty.call(globals.SCHEDULE.today, i)) {
      const cl = globals.SCHEDULE.today[i];
      const next = moment(cl.start_time, 'h:mm a');
      if (moment().isBefore(next)) return cl;
    }
  }
  return null;
}

export default (term, reject) => {
  try {
    globals.get_next_class = getNextClass;
    globals.get_class_info = async (cl) => {
      if (globals.SCHEDULE.next_class) return globals.SCHEDULE.next_class;
      const resJson = await fetch(globals.ROUTES.class_info + cl.CRN)
        .then(res => res.json())
        .catch(() => reject());
      if (resJson) resJson.cl = cl;
      else return null;
      globals.SCHEDULE.next_class = resJson;
      return resJson;
    };
    globals.get_next_class_info = () => {
      const cl = getNextClass();
      if (cl) {
        const clinfo = globals.get_class_info(cl);
        if (clinfo) return clinfo;
      }
      return null;
    };
  } catch (err) {
    reject();
  }

  // async requests (occur in background, regardless of current screen)
  fetch(globals.ROUTES.grades, { credentials: 'include' })
    .then(res => res.json())
    .then((resJson) => {
      globals.GRADES = resJson;
      globals.GRADES.loaded = true;
      globals.GRADES.gpa = calculateGPA(globals.GRADES);
      EventRegister.emit('load_grades', globals.GRADES);
    })
    .catch(() => {
      EventRegister.emit('load_grades', null);
    });
  fetch(globals.ROUTES.holds, { credentials: 'include' })
    .then(res => res.json())
    .then((resJson) => {
      globals.HOLDS = resJson;
      EventRegister.emit('load_holds', globals.HOLDS);
    })
    .catch(() => {
      EventRegister.emit('load_holds', false);
    });

  const promises = [];
  promises.push(fetch(globals.ROUTES.address, { credentials: 'include' })
    .then(res => res.json())
    .then((resJson) => {
      globals.ADDRESS = resJson;
    }));
  promises.push(fetch(globals.ROUTES.registration + globals.TERM, { credentials: 'include' })
    .then(res => res.json())
    .then((resJson) => {
      globals.REGISTRATION = resJson;
    }));
  promises.push(fetch(globals.ROUTES.schedule_weekly, { credentials: 'include' })
    .then(res => res.json())
    .then((resJson) => {
      globals.SCHEDULE = resJson;
      globals.SCHEDULE.loaded = true;
      EventRegister.emit('load_schedule', globals.SCHEDULE);
    }));

  return Promise.all(promises).catch((err) => {
    throw new Error(err);
  });
};
