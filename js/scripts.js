// Retrieve elements
const $ = (el) => document.querySelector(el)
const input = $('.input-text')
const output = $('.output-text')
const encryptButton = $('#encrypt')
const decryptButton = $('#decrypt')
const copyButton = $('#copy')

// Functions
const transformText = (type, text) => {
    let transformedText = text
    const encryptkey = {
        e: 'enter',
        i: 'imes',
        a: 'ai',
        o: 'ober',
        u: 'ufat'
    }

    if (type == 'encrypt') {
        for (const k in encryptkey) {
            const regex = new RegExp(k, 'g')
            transformedText = transformedText.replace(regex, encryptkey[k])
        }
    } else if (type == 'decrypt'){
        for (const k in encryptkey) {
            const regex = new RegExp(encryptkey[k], 'g')
            transformedText = transformedText.replace(regex, k)
        }
    }

    return transformedText
}

async function writeClipboardText(text) {
    try {
        await navigator.clipboard.writeText(text)
    } catch (error) {
        console.error(error.message)
    }
}

// Event listeners
input.addEventListener('click', (e) => {
    e.target.textContent = ''
    console.log('erased')
}, {once :true})

const addButtonListener = (button, callback) => {
    button.addEventListener('click', () => {
        inputText = input.textContent.trim()
        output.innerHTML = ''
    
        const outputElement = document.createElement('p')
        outputElement.textContent = callback(inputText)
        output.appendChild(outputElement)
    
        copyButton.textContent = 'Copiar'
        copyButton.classList.remove('hide')
    })
}

addButtonListener(encryptButton, (text) => transformText('encrypt', text))
addButtonListener(decryptButton, (text) => transformText('decrypt', text))

copyButton.addEventListener('click', () => {
    writeClipboardText(output.textContent.trim())
    copyButton.textContent = 'Copiado!'

})