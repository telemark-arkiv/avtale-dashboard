module.exports = store

function store (state, emitter) {
  state.total = 0
  state.unsigned = 0
  state.signed = 0
  state.cancelled = 0
  state.read = 0
  state.agreementsCancelled = 0
  state.agreementsUnsigned = 0
  state.agreementSigned = 0
  state.agreementUnsignedSigned = 0
  state.agreementSignedUnsigned = 0
  state.agreementCancelledUnsigned = 0
  state.agreementUnsignedCancelled = 0
  state.lastUpdated = new Date().getTime()
  state.readNotified = 0
  state.readDenied = 0

  emitter.on('DOMContentLoaded', function () {
    emitter.on('stats:update-total', function (status) {
      window.fetch(`https://log.avtale.service.t-fk.no/stats/total/${status || ''}`)
        .then(res => res.json())
        .then(data => {
          if (status) {
            state[status] = data.total
          } else {
            state.total = data.total
          }
          emitter.emit('render')
        })
        .catch((err) => {
          emitter.emit('error', err)
        })
    })
    emitter.on('stats:update-agreements', function () {
      window.fetch(`https://log.avtale.service.t-fk.no/stats/agreements`)
        .then(res => res.json())
        .then(data => {
          data.forEach(item => {
            if (item._id.join('') === 'unsigned') {
              state.agreementsUnsigned = item.total
            }
            if (item._id.join('') === 'signed') {
              state.agreementSigned = item.total
            }
            if (item._id.join('') === 'unsignedsigned') {
              state.agreementUnsignedSigned = item.total
            }
            if (item._id.join('') === 'signedunsigned') {
              state.agreementSignedUnsigned = item.total
            }
            if (item._id.join('') === 'cancelled') {
              state.agreementsCancelled = item.total
            }
            if (item._id.join('') === 'unsignedcancelled') {
              state.agreementUnsignedCancelled = item.total
            }
            if (item._id.join('') === 'cancelledunsigned') {
              state.agreementCancelledUnsigned = item.total
            }
          })
          emitter.emit('render')
        })
        .catch((err) => {
          emitter.emit('error', err)
        })
    })
    emitter.on('stats:update-read', function () {
      window.fetch(`https://log.avtale.service.t-fk.no/stats/read`)
        .then(res => res.json())
        .then(data => {
          let read = 0
          let readNotified = 0
          let readDenied = 0
          data.forEach(item => {
            if (item._id === 'VARSLET') {
              readNotified += item.total
            }
            if (item._id === 'LEVERT_SDP') {
              readNotified += item.total
            }
            if (item._id === 'SENDT_SDP') {
              readNotified += item.total
            }
            if (item._id === 'IKKE_LEVERT') {
              readDenied += item.total
            }
            if (item._id === 'LEST') {
              read += item.total
            }
          })
          state.read = read
          state.readNotified = readNotified
          state.readDenied = readDenied
          emitter.emit('render')
        })
        .catch((err) => {
          emitter.emit('error', err)
        })
    })
    emitter.on('update:all', function () {
      emitter.emit('stats:update-total', false)
      emitter.emit('stats:update-total', 'signed')
      emitter.emit('stats:update-total', 'unsigned')
      emitter.emit('stats:update-total', 'cancelled')
      emitter.emit('stats:update-agreements')
      emitter.emit('stats:update-read')
    })
    emitter.emit('update:all')
    setInterval(function () {
      const now = new Date().getTime()
      if (now - state.lastUpdated > 60000) {
        state.lastUpdated = now
        emitter.emit('update:all')
      }
    }, 600000)
  })
}
