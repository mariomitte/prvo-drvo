/* eslint no-unused-expressions: 0 */
/* eslint react/destructuring-assignment: 0 */

import React from 'react'
import { graphql, Link } from 'gatsby'

const LocaleContext = React.createContext()

const Layout = ({ children, pageContext: { locale } }) => {

  const i18n = 'hr'

  return (
    <LocaleContext.Provider value={{ locale, i18n }}>
      <nav>
        <Link to={`/`}>
          Home
        </Link>{' '}
        <Link to={`/proizvodi/`}>
          Proizvodi
        </Link>{' '}
        <Link to={`/clanovi/`}>
          Clanovi
        </Link>
      </nav>
      <main>
        {children}
      </main>
      <footer>
        Footer content
      </footer>
    </LocaleContext.Provider>
  );
}

export { LocaleContext, Layout }
