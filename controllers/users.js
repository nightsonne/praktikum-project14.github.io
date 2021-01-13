const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users.js');

module.exports.findAllUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
};

module.exports.findUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: 'Такого пользователя не существует' });
        return;
      }
      res.status(200).send({ data: user });
    })

    .catch(() => res.status(400).send({ message: 'Произошла ошибка при поиске пользователя' }));
};

// eslint-disable-next-line consistent-return
module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  const passwordPattern = new RegExp(/[A-Za-z0-9]{8,}$/);

  if (!passwordPattern.test(password)) {
    return res.status(400).send({
      message: 'Неверный формат пароля, нельзя использовать пробелы и киррилицу',
    });
  }

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(200).send({
      data: {
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      },
    }))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        return res.status(409).send({ message: 'Пользователь с таким емейлом уже зарегистрирован' });
      }
      return res.status(400).send({ message: 'Произошла ошибка при создании пользователя' });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(() => res.status(401).send({ message: 'Произошла ошибка' }));
};
