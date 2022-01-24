/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */
 
 let twoRows = [
    ["moe", "sizlak", "barkeep", 2],
    ["bartholomew", "simpson", "scamp", 3]
 ]

 let createEmployeeRecord = (empInfo) => {
    return {
        firstName: empInfo[0],
        familyName: empInfo[1],
        title: empInfo[2],
        payPerHour: empInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    }
 }
 const emp = createEmployeeRecord(["Gray", "Worm", "Security", 1])

 let createEmployeeRecords = (arrayOfEmps) => {
    return arrayOfEmps.map(empInfo => {
        return createEmployeeRecord(empInfo);
    })
 }

 const allEmps = createEmployeeRecords(twoRows)

 let createTimeInEvent = function(dateStamp) {
    let dateTimeArray = dateStamp.split(' ');
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateTimeArray[1], 10),
        date: dateTimeArray[0]
    })
    return this
 }

 let createTimeOutEvent = function(dateStamp) {
    let dateTimeArray = dateStamp.split(' ');
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateTimeArray[1], 10),
        date: dateTimeArray[0]
    })
    return this
 }

 createTimeInEvent.call(emp, '2022-01-24 1200')
 createTimeOutEvent.call(emp, '2022-01-24 1700')
 createTimeInEvent.call(emp, '2022-01-25 1200')
 createTimeOutEvent.call(emp, '2022-01-25 1600')
 createTimeInEvent.call(allEmps[0], '2022-01-24 1200')
 createTimeOutEvent.call(allEmps[0], '2022-01-24 1600')
 createTimeInEvent.call(allEmps[1], '2022-01-24 1000')
 createTimeOutEvent.call(allEmps[1], '2022-01-24 1700')

 let hoursWorkedOnDate = function(date) {
     let dateIn = this.timeInEvents.find(event => {
        return event.date === date
     })
     let dateOut = this.timeOutEvents.find(event => {
         return event.date === date
     })
     return (dateOut.hour - dateIn.hour) / 100
 }

 let wagesEarnedOnDate = function(date) {
     return hoursWorkedOnDate.call(this, date) * this.payPerHour
 }

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map((e) => {
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let findEmployeeByFirstName = (arrayOfEmps, firstName) => {
    return arrayOfEmps.find(record => {
        return record.firstName === firstName
    })
}

let calculatePayroll = (arrayOfEmps) => {
    return arrayOfEmps.reduce((memo, empRecord) => {
        return memo + allWagesFor.call(empRecord)
    }, 0)
}