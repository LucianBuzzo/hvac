console.log('hello world')

const $num = document.getElementById('pin')
const $go = document.getElementById('go')

$go.addEventListener('click', () => {
  const pin = Number($num.value)
  console.log(Number($num.value))

  fetch('./pin/' + pin)
})
