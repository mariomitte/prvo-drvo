const website = require('./website')

module.exports = {
  'hr': {
    default: true,
    path: 'hr',
    locale: 'hr-hr',
    siteLanguage: 'hr',
    ogLang: 'hr_HR',
    defaultTitle: website.title,
    defaultTitleAlt: website.titleAlt,
    defaultDescription: 'Prvo drvo, za proizvodnju i preradu drva',
    headline: 'Proizvodnja i prerada drva',
    tagged: 'oznake',
    recent: 'Novosti',
    proizvodi: 'Proizvodi',
    team: 'Naš team',
  },
  'en-gb': {
    path: 'en',
    locale: 'en-gb',
    siteLanguage: 'en',
    ogLang: 'en_GB',
    defaultTitle: website.title,
    defaultTitleAlt: website.titleAlt,
    defaultDescription: website.description,
    headline: website.headline,
    tagged: 'tagged with',
    recent: 'Recent',
    products: 'Products',
    team: 'Our team',
  },
}
