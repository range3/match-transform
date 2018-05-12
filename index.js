'use strict'

const { Transform } = require('stream')
const { StringDecoder } = require('string_decoder')

class MatchTransfrom extends Transform {
  constructor (pattern, encoding, options) {
    super(options)
    this.pattern = pattern
    this.encoding = encoding || 'utf8'
    this._decoder = new StringDecoder(this.encoding)
    this._lineBuffer = ''
  }

  _transform (chunk, encoding, cb) {
    this._lineBuffer += Buffer.isBuffer(chunk)
      ? this._decoder.write(chunk)
      : chunk

    // don't split by /\r$/ because the subsequent chunk may start with '\n'
    // example: "Current chunk\r", "\nNext chunk\r\n"
    const lines = this._lineBuffer.split(/\r\n|\r(?!$)|\n/)
    this._lineBuffer = lines.pop()

    this._match(lines)

    cb(null, chunk)
  }

  _flush (cb) {
    this._match(
      [this._lineBuffer.replace(/\r?\n?$/, '')])

    cb()
  }

  _match (lines) {
    if (!this.pattern) {
      return
    }

    lines.forEach(line => {
      const matched = line.match(this.pattern)
      if (matched) {
        this.emit('match', matched)
      }
    })
  }
}

module.exports = MatchTransfrom
