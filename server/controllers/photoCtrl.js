const axios = require('axios')
const cloudinary = require('cloudinary')

module.exports = {

  getAllAlbums: ((req, res) => {
    console.log(`getAllAlbums controller`)
    console.log(`req is ${JSON.stringify(req.query)}`)
    let userId = req.query.id
    let photoAlbums = []
    let folders = []
    let cloudinaryPromises = []

    cloudinary.v2.api.sub_folders(`${userId}`, {cloud_name: 'dyrwrlv2h', api_key: '377437738276986', api_secret: 'eimfjvsaNd-0pQTVLrNhJ2m07i4',type: 'upload', prefix: '6/'}, (error, result) => {
      console.log(result)
      folders = result.folders.slice()
      //console.log(`folders is ${JSON.stringify(folders)}`)

      //create the promises
      folders.forEach( (album, i) => {
        cloudinaryPromises.push(new Promise( (resolve, reject) => {
          cloudinary.v2.api.resources({cloud_name: 'dyrwrlv2h', api_key: '377437738276986', api_secret: 'eimfjvsaNd-0pQTVLrNhJ2m07i4',type: 'upload', prefix: `6/${album.name}/`}, (error, result) => {
            //console.log(result.resources)
            let albumObject = Object.assign({}, album, {photos: result.resources})
            resolve(albumObject)
          })
        }))
      })

      console.log(`cloudinaryPromises are ${cloudinaryPromises}`)
      Promise.all(cloudinaryPromises).then( (values) => {
        console.log(`promise all is ${JSON.stringify(values)}`)
      res.status(201).send(values)
    })

    })

      //
  })
}