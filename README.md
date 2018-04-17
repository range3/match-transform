# @range3/match-transform
line-by-line stream str.match(regexp)

## Install
``` bash
$ npm install @range3/match-transform
```

## Usage
``` js
const fs = require('fs')
const MatchTransform = require('@range3/match-transform')

const matchTransform = new MatchTransform(
  /^.*range3.*$/, // pattern
  // 'utf8' default encoding
)

fs.createReadStream(__filename)
  .pipe(matchTransform)
  .on('match', match => {
    console.log(match)
  })
  .pipe(process.stdout)
```

## License
MIT
