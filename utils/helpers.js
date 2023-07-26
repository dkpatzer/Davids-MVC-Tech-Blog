


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
  