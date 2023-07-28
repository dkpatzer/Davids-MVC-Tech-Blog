const { Post } = require('../models');

const postData = [
    {
        title: "Meta plans retention 'hooks' for Threads as more than half of users leave app!",
        post_content: "Meta Platforms (META.O) executives are heavily focused on boosting retention on their new Twitter rival Threads, after the app lost more than half of its users in the weeks following its buzzy launch, CEO Mark Zuckerberg told employees on Thursday.",
        user_id: 3
    },
    {
        title: "Intel turns unexpected profit, higher forecast as PC market slide slows!",
        post_content: "July 27 (Reuters) - Chipmaker Intel (INTC.O) on Thursday posted a surprise quarterly profit as a PC market slump started to ease, and forecast third-quarter earnings above Wall Street expectations, sending its shares up about 6%.",
        user_id: 1
    },
    {
        title: "US Senate panel passes AM radio, ticket fee pricing bills",
        post_content: "The U.S. Senate Commerce Committee approved legislation on Thursday to bar automakers from eliminating AM broadcast radio in new vehicles and require companies like Ticketmaster to put total ticket prices including fees in marketing materials.",
        user_id: 2

    },
    {
        title: "Tech Blog 'Let's Talk Tech' has been released!",
        post_content: "A CMS-style blog site similar to a Wordpress site, where developers can publish their blog posts and comment on other developers’ posts as well. This site will be built from scratch and deployed to Heroku. The app will follow MVC paradigm in its architectural structure, using Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication",
        user_id: 5
    },
    {
        title: "KLA expects first-quarter revenue above estimates on AI boom!",
        post_content: "Chip-making tools maker KLA Corp (KLAC.O) forecast first-quarter revenue and profit above Wall Street estimates on Thursday, boosted by higher investments in artificial intelligence (AI), sending its shares up nearly 3% after the bel",
        user_id: 4
    }
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;