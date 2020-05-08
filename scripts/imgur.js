const axios = require('axios')

const getAlbum = async (id) => {
  const result = await axios.get(`https://api.imgur.com/3/album/${id}`, {
    headers: {
      Authorization: 'Client-ID 271fb4792906a84'
    }
  })

  console.log(result.data.data.title, result.data.data.images_count)

  result.data.data.images.forEach(image => {
    console.log(image.link, image.tags, image.description);
  });
}

getAlbum('7l5dVRr')


