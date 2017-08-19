const Event = require('../db/index').Event;

module.exports = {
  getEvents: ((req, res) => {
    Event.findAll({})
      .then(events => res.status(200).send(events))
      .catch(err => res.status(500).send(`Error finding events! ${err}`))
  }),
  getEvent: ((req, res) => {
    Event.findAll({
      where:{
        id: req.body.id
      }
    })
      .then(event => res.status(200).send(events))
      .catch(err => res.status(500).send(`Error finding events! ${err}`))
  }),
  postEvent: ((req, res) => {
    Event.findOrCreate({where: req.body})
      .spread((event, hasBeenPrevInserted) => {
        res.status(200).send(event)
      })
      .catch(err => res.status(500).send(`Error posting events! ${err}`))
  }),
  deleteEvent: ((req, res) => {
    console.log('receiving request from the client to the server to delete', req.body)
    Event.find({
      where: {
        id: req.body.id
      }
    })
    .then(event => {
      Event.destroy({
          where: {
            id: req.body.id,
          }
        })
        .then(num => res.status(200).send(`event deleted!`))
        .catch(err => res.status(500).send(`Error deleting event! ${err}`))
    })
    .catch(err => res.status(500).send(`Error finding event! ${err}`))
  }),
  updateEvent: ((req, res) => {
    console.log('received request to update event', req.body)
    // Event.find({where: req.body.id})
    //   .then(event => {

    //   })
  })
}