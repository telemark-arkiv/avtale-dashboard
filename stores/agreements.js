module.exports = store

function store (state, emitter) {
  state.agreementType = 'elevpc'
  state.total = 0
  state.unsigned = 0
  state.signed = 0
  state.cancelled = 0
  state.read = 0
  state.agreementsCancelled = 0
  state.agreementsPartlySigned = 0
  state.agreementsPartlyCancelled = 0
  state.agreementsUnsigned = 0
  state.agreementsSigned = 0
  state.lastUpdated = new Date().getTime()
  state.readNotified = 0
  state.readDenied = 0
  state.stats = {}

  emitter.on('DOMContentLoaded', function () {
    emitter.on('error', function (error) {
      console.error(error)
    })
    emitter.on('stats:update-stats', function () {
      window.fetch(`https://stats.service.t-fk.no/stats/avtaler`)
        .then(res => res.json())
        .then(data => {
          if (data.length === 1) {
            state.stats = data[0]
            emitter.emit('render')
          }
        })
        .catch((err) => {
          emitter.emit('error', err)
        })
    })
    emitter.on('stats:update-total', function (status) {
      window.fetch(`https://log.avtale.service.t-fk.no/stats/total/${status || ''}?agreementType=${state.agreementType}`)
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
    emitter.on('stats:update-status', function () {
      window.fetch(`https://log.avtale.service.t-fk.no/stats/status?agreementType=${state.agreementType}`)
        .then(res => res.json())
        .then(data => {
          data.forEach(item => {
            state[item._id] = item.total
          })
          emitter.emit('render')
        })
        .catch((err) => {
          emitter.emit('error', err)
        })
    })
    emitter.on('stats:update-agreements', function () {
      window.fetch(`https://log.avtale.service.t-fk.no/stats/agreements?agreementType=${state.agreementType}`)
        .then(res => res.json())
        .then(data => {
          let partlySigned = 0
          let partlyCancelled = 0
          data.forEach(item => {
            if (item._id.join('') === 'unsigned') {
              state.agreementsUnsigned = item.total
            }
            if (item._id.join('') === 'signed') {
              state.agreementsSigned = item.total
            }
            if (['unsignedsigned', 'signedunsigned', 'signedexception', 'exceptionsigned'].includes(item._id.join(''))) {
              partlySigned += item.total
            }
            if (item._id.join('') === 'cancelled') {
              state.agreementsCancelled = item.total
            }
            if (['unsignedcancelled', 'cancelledunsigned', 'cancelledexception', 'exceptioncancelled'].includes(item._id.join(''))) {
              partlyCancelled += item.total
            }
          })
          state.agreementsPartlySigned = partlySigned
          state.agreementsPartlyCancelled = partlyCancelled
          emitter.emit('render')
        })
        .catch((err) => {
          emitter.emit('error', err)
        })
    })
    emitter.on('stats:update-read', function () {
      window.fetch(`https://log.avtale.service.t-fk.no/stats/read?agreementType=${state.agreementType}`)
        .then(res => res.json())
        .then(data => {
          let read = 0
          let readNotified = 0
          let readDenied = 0
          data.forEach(item => {
            if (['VARSLET', 'LEVERT_SDP', 'SENDT_SDP', 'SENDT_DIGITALT'].includes(item._id)) {
              readNotified += item.total
            }
            if (item._id === 'IKKE_LEVERT') {
              readDenied += item.total
            }
            if (['LEST', 'SENDT_PRINT'].includes(item._id)) {
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
    emitter.on('update:agreementType', function (type) {
      state.agreementType = type
      emitter.emit('update:all')
    })
    emitter.on('update:all', function () {
      emitter.emit('stats:update-total', false)
      emitter.emit('stats:update-stats')
      emitter.emit('stats:update-status')
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
