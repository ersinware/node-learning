/* if you need these exports -> moduleOne, moduleTwo, moduleThree
 then do this -> moduleAll (contains moduleOne, moduleTwo, moduleThree)
 and get the moduleAll where you need the modules */

const moduleOne = require('./moduleOne')
moduleOne.sumFunction(10, 30)
console.log(`string value: ${moduleOne.stringValue}`)

const exportedObject = new moduleOne.ExportedClass('first', 'second')
console.log(exportedObject.first)
console.log(exportedObject.second)
exportedObject.memberFunction()