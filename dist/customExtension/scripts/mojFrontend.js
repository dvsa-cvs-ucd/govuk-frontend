const MOJFrontend = {}

MOJFrontend.MultiSelect = function (options) {
  this.container = document.querySelector(options.container)

  if (this.container.getAttribute('data-moj-multi-select-initialised') === 'true') {
    return
  }

  this.container.setAttribute('data-moj-multi-select-initialised', 'true')

  this.toggle = this.getToggleHtml()
  this.toggleButton = this.toggle.querySelector('input')
  this.toggleButton.addEventListener('click', this.onButtonClick.bind(this))
  this.container.appendChild(this.toggle)

  this.checkboxes = Array.from(options.checkboxes)
  this.checkboxes.forEach(checkbox => checkbox.addEventListener('click', this.onCheckboxClick.bind(this)))

  this.checked = options.checked || false
}

MOJFrontend.MultiSelect.prototype.getToggleHtml = function () {
  const wrapper = document.createElement('div')
  wrapper.className = 'govuk-checkboxes__item govuk-checkboxes--small moj-multi-select__checkbox'

  const input = document.createElement('input')
  input.type = 'checkbox'
  input.className = 'govuk-checkboxes__input'
  input.id = 'checkboxes-all'

  const label = document.createElement('label')
  label.className = 'govuk-label govuk-checkboxes__label moj-multi-select__toggle-label'
  label.setAttribute('for', 'checkboxes-all')

  const span = document.createElement('span')
  span.className = 'govuk-visually-hidden'
  span.textContent = 'Select all'

  label.appendChild(span)
  wrapper.appendChild(input)
  wrapper.appendChild(label)

  return wrapper
}

MOJFrontend.MultiSelect.prototype.onButtonClick = function () {
  if (this.checked) {
    this.uncheckAll()
    this.toggleButton.checked = false
  } else {
    this.checkAll()
    this.toggleButton.checked = true
  }
}

MOJFrontend.MultiSelect.prototype.checkAll = function () {
  this.checkboxes.forEach(el => {
    el.checked = true
  })
  this.checked = true
}

MOJFrontend.MultiSelect.prototype.uncheckAll = function () {
  this.checkboxes.forEach(el => {
    el.checked = false
  })
  this.checked = false
}

MOJFrontend.MultiSelect.prototype.onCheckboxClick = function (e) {
  if (!e.target.checked) {
    this.toggleButton.checked = false
    this.checked = false
  } else {
    if (this.checkboxes.every(checkbox => checkbox.checked)) {
      this.toggleButton.checked = true
      this.checked = true
    }
  }
}

MOJFrontend.initAll = function (options) {
  // Set the options to an empty object by default if no options are passed.
  options = typeof options !== 'undefined' ? options : {}

  // Allow the user to initialise MOJ Frontend in only certain sections of the page
  // Defaults to the entire document if nothing is set.
  const scope = typeof options.scope !== 'undefined' ? options.scope : document

  const $multiSelects = scope.querySelectorAll('[data-module="moj-multi-select"]')
  MOJFrontend.nodeListForEach($multiSelects, function ($multiSelect) {
    new MOJFrontend.MultiSelect({
      container: $multiSelect.querySelector($multiSelect.getAttribute('data-multi-select-checkbox')),
      checkboxes: $multiSelect.querySelectorAll('tbody .govuk-checkboxes__input')
    })
  })
}

MOJFrontend.initAll = function (options = {}) {
  // Default to the entire document if no scope is set
  const scope = options.scope || document

  const multiSelects = scope.querySelectorAll('[data-module="moj-multi-select"]')
  multiSelects.forEach(multiSelect => {
    new MOJFrontend.MultiSelect({
      container: multiSelect.getAttribute('data-multi-select-checkbox'),
      checkboxes: multiSelect.querySelectorAll('tbody .govuk-checkboxes__input')
    })
  })
}

window.MOJFrontend = MOJFrontend

function ready (fn) {
  if (document.readyState != 'loading') {
    fn()
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fn)
  } else {
    document.attachEvent('onreadystatechange', function () {
      if (document.readyState != 'loading') { fn() }
    })
  }
}
ready(function () {
  window.MOJFrontend.initAll()
})
