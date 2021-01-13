const router = require('express').Router();
const { findAllCards, deleteCard, createCard } = require('../controllers/cards.js');

router.get('/', findAllCards);
router.post('/', createCard);
router.delete('/:id', deleteCard);

module.exports = router;
