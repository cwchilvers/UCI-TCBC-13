const router = require('express').Router();
const { Tag, Product} = require('../../models/models');
const sendResponse = require('../../utils/sendResponse');

// Get all tags
router.get('/', (req, res) => {
  sendResponse(Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      },
    ],
  }), res);
});

// Get tag by ID
router.get('/:id', (req, res) => {
  sendResponse(Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      },
    ],
  }), res);
});

// Create new tag
router.post('/', (req, res) => {
  sendResponse(Tag.findOrCreate({
    where: {
      tag_name: req.body.tag_name,
    },
  }), res);
});

// Update tag by ID
router.put('/:id', (req, res) => {
  sendResponse(Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  }), res);
});

// Delete tag by ID
router.delete('/:id', (req, res) => {
  sendResponse(Tag.destroy({ 
    where: { 
      id: req.params.id 
    } 
  }), res);
});

module.exports = router;
