require('dotenv').config()

const sanityClient = require('@sanity/client')

const client = sanityClient({
  projectId: process.env.PROJECT_ID,
  dataset: process.env.DATASET,
  token: process.env.TOKEN,
  useCdn: false
})

const generateKey = function() {
  return Math.random().toString(36).substring(10)
}

const getObjects = async () => {
  const objects = await client.fetch('*[_type == "blog" && year == "2014-01-01"]{entries}')

  return objects
}

const convertObjects = async () => {

  const objects = await getObjects()

  objects.forEach(obj => {

    obj.entries.forEach(entry => {

      //console.log(entry.body[0].children[0].text)
      const doc = {
        _id: `${entry.date}-${entry._key}`,
        ...entry,
        seo: {
          description: entry.body[0].children[0].text
        }
      }

      doc._type = 'blogPost'

      delete doc._key

      client.createOrReplace(doc).then(res => {
        console.log(`blogPost was created, document ID is ${res._id}`)
      })
    })
  })
}

//convertObjects()

const getBlogPosts = async () => {
  const objects = await client.fetch('*[_type == "blogPost" && date >= "2017-01-01" && date < "2018-01-01"]')

  return objects
}

const convertBlogToPage = async () => {
  const blogPosts = await getBlogPosts()

  blogPosts.forEach(blogPost => {

    const page = {
      ...blogPost,
      isArchived: true,
      seo: {
        description: blogPost.seo.description,
        authorDisplay: blogPost.author,
        categories: [
          {
            "_key": generateKey(),
            "_ref": "f12d8ac5-0213-4c33-9b78-e5ea816811b5",
            "_type": "reference"
          }
        ]
      }
    }

    page._id = `${blogPost._id}-page`
    page._type = 'page'

    delete page.author
    delete page.seo.publishedAt

    client.createOrReplace(page).then(res => {
      console.log(`blogPost was created, document ID is ${res._id}`)
    })

  })
}

convertBlogToPage()
