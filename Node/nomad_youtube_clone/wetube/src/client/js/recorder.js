import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'

const startBtn = document.getElementById('startBtn')
const video = document.getElementById('preview')

let stream
let recorder
let videoFile

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

  recorder = new MediaRecorder(stream)
  recorder.ondataavailable = (e) => {
    videoFile = URL.createObjectURL(e.data)
    video.srcObject = null
    video.src = videoFile
    video.loop = true
    video.play()
  }
  recorder.start()
}

const handleDownload = async () => {
  const ffmpeg = createFFmpeg({ log: true })
  await ffmpeg.load()

  ffmpeg.FS('writeFile', 'recording.webm', await fetchFile(videoFile))

  await ffmpeg.run('-i', 'recording.webm', '-r', '60', 'output.mp4')

  const a = document.createElement('a')
  a.href = videoFile
  a.download = 'MyRecording.webm'
  document.body.appendChild(a)
  a.click()
}

const handleStop = () => {
  startBtn.innerText = 'download Recording'
  startBtn.removeEventListener('click', handleStop)
  startBtn.addEventListener('click', handleDownload)

  recorder.stop()
}

startBtn.addEventListener('click', handleStart)