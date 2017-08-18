const Event = require('../db/index').Event;

module.exports = {
  getEvents: ((req, res) => {
    console.log('getting events from the database', req.query)
    Event.findAll({})
      .then(events => res.status(200).send(events))
      .catch(err => res.status(500).send(`Error finding events! ${err}`))
  }),
  postEvent: ((req, res) => {
    console.log('posting event to the database', req.body)
    Event.findOrCreate({where: req.body})
      .spread((event, hasBeenPrevInserted) => {
        console.log('this is the event', event);
        res.status(200).send(event)
        console.log('was it found in the database prior?', hasBeenPrevInserted)
      })
      .catch(err => res.status(500).send(`Error posting events! ${err}`))
  })
}