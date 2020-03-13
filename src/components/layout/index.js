/* eslint no-unused-expressions: 0 */
/* eslint react/destructuring-assignment: 0 */

import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import i18n from '../../../config/i18n'
import LocalizedLink from '../linkResolve'
import LanguageSwitcher from '../LanguageSwitcher'
import ResponsiveMenu from '../ResponsiveMenu'

import '../../stylesheets/main.scss'

const LocaleContext = React.createContext()

const Layout = ({ children, pageContext: { locale } }) => {
  const data = useStaticQuery(query)
  const localData = data.allPrismicLayout.edges
      .filter(edge => edge.node.lang === locale)

  if(localData.length) {
    let data = localData[0].node.data

    const headerItems = data.header_nav_items.map((item) =>
      <LocalizedLink key={item.link.id} className="btn nav-link m-2" to={item.link.uid}>
        {item.text}
      </LocalizedLink>
    )

    const navItems = data.footer_nav_items.map((item) =>
      <LocalizedLink key={item.link.id} className="nav-link m-2" to={item.link.uid}>
        {item.text}
      </LocalizedLink>
    )

    const socialItems = data.footer_social_items.map((item, index) => {
      return (
        <a
          key={index}
          className="footer-social-item m-1"
          href={item.link.url}
        >
          <img src={item.icon.url} alt={item.icon.alt} />
        </a>
      )
    })

    return <LocaleContext.Provider value={{ locale, i18n }}>
      <div className="company">
        <div className="ml-5 mr-5 d-flex flex-row-reverse justify-content-between">
          <div className="d-flex flex-column align-items-end">
            <small>Prvo drvo j.d.o.o.</small>
            <small>+385423425234</small>
          </div>
          <LanguageSwitcher language={locale} />
        </div>
      </div>
      <nav className="d-flex align-items-center">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <LocalizedLink to="/" aria-label={data.site_name} className="nav-link">
              <h2>{data.site_name}</h2>
            </LocalizedLink>
            <div className="proizvodi">
              {headerItems}
            </div>
            <ResponsiveMenu items={headerItems} locale={locale} />
          </div>
        </div>
      </nav>
      <main>
        {children}
      </main>
      <footer className="site-footer">
        <div className="bottom">
          <div className="container">
            <div className="row">

              <div className="w-100 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="copyright-text">
                    <small>Sva prava pridržana  © {localData[0].node.data.site_name}</small>
                  </p>
                  <div>
                    {navItems}
                    <LanguageSwitcher language={locale} footer />
                  </div>
                </div>

                <div className="d-flex">
                  {socialItems}
                </div>
              </div>

              <div className="w-100 d-flex justify-content-center">
                <div className="credits">
                  <small>Designed by <a href="#">mitte</a></small>
                </div>
              </div>

            </div>
          </div>
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
