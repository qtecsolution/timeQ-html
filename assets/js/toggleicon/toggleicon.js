const hamburgerBtn = document.querySelector('.btn-hamburger')
const closeBtn = document.querySelector('#close-button')

const showHideHamburgerIcon = () => {
  hamburgerBtn.classList.add('d-none')
  closeBtn.classList.remove('d-none')
}

const showHideCloseIcon = () => {
  closeBtn.classList.add('d-none')
  hamburgerBtn.classList.remove('d-none')
}

document.addEventListener('DOMContentLoaded', () => {
  hamburgerBtn.addEventListener('click', showHideHamburgerIcon)
  closeBtn.addEventListener('click', showHideCloseIcon)
})
