const buttonSwitch = document.querySelector('#btn-switch')

function toggleSwitch() {
  if (buttonSwitch.classList.contains('active')) {
    this.classList.remove('active')
  } else {
    this.classList.add('active')
  }
}

buttonSwitch.addEventListener('click', toggleSwitch)
