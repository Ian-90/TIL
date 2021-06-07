import Video from '../models/Video'

export const home = async (req, res) => {
  try {
    const videos = await Video.find({})
    return res.render('home', { pageTitle: 'Home', videos })
  } catch (err) {
    return res.render('error')
  }
}
export const watch = async (req, res) => {
  const { id } = req.params
  const video = await Video.findById(id)
  return res.render('watch', { pageTitle: video.title, video })
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

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body
  console.log('dd', hashtags)
  try {
    await Video.create({
      title,
      description,
      createdAt: Date.now(),
      hashtags: hashtags.split(','),
    })
    
    return res.redirect('/')
  } catch(err) {
    return res.render('upload', {
      pageTitle: 'Upload Video',
      errorMessage: err._message
    })
  }
}
