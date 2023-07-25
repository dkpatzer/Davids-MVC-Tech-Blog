const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// Homepage route (GET /)
router.get('/', async (req, res) => {
  try {
    // Get all blog posts with their associated user and comment data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      ],
    });

    // Serialize the data so we can pass it to the handlebars template
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the homepage template with all blog posts and comments
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Individual blog post page route (GET /post/:id)
router.get('/post/:id', async (req, res) => {
  try {
    // Get the requested blog post with its associated user and comment data
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username'],
          },
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

    // Render the individual post page template with the post and its comments
    res.render('post', {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
