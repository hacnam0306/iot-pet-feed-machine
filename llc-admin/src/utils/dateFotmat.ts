import moment, { MomentInput } from 'moment'

export const formatDate = (date: MomentInput, format: string) => {
  return moment(date).format(format)
}
export const getPreviousMonthDate = () => {
  // Get the current date
  const currentDate = new Date()

  // Calculate the first day of the previous month
  const firstDayOfPreviousMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    1
  )

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  // Create a new date object for the first day of the current month
  const firstDayOfCurrentMonth = new Date(year, month, 1)

  // Subtract one day from the first day of the current month to get the last day of the previous month
  const lastDayOfPreviousMonth = new Date(firstDayOfCurrentMonth)
  lastDayOfPreviousMonth.setDate(lastDayOfPreviousMonth.getDate() - 1)

  return {
    first: moment(firstDayOfPreviousMonth).format('YYYY-MM-DD'),
    last: moment(lastDayOfPreviousMonth).format('YYYY-MM-DD'),
  }
}

export const getPreviousDateStepOneYear = (yearBefore = 1) => {
  // Get the current date
  const currentDate = new Date()

  // Get the current year
  const currentYear = currentDate.getFullYear()

  // Get the first day of last year
  const firstDayOfLastYear = new Date(currentYear - yearBefore, 0, 1)

  return {
    first: moment(firstDayOfLastYear).format('YYYY-MM-DD'),
    last: moment(currentDate).format('YYYY-MM-DD'),
  }
}
// 2 year before
export const formatDateCreated = (
  date: string,
  formatDate = 'MMM DD, YYYY',
  suffix = ''
) => {
  const secondsAgo = moment().diff(moment(date), 'seconds')
  if (secondsAgo < 60) {
    // If less than 1 minute ago
    const agoText = secondsAgo <= 1 ? 'second' : 'seconds'
    return `Few ${agoText} ${suffix}`
  }

  if (secondsAgo < 3600) {
    // If less than 1 hour ago
    const minutesAgo = Math.floor(secondsAgo / 60)
    const agoText = minutesAgo === 1 ? 'minute' : 'minutes'
    return `${minutesAgo} ${agoText} ${suffix}`
  }

  if (secondsAgo < 86400) {
    // If less than 1 day ago
    const hoursAgo = Math.floor(secondsAgo / 3600)
    const agoText = hoursAgo === 1 ? 'hour' : 'hours'
    return `${hoursAgo} ${agoText} ${suffix}`
  }
  // If more than 1 day ago, format as MMM DD, YYYY
  const formattedDate = moment(date).format(formatDate)
  return formattedDate
}
