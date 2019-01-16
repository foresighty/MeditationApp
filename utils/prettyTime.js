// function for formatting time with leading 0
// example finalTime = prettyTime(minutes, '0', 2) + ':' + prettyTime(seconds, '0', 2)
// https://stackoverflow.com/questions/3733227/javascript-seconds-to-minutes-and-seconds/37770048

const prettyTime = (string, pad, length) => {
  return (new Array(length + 1).join(pad) + string).slice(-length)
}

export default prettyTime
