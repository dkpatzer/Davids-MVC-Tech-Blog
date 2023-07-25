const withAuth = (req, res, next) => {
    // If the user is not logged in, redirect to the login page
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      // If the user is logged in, proceed to the next middleware or route handler
      next();
    }
  };
  
  module.exports = withAuth;
  