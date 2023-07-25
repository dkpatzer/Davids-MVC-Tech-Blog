const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

// Route for user registration
router.post('/register', async (req, res) => {
  try {
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user in the database
    const newUser = await User.create({
      username: req.body.username,
      password: hashedPassword,
    });

    // Set the user ID in the session to maintain the user's login status
    req.session.userId = newUser.id;

    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for user login
router.post('/login', async (req, res) => {
  try {
    // Find the user by their username
    const user = await User.findOne({ where: { username: req.body.username } });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(req.body.password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ message: 'Incorrect password' });
      return;
    }

    // Set the user ID in the session to maintain the user's login status
    req.session.userId = user.id;

    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for user logout
router.post('/logout', (req, res) => {
  // Clear the session data to log the user out
  req.session.destroy(() => {
    res.status(200).json({ message: 'Logout successful' });
  });
});

module.exports = router;
