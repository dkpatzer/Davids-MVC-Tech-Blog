

// Example helper function to format a date using JavaScript's built-in Date object
const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  module.exports = {
    formatDate,
    // Add more helper functions here as needed
  };
  