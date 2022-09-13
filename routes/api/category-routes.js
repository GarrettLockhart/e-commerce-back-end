const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// get all categories in the DB
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [
        {
          model: Product,
        },
      ],
    });
    res.json(categories);
  } catch (err) {
    console.log(err);
  }
});

// find one by id
router.get('/:id', async (req, res) => {
  try {
    const oneCategory = await Category.findOne({
      include: [
        {
          model: Product,
        },
      ],
      where: {
        id: req.params.id,
      },
    });
    res.json(oneCategory);
  } catch (err) {
    console.log(err);
  }
});

// create new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.json(newCategory);
  } catch (err) {
    res.json(err);
  }
});

// updated a category based on it ID
router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json(updatedCategory);
  } catch (err) {
    res.json(err);
  }
});

// delete category based on ID
router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(deletedCategory);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
