/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

 require('dotenv').config({
   path: `.env`,
 })

module.exports = {
  plugins: [
    `gatsby-plugin-sass`,
    {
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: `${process.env.PRISMIC_REPO_NAME}`,
        accessToken: `${process.env.PRISMIC_API_KEY}`,
        lang: 'hr',
      },
    },
  ]
}
