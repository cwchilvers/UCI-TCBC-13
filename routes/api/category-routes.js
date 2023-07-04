const router = require('express').Router();
const { Category, Product } = require('../../models/models');

// The `/api/categories` endpoint

// find all categories
router.get('/', (req, res) => {
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      },
    ],
  })

  // Send response to client
  .then((categories) => res.json(categories)) // Send all categories to client
  .catch((err) => {                           // Log error to client
    console.log(err);
    res.status(500).json(err);
  });
});

// find one category by its `id` value
router.get('/:id', (req, res) => {
  Category.findOne({
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
  .then((category) => res.json(category))   // Send category to client
  .catch((err) => {                         // Log error to client
    console.log(err);
    res.status(500).json(err);
  });
});

// create a new category 
router.post('/', (req, res) => {
  // check if category already exists or else create it
  Category.findOrCreate({
    where: {
      category_name: req.body.category_name,
    },
  })

  // Send response to client
  .then((category) => res.json(category))   // Send category to client
  .catch((err) => {                         // Log error to client
    console.log(err);
    res.status(500).json(err);
  });
});

// update a category by its `id` value
router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })

  // Send response to client
  .then((category) => res.json(category))   // Send category to client
  .catch((err) => {                         // Log error to client
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
