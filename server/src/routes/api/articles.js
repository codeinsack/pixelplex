const express = require('express');

const router = express.Router();

const Article = require('../../models/article');
const validator = require('../../../validation/article');
const createOutputObject = require('../../../utils/utils');

router.post('/', (req, res) => {
  const { errors, isValid } = validator(req.body);

  if (!isValid) {
    return res.status(422).json({ errors });
  }

  const newArticle = new Article({
    title: req.body.title,
    body: req.body.body,
  });

  newArticle.save()
    .then(article => res.json(article))
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the article.',
      });
    });
});

router.put('/:id', (req, res) => {
  const { errors, isValid } = validator(req.body);

  if (!isValid) {
    return res.status(422).json({ errors });
  }

  Article.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    body: req.body.body,
  }, { new: true })
    .then((article) => {
      if (!article) {
        return res.status(404).send({
          message: `Article not found with id ${req.params.id}`,
        });
      }
      res.send(article);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: `Article not found with id ${req.params.id}`,
        });
      }
      return res.status(500).send({
        message: `Error updating article with id ${req.params.id}`,
      });
    });
});

router.get('/', (req, res) => {
  const { page } = req.query || 1;
  const { limit } = req.query || 10;

  const { errors, isValid } = validator(req.query);

  if (!isValid) {
    return res.status(422).json({ errors });
  }

  Article.find()
    .then((articles) => {
      const outputObject = createOutputObject(articles, page, limit);
      res.send(outputObject);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving articles.',
      });
    });
});

router.get('/:id', (req, res) => {
  Article.findById(req.params.id)
    .then((article) => {
      if (!article) {
        return res.status(404).send({
          errors: {
            field: 'id',
            error: 'Not Found',
          },
        });
      }
      res.send(article);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          errors: {
            field: 'id',
            error: 'Not Found',
          },
        });
      }
      return res.status(500).send({
        message: `Error retrieving article with id ${req.params.id}`,
      });
    });
});

module.exports = router;
