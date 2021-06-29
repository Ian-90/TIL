const startBtn = document.getElementById('startBtn')
const video = document.getElementById('preview')

let stream = null

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  })
  video.srcObject = stream
  video.play()
}

init()

const handleStart = () => {
  startBtn.innerText = 'Stop Recording'
  startBtn.removeEventListener('click', handleStart)
  startBtn.addEventListener('click', handleStop)

  const recorder = new MediaRecorder(stream)
  recorder.ondataavailable = (e) => console.log('recording done', e)
  console.log(recorder)
  recorder.start()
  console.log(recorder)
  setTimeout(() => {
    recorder.stop()
  }, 10000)
}

const handleStop = () => {
  startBtn.innerText = 'Start Recording'
  startBtn.removeEventListener('click', handleStop)
  startBtn.addEventListener('click', handleStart)
}

startBtn.addEventListener('click', handleStart)