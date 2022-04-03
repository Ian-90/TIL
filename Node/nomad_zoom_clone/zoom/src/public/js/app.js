const messageList = document.querySelector('ul')
const nikcForm = document.querySelector('#nick')
const messageForm = document.querySelector('#message')

function makeMessage(type, payload) {
  const msg = { type, payload }
  return JSON.stringify(msg)
}

const socket = new WebSocket(`ws://${window.location.host}`)

socket.addEventListener('open', () => {
  console.log('Connected to Server')
})

socket.addEventListener('message', (message) => {
  console.log('New message: ', message.data)
  const li = document.createElement('li')
  li.innerHTML = message.data
  messageList.append(li)
})

socket.addEventListener('close', () => {
  console.log('DisConnected from Server')
})

function handleSubmit(event) {
  event.preventDefault()
  const input = messageForm.querySelector('input')
  socket.send(makeMessage('new_message', input.value))
  const li = document.createElement('li')
  // li.innerText = `You: ${input.value}`
  // message.append(li)
  input.value = ''
}

function handleNickSubmit(event) {
  event.preventDefault()
  const input = nikcForm.querySelector('input')
  socket.send(makeMessage('nickname', input.value))
  input.value = ''
}

messageForm.addEventListener('submit', handleSubmit)
nikcForm.addEventListener('submit', handleNickSubmit)
