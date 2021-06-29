const startBtn = document.getElementById('startBtn')
const video = document.getElementById('preview')

let stream = null
let recorder = null

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  })
  // video.srcObject = stream
  video.play()
}

init()

const handleStart = () => {
  startBtn.innerText = 'Stop Recording'
  startBtn.removeEventListener('click', handleStart)
  startBtn.addEventListener('click', handleStop)

  recorder = new MediaRecorder(stream)
  recorder.ondataavailable = (e) => {
    const videoFile = URL.createObjectURL(e.data)
    video.srcObject = null
    video.src = videoFile
    video.loop = true
    video.play()
  }
  recorder.start()
}

const handleDownload = () => {

}

const handleStop = () => {
  startBtn.innerText = 'download Recording'
  startBtn.removeEventListener('click', handleStop)
  startBtn.addEventListener('click', handleDownload)

  recorder.stop()
}

startBtn.addEventListener('click', handleStart)