const fs = require('fs')
const MatchTransform = require('../')

const matchTransform = new MatchTransform(
  /^.*create.*$/,
  // 'utf8' // default encoding
)

fs.createReadStream(__filename)
  .pipe(matchTransform)
  .on('match', match => {
    console.log(match)
  })
  .pipe(process.stdout)
