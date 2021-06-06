import Video from '../models/Video'

export const home = async (req, res) => {
  try {
    const videos = await Video.find({})
    return res.render('home', { pageTitle: 'Home', videos })
  } catch (err) {
    return res.render('error')
  }
}
export const watch = (req, res) => {
  const { id } = req.params
  return res.render('watch', { pageTitle: `Watching: ${video.title}`, video })
}
export const getEdit = (req, res) => {
  const { id } = req.params
  return res.render('edit', { pageTitle: `Editing: ${video.title}`, video })
}
export const postEdit = (req, res) => {
  const { id } = req.params
  const { title } = req.body
  return res.redirect(`/videos/${id}`)
}

export const getUpload = (req, res) => {
  return res.render('upload', { pageTitle: 'Upload Video'})
}

export const postUpload = (req, res) => {
  const { title } = req.body
  return res.redirect('/')
}