const Card = require('../models/cards.js');

module.exports.findAllCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (card) {
        if (card.owner === req.user._id) {
          Card.findByIdAndRemove(req.params.id)
            .then((card) => {
              if (!card) {
                res.status(404).json({ message: 'Такой карточки не существует' });
                return;
              }
              res.status(200).send({ data: card });
            });
        } else {
          res.status(403).send({ message: 'В доступе отказано' });
        }
      }
    })
    .catch(() => res.status(400).send({ message: 'Произошла ошибка при поиске карточки' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send({ data: card }))
    .catch(() => res.status(400).send({ message: 'Произошла ошибка при создании карточки' }));
};
