const $ = (el) => document.querySelector(el)

const input = $('.input-text')

let firstClick = false
input.addEventListener('click', (e) => {
    e.target.textContent = ''
    console.log('erased')
}, {once :true})
