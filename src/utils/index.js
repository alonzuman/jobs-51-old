export const checkPermissions = (role) => {
  switch (role) {
    case 'user': return 1;
    case 'volunteer': return 2;
    case 'manager': return 3;
    case 'moderator': return 4;
    case 'admin': return 5;
    default: return 1;
  }
}

export const calcHours = (startHour, endHour, date) => {
  const startHourArr = startHour.split(':')
  const endHourArr = endHour.split(':')
  const dateArr = date.split('-')

  const startDate = new Date(dateArr[0], dateArr[1] - 1, dateArr[2], startHourArr[0], startHourArr[1]);
  const endDate = new Date(dateArr[0], dateArr[1] - 1, dateArr[2], endHourArr[0], endHourArr[1])

  const ms = endDate - startDate
  const seconds = ms / 1000 // Convert to seconds
  const minutes = seconds / 60
  const hours = minutes / 60
  const total = Math.round(hours * 100) / 100;
  return total
}
