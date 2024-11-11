/* in node.js, you cannot reach classes or properties which are in another file
 but you can export it */
class ExportedClass {
  constructor (first, second) {
    this.first = first
    this.second = second
  }

  memberFunction () {
    console.log('member function')
  }
}

exports.sumFunction = function (...numbers) {
  let sum = 0
  for (const number of numbers)
    sum += number
  console.log(`sum: ${sum}`)
}

exports.stringValue = 'string value'
exports.ExportedClass = ExportedClass