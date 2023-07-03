const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  tag = Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag,
        as: 'product_tags'
      }
    ]
  })
  // Send response
  .then((tag) => {
    res.json(tag);  // Send tag data to client
  })
  .catch((err) => {
    res.json(err);  // Send error to client
  });
  

});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  tag = Tag.findByPk(req.params.id, {   // find by primary key (id)
    include: [
      {
        model: Product,
        through: ProductTag,
        as: 'product_tags'
      }
    ]
  })
  // Send response
  .then((tag) => {
      res.json(tag);  // Send tag data to client
  })
  .catch((err) => {
      res.json(err);  // Send error to client
  });
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
