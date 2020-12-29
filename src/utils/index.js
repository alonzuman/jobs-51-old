import store from '../store';
const { theme, translation } = store.getState().theme

export * from './constants';

export const isAdmin = role => role === 'admin'
export const isModerator = role => role === 'moderator'
export const isManager = role => role === 'manager'
export const isUser = role => role === 'user'

export const roles = ['user', 'manager', 'moderator', 'admin']

export const checkPermissions = (role) => {
  switch (role) {
    case 'pending': return 0;
    case 'user': return 1;
    case 'manager': return 2;
    case 'moderator': return 3;
    case 'admin': return 4;
    default: return 0;
  }
}

export const calcHours = (startHour, endHour, date) => {
  const startHourArr = startHour.split(':')
  const endHourArr = endHour.split(':')
  const dateArr = date.split('-')

  const startDate = new Date(dateArr[0], dateArr[1] - 1, dateArr[2], startHourArr[0], startHourArr[1]);
  const endDate = new Date(dateArr[0], dateArr[1] - 1, dateArr[2], endHourArr[0], endHourArr[1])

  const ms = endDate - startDate
  const seconds = ms / 1000
  const minutes = seconds / 60
  const hours = minutes / 60
  const total = Math.round(hours * 100) / 100;
  return total
}

export const dateFilters = () => {
  const day = 86400000
  return [
    { label: 'היום', value: Date.now() - (2 * day) },
    { label: 'השבוע', value: Date.now() - (8 * day) },
    { label: 'החודש', value: Date.now() - (30 * day) },
  ]
}

export const translateDate = (date) => {
  const { weekDays, months, monthNumbers } = store.getState().theme.translation

  const fullDate = new Date(date).toString().split(' ')

  const day = weekDays[fullDate[0]]
  const month = months[fullDate[1]]
  const number = fullDate[2]
  const year = fullDate[3]
  const monthNumber = monthNumbers[fullDate[1]]

  return { day, month, number, year, monthNumber }
}

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
}

export const emailValidation = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export const passwordValidation = (password) => {
  return false;
}

export const userSecondayText = user => {
  if (user?.region) {
    return `${translation.activeVolunteer} ${user?.region ? `${translation.inRegion} ${user?.region}` : ''}`
  } else if (user?.serviceYear) {
    return `${translation.joined} ${user?.serviceYear}`
  } else if (user?.email) {
    return user?.email
  } else {
    return ''
  }
}

export const roundNumber = number => {
  if (number % 1 !== 0) {
    return number.toFixed(1)
  } else {
    return Math.round(number)
  }
}

export const shallowEqual = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }

  return true;
}

export const formatDate = (date) => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}

export const isObjectEmpty = object => {
  return Object.keys(object).length === 0 && object.constructor === Object
}

export const roundValue = (val) => {
  console.log(val);

  if (val >= 1000000) {
    const rounded = (val / 1000000).toFixed(2);
    return `${rounded}m`
  } else if (val >= 1000) {
    const rounded = (val / 1000).toFixed(2);
    return `${rounded}k`
  } else {
    return val.toFixed(2);
  }
}

export const checkProfileStrength = user => {
  let strength = 0;

  if (user.phone) {
    strength += 5
  }

  if (user.avatar) {
    strength += 1
  }

  if (user.lookingForJob) {
    strength += 5
  }

  if (user.lastPosition) {
    strength += 5
  }

  return strength;
}
