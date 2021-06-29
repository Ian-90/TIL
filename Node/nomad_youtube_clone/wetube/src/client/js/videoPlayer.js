const video = document.querySelector('video')
const playBtn = document.getElementById('play')
const playBtnIcon = playBtn.querySelector('i')
const muteBtn = document.getElementById('mute')
const muteBtnIcon = muteBtn.querySelector('i')
const volumeRange = document.getElementById('volume')
const currentTime = document.getElementById('currentTime')
const totalTime = document.getElementById('totalTime')
const timeline = document.getElementById('timeline')
const fullScreenBtn = document.getElementById('fullScreen')
const fullScreenIcon = fullScreenBtn.querySelector('i')
const videoContainer = document.getElementById('videoContainer')
const videoControls = document.getElementById('videoControls')

let controlsTimeout = null
let controlsMovementTimeout = null
let volumeValue = 0.5
video.volume = volumeValue

const handlePlayClick = () => {
  if (video.paused) {
    video.play()
  } else {
    video.pause()
  }
  console.log('play click', playBtnIcon)
  playBtnIcon.classList = video.paused ? 'fas fa-play' : 'fas fa-pause'
}

const handleMute = (e) => {
  if (video.muted) {
    video.muted = false
  } else {
    video.muted = true
  }
  muteBtnIcon.classList = video.muted ? 'fas fa-volume-mute' : 'fas fa-volume-up'
  volumeRange.value = video.muted ? 0 : volumeValue
}

const handleVolumeChange = (e) => {
  const  { target: { value } } = e
  if (video.muted) {
    video.muted = true
    muteBtn.innerText = 'Mute'
  }
  
  volumeValue = value
  video.volume = value
}

const formatTime = (seconds) => new Date(seconds * 1000).toISOString().substr(14, 5)

const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration))
  timeline.max = Math.floor(video.duration)
}

const handleTimeUpdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime))
  timeline.value = Math.floor(video.currentTime)
}

const handleTimelineChange = (e) => {
  const { target: { value } } = e
  video.currentTime = value
}

const handleFullscreen = () => {
  const fullscreen = document.fullscreenElement
  if (fullscreen) {
    document.exitFullscreen()
    fullScreenIcon.classList = 'fas fa-expand'
  } else {
    videoContainer.requestFullscreen()
    fullScreenIcon.classList = 'fas fa-compress'
  }
}

const hideControls = () => videoControls.classList.remove('showing')

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout)
    controlsTimeout = null
  }

  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout)
    controlsMovementTimeout = null
  }

  videoControls.classList.add('showing')
  controlsMovementTimeout = setTimeout(hideControls, 3000)
}

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 3000)
}

const handlePlayKeyDown = (e) => {
  const { code } = e
  if (code === 'Space') {
    return handlePlayClick()
  }
}

const handleEnded = () => {
  const { id } = videoContainer.dataset
  fetch(`/api/videos/${id}/views`, {
    method: 'POST'
  })
}

playBtn.addEventListener('click', handlePlayClick)
muteBtn.addEventListener('click', handleMute)
volumeRange.addEventListener('input', handleVolumeChange)
video.addEventListener('loadeddata', handleLoadedMetadata)
video.addEventListener('timeupdate', handleTimeUpdate)
video.addEventListener('ended', handleEnded)
timeline.addEventListener('input', handleTimelineChange)
fullScreenBtn.addEventListener('click', handleFullscreen)
videoContainer.addEventListener('mousemove', handleMouseMove)
videoContainer.addEventListener('mouseleave', handleMouseLeave)
video.addEventListener('click', handlePlayClick)
document.addEventListener('keydown', handlePlayKeyDown)