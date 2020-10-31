import store from '../store';
const { theme } = store.getState().theme

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

export const activityTypeColor = (type) => {
  if (theme) {
    switch (type) {
      case 'עידוד לשירות משמעותי': return '#4caf50';
      case 'אירוע עמותה': return '#009688';
      case 'ליווי קשישים וניצולי שואה': return '#1de9b6';
      case 'אירוע שיא': return '#ff9800';
      default: return `${theme?.palette?.primary?.main}`
    }
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
  const { weekDays, months } = store.getState().theme.translation

  const fullDate = new Date(date).toString().split(' ')

  const day = weekDays[fullDate[0]]
  const month = months[fullDate[1]]
  const number = fullDate[2]

  return [day, month, number]
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
