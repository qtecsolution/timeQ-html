const removeButton = document.querySelector('.btn-remove')

function hideTopbar() {
  const topbar = document.querySelector('#topbar')
  topbar.classList.add('d-none')
}

document.addEventListener('DOMContentLoaded', () => {
  removeButton.addEventListener('click', hideTopbar)
})
