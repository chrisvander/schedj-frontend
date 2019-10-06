/*  eslint no-restricted-syntax: "off"  */
import { EventRegister } from 'react-native-event-listeners';
import moment from 'moment';
import { AsyncStorage } from 'react-native';
import globals from '../globals';
import translateTerm from './translate_term';
import * as settings from './settings';

const storeSave = (key, obj) => {
  try {
    AsyncStorage.setItem(key, JSON.stringify(obj));
  } catch (err) {
    throw new Error(err);
  }
};

const storeRetrieve = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
    return null;
  } catch (err) {
    throw new Error(err);
  }
};

function timeout(ms, promise) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('timeout'));
    }, ms);
    promise.then(resolve, reject);
  });
}

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
      if (moment('9:00am', 'h:mma').isBefore(next)) return cl;
    }
  }
  return null;
}

export default () => {
  globals.get_class_info = async (cl) => {
    if (globals.SCHEDULE.loaded) return globals.SCHEDULE.next_class;
    const resJson = await fetch(globals.ROUTES.class_info + cl.CRN)
      .then(res => res.json())
      .catch(err => new Error(err));
    if (resJson instanceof Error) return null;
    if (resJson) resJson.cl = cl;
    else return null;
    globals.SCHEDULE.next_class = resJson;
    return resJson;
  };
  try {
    globals.get_next_class = getNextClass;
    globals.get_next_class_info = async () => {
      const cl = getNextClass();
      if (cl) {
        const clinfo = await globals.get_class_info(cl);
        if (clinfo) return clinfo;
      }
      return null;
    };
  } catch (err) {
    throw new Error(err);
  }

  // async requests (occur in background, regardless of current screen)
  globals.fetchGrades = () => fetch(globals.ROUTES.grades, { credentials: 'include' })
    .then(res => res.json())
    .then((resJson) => {
      globals.GRADES = resJson;
      globals.GRADES.gpa = parseFloat(globals.GRADES.gpa);
      globals.GRADES.loaded = true;
      EventRegister.emit('load_grades', globals.GRADES);
    })
    .catch(() => {
      EventRegister.emit('load_grades', null);
    });
  globals.fetchGrades();
  fetch(globals.ROUTES.holds, { credentials: 'include' })
    .then(res => res.json())
    .then((resJson) => {
      globals.HOLDS = resJson;
      EventRegister.emit('load_holds', globals.HOLDS);
    })
    .catch(() => {
      EventRegister.emit('load_holds', false);
    });

  settings.get()
    .then((res) => {
      globals.SETTINGS = res;
      globals.SETTINGS.loaded = true;
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
      const loaded = () => {
        globals.SCHEDULE.loaded = true;
        EventRegister.emit('load_schedule', globals.SCHEDULE);
      };
      globals.SCHEDULE = resJson;

      storeRetrieve('@store:colors').then((colors) => {
        if (colors) globals.SCHEDULE.colors = colors;
        else {
          globals.SCHEDULE.colors = {};
          const hslGen = () => `hsl(${360 * Math.random()},${80 + 10 * Math.random()}%,${70 + 10 * Math.random()}%)`;
          globals.SCHEDULE.clinfo.forEach(day => day.forEach((cl) => {
            if (!globals.SCHEDULE.colors[cl.CRN]) globals.SCHEDULE.colors[cl.CRN] = hslGen();
          }));
          storeSave('@store:colors', globals.SCHEDULE.colors);
        }
      }).catch(err => new Error(err));
      globals.SCHEDULE.loaded = false;
      const p = globals.get_next_class_info();
      if (!p) {
        loaded();
        return;
      }
      p.then((resJsonNext) => {
        if (resJsonNext) {
          globals.SCHEDULE.next = {
            className: resJsonNext.name,
            tags: [resJsonNext.cl.location, resJsonNext.cl.start_time],
          };
        }
      });
      const upNextReqs = [p];
      for (let i = 0; i < globals.SCHEDULE.today.length; i += 1) {
        upNextReqs.push(globals.get_class_info(globals.SCHEDULE.today[i])
          .then((res) => {
            globals.SCHEDULE.today[i] = Object.assign(globals.SCHEDULE.today[i], res);
          }));
      }
      Promise.all(upNextReqs).then(() => {
        loaded();
      }).catch(() => loaded());
    }));

  return Promise.all(promises).catch((err) => {
    throw new Error(err);
  });
};
