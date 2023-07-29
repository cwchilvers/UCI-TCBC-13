const router = require('express').Router();
const { category_ctrl, product_ctrl, tag_ctrl } = require('../controllers');

router
  .use('/categories', category_ctrl)
  .use('/products', product_ctrl)
  .use('/tags', tag_ctrl)
  .use((req, res) => {
    res.send("<h1>404: Not Found</h1>");
  });

module.exports = router;