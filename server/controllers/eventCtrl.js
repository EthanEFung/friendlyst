const Event = require('../db/index').Event;

module.exports = {
  getEvents: ((req, res) => {
    console.log('getting events from the database', req.query)
    Event.findAll({})
      .then(events => res.status(200).send(events))
      .catch(err => res.status(500).send(`Error finding events! ${err}`))
  }),
  postEvent: ((req, res) => {
    Event.findOrCreate({where: req.body})
      .spread((event, hasBeenPrevInserted) => {
        res.status(200).send(event)
      })
      .catch(err => res.status(500).send(`Error posting events! ${err}`))
  })
}