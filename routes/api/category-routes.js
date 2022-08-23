const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
const { update } = require('../../models/Product');

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products

  try {
    const allCategory = await Category.findAll({
      include: [{ model: Product }],
    })
    res.status(200).json(allCategory)
  } catch (err) {
    res.status(500).json('Something went wrong', err)
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

  try {
    const oneCategory = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    })
    if (!oneCategory) {
      res.status(404).json({ message: 'No Category found with that id!' });
      return;
    }
    res.status(200).json(oneCategory)
  } catch (err) {
    res.status(500).json('Something went wrong', err)
  }
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory)
  } catch (err) {
    res.status(400).json('Something went wrong', err)
  }

});

router.put('/:id', (req, res) => {
  // update a category by its `id` value

  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      } 
    })

    if (!updateCategory) {
      res.status(400).json(`Can't find what you're looking for!`)
      return;
    }
    res.status(200).json(updateCategory)
  } catch (err) {
    console.log(`something went wrong`, err)
  }

});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id
      },
    })
    if (!deleteCategory) {
      res.status(404).json({ message: 'No Category found with this id!' });
      return;
    }
    res.status(200).json('Category has been deleted')
  } catch (err) {
    res.status(500).json('Something went wrong', err);
  }
});

module.exports = router;
