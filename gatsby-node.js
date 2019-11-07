const _ = require('lodash')
const locales = require('./config/i18n')
const { replaceTrailing, localizedSlug, replaceBoth, wrapper } = require('./src/utils/gatsby-node-helpers')

// Take the pages from src/pages and generate pages for all locales, e.g. /index and /en/index
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  // Only create one 404 page at /404.html
  if (page.path.includes('404')) {
    return
  }

  // First delete the pages so we can re-create them
  deletePage(page)

  Object.keys(locales).map(lang => {
    // Remove the trailing slash from the path, e.g. --> /categories
    page.path = page.path

    // Remove the leading AND traling slash from path, e.g. --> categories
    const name = page.path

    // Create the "slugs" for the pages. Unless default language, add prefix àla "/en"
    const localizedPath = locales[lang].default ? page.path : `${locales[lang].path}${page.path}`

    return createPage({
      ...page,
      path: localizedPath,
      context: {
        locale: lang,
        name,
      },
    })
  })
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const proizvodiTemplate = require.resolve('./src/templates/proizvod.js')

  const result = await wrapper(
    graphql(`
      {
        proizvodi: allPrismicProizvod(sort: { fields: [data___date], order: DESC }) {
          edges {
            node {
              id
              uid
              lang
            }
          }
        }
      }
    `)
  )

  const proizvodiList = result.data.proizvodi.edges

  proizvodiList.forEach(edge => {
    // The uid you assigned in Prismic is the slug!
    createPage({
      path: localizedSlug(edge.node),
      component: proizvodiTemplate,
      context: {
        // Pass the unique ID (uid) through context so the template can filter by it
        uid: edge.node.uid,
        locale: edge.node.lang,
      },
    })
  })
}
