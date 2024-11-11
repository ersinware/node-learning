const { Readable } = require('stream')

class ArrayReadable extends Readable {
  constructor(array) {
    // binary mode
    // super()

    // string mode
    // encoding: 'UTF-8' => Converts buffer to string
    super({ encoding: 'UTF-8' })

    // object mode
    // super({ objectMode: true })

    this.array = array
    this.index = 0
  }

  _read() {
    if (this.index <= this.array.length - 1) {
      const chunk = this.array[this.index]

      // const chunk = {
      //   data: this.array[this.index],
      //   index: this.index
      // }

      // push the chunk into the stream pipeline
      this.push(chunk)
      this.index += 1
    } else
      // pushing null into the stream pipeline end the stream
      this.push(null)
  }
}

const advices = [
  'No ice for drinks? Use frozen vegetables.',
  'If you feel alone, watcha horror movie before going to be. You won\'t feel alone anymore.',
  'Don\'t have sex after chopping jalapeños',
  'If you can\'t blind them with brilliance, baffle them with nonsense',
  'Always borrow money from a pessimist, they won\'t expect it back'
]

const adviceStream = new ArrayReadable(advices)
adviceStream.on('data', (chunk) => console.log(chunk))
adviceStream.on('end', () => console.log('done!'))