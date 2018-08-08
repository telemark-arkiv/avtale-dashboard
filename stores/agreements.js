module.exports = store

function store (state, emitter) {
  state.total = 0
  state.unsigned = 0
  state.signed = 0
  state.agreementsUnsigned = 0
  state.agreementSigned = 0
  state.agreementUnsignedSigned = 0
  state.agreementSignedUnsigned = 0

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
          })
          emitter.emit('render')
        })
        .catch((err) => {
          emitter.emit('error', err)
        })
    })
    emitter.emit('stats:update-total', false)
    emitter.emit('stats:update-total', 'signed')
    emitter.emit('stats:update-total', 'unsigned')
    emitter.emit('stats:update-agreements')
  })
}
