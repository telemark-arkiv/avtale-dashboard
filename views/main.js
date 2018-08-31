const html = require('choo/html')
const formatDateTime = require('../lib/format-date-time')
const TITLE = 'Dashboard avtaler'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="sans-serif pa3">
      <a data-filter="elevpc" class="f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr2${state.agreementType === 'elevpc' ? ' bg-black white' : ''}" href="#0" onclick=${setFilter}>ElevPC</a>
      <a data-filter="laeremidler" class="f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr2" href="#0" onclick=${setFilter}>Læremidler</a>
      <a data-filter="images" class="f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr2" href="#0" onclick=${setFilter}>Bilder</a>
      <div class="flex-m flex-l">
        <div class="center ba w-33-ns pa3 mr2 br3 mt3">
          <h1>Signerte avtaler</h1>
          <p class="f1 f-headline">${state.agreementsSigned}</p>
        </div>
        <div class="center ba w-33-ns pa3 mr2 br3 mt3">
          <h1>Delvis signerte avtaler</h1>
          <p class="f1 f-headline">${state.agreementsPartlySigned}</p>
        </div>
        <div class="center ba w-33-ns pa3 mr2 br3 mt3">
          <h1>Usignerte avtaler</h1>
          <p class="f1 f-headline">${state.agreementsUnsigned}</p>
        </div>
      </div>
      <div class="flex-m flex-l">
        <div class="center ba w-33-ns pa3 mr2 br3 mt3">
          <h1>Lest</h1>
          <p class="f1 f-headline">${state.read}</p>
        </div>
        <div class="center ba w-33-ns pa3 mr2 br3 mt3">
          <h1>Varslet</h1>
          <p class="f1 f-headline">${state.readNotified}</p>
        </div>
        <div class="center ba w-33-ns pa3 mr2 br3 mt3">
          <h1>Unntak</h1>
          <p class="f1 f-headline">${state.readDenied}</p>
        </div>
      </div>
      <div class="flex-m flex-l">
        <div class="center ba w-33-ns pa3 mr2 br3 mt3">
          <h1>Antall parts</h1>
          <p class="f1 f-headline">${state.total}</p>
        </div>
        <div class="center ba w-33-ns pa3 mr2 br3 mt3">
          <h1>Signerte parts</h1>
          <p class="f1 f-headline">${state.signed}</p>
        </div>
        <div class="center ba w-33-ns pa3 mr2 br3 mt3">
          <h1>Usignerte parts</h1>
          <p class="f1 f-headline">${state.unsigned}</p>
        </div>
      </div>
      <div class="flex-m flex-l">
        <div class="center ba w-33-ns pa3 mr2 br3 mt3">
          <h1>Avbrutte avtaler</h1>
          <p class="f1 f-headline">${state.agreementsCancelled}</p>
        </div>
        <div class="center ba w-33-ns pa3 mr2 br3 mt3">
          <h1>Delvis avbrutte avtaler</h1>
          <p class="f1 f-headline">${state.agreementsPartlyCancelled}</p>
        </div>
        <div class="center ba w-33-ns pa3 mr2 br3 mt3">
          <h1>Avbrutte parts</h1>
          <p class="f1 f-headline">${state.cancelled}</p>
        </div>
      </div>
      <div class="flex-m flex-l">
        <div class="center ba w-33-ns pa3 mr2 br3 mt3">
          <h1>Siste oppdatering</h1>
          <p class="f1 f-headline">${formatDateTime(state.stats.updated)}</p>
        </div>
        <div class="center ba w-33-ns pa3 mr2 br3 mt3">
          <h1>Sist sjekket</h1>
          <p class="f1 f-headline">${state.stats.checked || 0}</p>
        </div>
        <div class="center ba w-33-ns pa3 mr2 br3 mt3">
          <h1>Sist feilet</h1>
          <p class="f1 f-headline">${state.stats.errored || 0}</p>
        </div>
      </div>
    </body>
  `

  function setFilter (e) {
    e.preventDefault()
    const typeFilter = e.target.dataset.filter
    emit('update:agreementType', typeFilter)
  }
}
