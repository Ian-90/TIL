import User from '../models/User'
import Video from '../models/Video'

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ createdAt: 'desc' })
    return res.render('home', { pageTitle: 'Home', videos })
  } catch (err) {
    return res.render('error')
  }
}
export const watch = async (req, res) => {
  const { id } = req.params
  const video = await Video.findById(id)
  const owner = await User.findById(video.owner)
  if (!video) {
    return res.status(404).render('404', { pageTitle: 'Video not found' })
  }

  return res.render('watch', { pageTitle: video.title, video, owner })
}
export const getEdit = async (req, res) => {
  const { id } = req.params
  const video = await Video.findById(id)
  if (!video) {
    return res.status(404).render('404', { pageTitle: 'Video not found' })
  }

  return res.render('edit', { pageTitle: `Editing: ${video.title}`, video })
}
export const postEdit = async (req, res) => {
  const { id } = req.params
  const { title, description, hashtags } = req.body
  const video = await Video.exists({ _id: id })
  if (!video) {
    return res.status(404).render('404', { pageTitle: 'Video not found' })
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  })
  await video.save()
  return res.redirect(`/videos/${id}`)
}

export const getUpload = (req, res) => {
  return res.render('upload', { pageTitle: 'Upload Video'})
}

export const postUpload = async (req, res) => {
  const { user: { _id } } = req.session
  const { title, description, hashtags } = req.body
  const { path: fileUrl } = req.file
  try {
    await Video.create({
      title,
      description,
      fileUrl,
      owner: _id,
      createdAt: Date.now(),
      hashtags: Video.formatHashtags(hashtags),
    })
    
    return res.redirect('/')
  } catch(err) {
    return res.status(400).render('upload', {
      pageTitle: 'Upload Video',
      errorMessage: err._message
    })
  }
}

export const deleteVideo = async (req, res) => {
  const { id } = req.params
  await Video.findByIdAndDelete(id)
  return res.redirect('/')
}

export const search = async (req, res) => {
  const { keyword } = req.query
  let videos = []
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, 'i')
      },
    })
  }
  return res.render('search', { pageTitle: 'Search', videos })
}
