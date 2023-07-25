const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// New blog post route (GET /dashboard/new)
router.get('/new', withAuth, (req, res) => {
  res.render('new-post', {
    logged_in: true,
  });
});

// Edit blog post route (GET /dashboard/edit/:id)
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    // Get the requested blog post with its associated user data
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // If the requested post doesn't exist, return a 404 error
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    // Serialize the data so we can pass it to the handlebars template
    const post = postData.get({ plain: true });

    // Render the edit post template with the post data
    res.render('edit-post', {
      post,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create new blog post route (POST /api/post)
router.post('/', withAuth, async (req, res) => {
  try {
    // Create a new blog post with the provided title and content
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });

    res.json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update blog post route (PUT /api/post/:id)
router.put('/:id', withAuth, async (req, res) => {
  try {
    // Find the requested blog post
    const post = await Post.findByPk(req.params.id);

    // If the post doesn't exist, return a 404 error
    if (!post) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    // Update the post's title and content
    post.title = req.body.title;
    post.content = req.body.content;
    await post.save();

    res.json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete blog post route (DELETE /api/post/:id)
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // Find the requested blog post
    const post = await Post.findByPk(req.params.id);

    // If the post doesn't exist, return a 404 error
    if (!post) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    // Delete the post
    await post.destroy();

    res.json({ message: 'Post deleted successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
