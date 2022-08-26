const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTag = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(allTag)
  } catch (err) {
    res.status(500).json('Something went wrong', err)
  };
});

router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const oneTag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    })
    if (!oneTag) {
      res.status(404).json({ message: 'No Tag found with that id!' })
      return;
    }
    res.status(200).json(oneTag)
  } catch (err) {
    res.status(500).json('Something went wrong', err)
  }
});

router.post('/', async(req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag)
    console.log('New Tag Created')
  } catch (err) {
    res.status(400).json('Something went wrong', err)
  }
});

router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      } 
    })

    if (!updateTag) {
      res.status(400).json(`Can't find what you're looking for!`)
      return;
    }

    res.status(200).json(updateTag)
  } catch (err) {
    console.log(`Something went wrong!`, err)

  }
});

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    })
    if (!deleteTag) {
      res.status(404).json({ message: 'No Tag found with that id!' })
      return;
    }
    res.status(200).json({ mesage: 'Tag Deleted' })
  } catch (err) {
    res.status(500).json('Something went wrong', err)
  }
});

module.exports = router;
