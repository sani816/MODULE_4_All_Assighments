const boxen = require("boxen")


const message = "I am using my first external module!"
const title = "Hurray!!!"
const sms="unicorns love rainbows"


console.log(
  boxen(message, {
    title: title,
    padding: 1,
    margin: 1
  })
)


console.log(
  boxen(message, {
    title: title,
    padding: 1,
    margin: 1,
    borderStyle: "singleDouble"
  })
)


console.log(
  boxen(sms, {
    title: title,
    padding: 1,
    margin: 1,
    borderStyle: "round"
  })
)
