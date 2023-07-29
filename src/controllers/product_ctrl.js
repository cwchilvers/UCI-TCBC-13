const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models/models');
const sendResponse = require('./utils/sendResponse');

// Get all products
router.get('/', (req, res) => {
  sendResponse(Product.findAll({
    include: [
      {
        model: Category, 
        attributes: ['id', 'category_name'] 
      },
      { 
        model: Tag, 
        attributes: ['id', 'tag_name'] 
      },
    ],
  }), res);
});

// Get product by ID
router.get('/:id', (req, res) => {
  sendResponse(Product.findOne({
    where: { id: req.params.id },
    include: [
      { 
        model: Category, 
        attributes: ['id', 'category_name'] 
      },
      { 
        model: Tag, 
        attributes: ['id', 'tag_name'] 
      },
    ],
  }), res);
});

// Create new product
router.post('/', (req, res) => {
  /* Example request body:
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */

  // Create new product
  Product.create(req.body)
  .then((product) => {
    if (req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => ({ product_id: product.id, tag_id }));
      return ProductTag.bulkCreate(productTagIdArr);
    }
    res.status(200).json(product);
  })
  .then((productTagIds) => res.status(200).json(productTagIds))
  .catch((err) => res.status(400).json(err));
});

// Update product by ID
router.put('/:id', (req, res) => {
  /* Example request body:
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */

  // Find product by ID and update its data
  Product.update(req.body, { where: { id: req.params.id }})
    .then(() => {
      // Get all tags from the product
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })

    .then((productTags) => {
      // Get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);

      // Create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
      .filter((tag_id) => !productTagIds.includes(tag_id))
      .map((tag_id) => ({ product_id: req.params.id, tag_id }));

      // Figure out which ones to remove
      const productTagsToRemove = productTags
      .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
      .map(({ id }) => id);

      // Run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })

    .then(() => {
      // Send a success response to the client using the helper function
      sendResponse(res, Product.findByPk(req.params.id, {
        include: [
          { model: Category, attributes: ['id', 'category_name'] },
          { model: Tag, attributes: ['id', 'tag_name'] },
        ],
      }));
    })
    
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
});

// Delete product by ID
router.delete('/:id', (req, res) => {
  sendResponse(Product.destroy({ where: { id: req.params.id } }), res);
});

module.exports = router;
