/* eslint no-unused-expressions: 0 */
/* eslint react/destructuring-assignment: 0 */

import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import i18n from '../../../config/i18n'
import LocalizedLink from '../linkResolve'

import '../../stylesheets/main.scss'

const LocaleContext = React.createContext()

const Layout = ({ children, pageContext: { locale } }) => {
  const data = useStaticQuery(query)
  const localData = data.allPrismicLayout.edges
      .filter(edge => edge.node.lang === locale)

  if(localData.length) {
    let data = localData[0].node.data

    const headerItems = data.header_nav_items.map((item) =>
      <LocalizedLink key={item.link.id} className="header-nav-link" to={item.link.uid}>
        {item.text}
      </LocalizedLink>
    )

    const navItems = data.footer_nav_items.map((item) =>
      <LocalizedLink key={item.link.id} className="header-nav-link" to={item.link.uid}>
        {item.text}
      </LocalizedLink>
    )

    const socialItems = data.footer_social_items.map((item, index) => {
      return (
        <a
          key={index}
          className="footer-social-item"
          href={item.link.url}
        >
          <img src={item.icon.url} alt={item.icon.alt} />
        </a>
      )
    })

    return <LocaleContext.Provider value={{ locale, i18n }}>
      <div className="header-inner">
        <LocalizedLink to="/" aria-label="Back to Home">
          {data.site_name}
        </LocalizedLink>
        <nav className="header-nav">
          {headerItems}
        </nav>
        <div className="locale-switcher" data-name="locale-switcher">
          <Link hrefLang="hr" to="/">
            HR
          </Link>{' '}
          /{' '}
          <Link hrefLang="en-gb" to="/en/">
            EN
          </Link>
        </div>
      </div>
      <main>
        {children}
      </main>
      <footer className="footer">
          <div className="footer-inner">
            <div>
              <p className="footer-name">
                {localData[0].node.data.site_name}
              </p>
              <div className="footer-social-items">
                {socialItems}
              </div>
            </div>
            <nav className="footer-nav">
              {navItems}
            </nav>
          </div>
        </footer>
    </LocaleContext.Provider>
  } else {
    return <>
      {children}
    </>
  }
}

export { LocaleContext, Layout }

const query = graphql`
  query LayoutQuery {
    allPrismicLayout {
      edges {
        node {
          lang
          data {
            site_name
            header_nav_items {
              text
              link {
                uid
                id
                type
              }
            }
            footer_nav_items {
              text
              link {
                uid
                id
                type
              }
            }
            footer_social_items {
              icon {
                alt
                copyright
                url
              }
              link {
                link_type
                url
                target
              }
            }
          }
        }
      }
    }
  }
`
