const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models/models');

// The `/api/tags` endpoint

// find all tags
router.get('/', (req, res) => {
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      },
    ],
  })
  .then((tags) => res.json(tags)) // Send all tags to client
  .catch((err) => {               // Log error to client
    console.log(err);
    res.status(500).json(err);
  });
});

// find a single tag by its `id`
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      },
    ],
  })

  // Send response to client
  .then((tag) => res.json(tag))     // Send tag to client
  .catch((err) => {                 // Log error to client
    console.log(err);
    res.status(500).json(err);
  });
});

// create a new tag
router.post('/', (req, res) => {
  // check if tag already exists or else create it
  Tag.findOrCreate({
    where: {
      tag_name: req.body.tag_name,
    },
  })

  // Send response to client
  .then((tag) => res.json(tag))     // Send tag to client
  .catch((err) => {                 // Log error to client
    console.log(err);
    res.status(500).json(err);
  });
});

// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })

  // Send response to client
  .then((tag) => res.json(tag))   // Send category to client
  .catch((err) => {                         // Log error to client
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
