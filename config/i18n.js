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
    defaultDescription: 'Prvo drvo, obrt za proizvodnju i usluge',
    headline: 'Razni drvni proizvodi',
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
