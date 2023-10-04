const preloader = document.querySelector('#preloader')

function showHidePreloader() {
  preloader.classList.add('d-none')
}

document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', showHidePreloader)
})
