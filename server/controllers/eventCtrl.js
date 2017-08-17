const Event = require('../db/index').Event;
console.log('3: in th event controller')

module.exports = {
  getEvents: ((req, res) => {
    console.log('hit', req.query)
    Event.findAll({})
      .then(events => res.status(200).send(events))
      .catch(err => res.status(500).send(`Error finding events! ${err}`))
  })
}