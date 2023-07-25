const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// Dashboard homepage route (GET /dashboard)
router.get('/', withAuth, async (req, res) => {
  try {
    // Get all blog posts for the logged-in user
    const postData = await Post.findAll({
      where: {
        user_id: req.session.userId,
      },
      include: [{ model: User }],
    });

    // Serialize the data so we can pass it to the handlebars template
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the dashboard template with the user's posts
    res.render('dashboard', {
      posts,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// New blog post form route (GET /dashboard/new)
router.get('/new', withAuth, (req, res) => {
  res.render('new-post', {
    logged_in: true,
  });
});

// Create a new blog post route (POST /dashboard)
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.userId,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Edit blog post form route (GET /dashboard/edit/:id)
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    // Check if the post belongs to the logged-in user
    if (postData.user_id !== req.session.userId) {
      res.status(403).json({ message: 'Access denied' });
      return;
    }

    const post = postData.get({ plain: true });

    res.render('edit-post', {
      post,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a blog post route (PUT /dashboard/:id)
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedPost = await Post.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.userId,
      },
    });

    if (!updatedPost[0]) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a blog post route (DELETE /dashboard/:id)
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletedPost = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.userId,
      },
    });

    if (!deletedPost) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(deletedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
