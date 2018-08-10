var html = require('choo/html')

var TITLE = 'Dashboard avtaler'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="sans-serif pa3">
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
    </body>
  `
}
