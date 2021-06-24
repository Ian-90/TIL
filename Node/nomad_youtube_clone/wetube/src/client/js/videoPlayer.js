const video = document.querySelector('video')
const playBtn = document.getElementById('play')
const muteBtn = document.getElementById('mute')
const volumeRange = document.getElementById('volume')
const currentTime = document.getElementById('currentTime')
const totalTime = document.getElementById('totalTime')

let volumeValue = 0.5
video.volume = volumeValue

const handlePlayClick = (e) => {
  if (video.paused) {
    video.play()
  } else {
    video.pause()
  }
  playBtn.innerText = video.pause ? 'Play' : 'Pause'
}

const handleMute = (e) => {
  if (video.muted) {
    video.muted = false
  } else {
    video.muted = true
  }
  muteBtn.innerText = video.muted ? 'Unmute' : 'Mute'
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

const formatTime = (seconds) => new Date(seconds * 1000).toISOString().substr(11, 8)

const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration))
}

const handleTimeUpdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime))
}

playBtn.addEventListener('click', handlePlayClick)
muteBtn.addEventListener('click', handleMute)
volumeRange.addEventListener('input', handleVolumeChange)
video.addEventListener('loadedmetadata', handleLoadedMetadata)
video.addEventListener('timeupdate', handleTimeUpdate)