const fakeUser = {
  username: 'Ian',
  loggedIn: false,
}


export const trending = (req, res) => {
  const videos = [
    {
      title: 'First Video',
      rating: 5,
      comments: 2,
      createdAt: '2 minutes ago',
      views: 59,
      id: 5
    },
    {
      title: 'Second Video',
      rating: 5,
      comments: 2,
      createdAt: '2 minutes ago',
      views: 59,
      id: 5
    },
    {
      title: 'Third Video',
      rating: 5,
      comments: 2,
      createdAt: '2 minutes ago',
      views: 59,
      id: 5
    },
  ]
  return res.render('home', { pageTitle: 'Home', fakeUser, videos })
}
export const see = (req, res) => res.render('watch')
export const edit = (req, res) => res.render('edit')
export const search = (req, res) => res.send('Search')
export const upload = (req, res) => res.send('Upload')
export const deleteVideo = (req, res) => res.send('Delete Video')
