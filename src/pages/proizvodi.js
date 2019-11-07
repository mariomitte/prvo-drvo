import React from "react"
import { graphql } from 'gatsby'

import { LocaleContext } from '../components/layout'

const RenderBody = () => (
  <React.Fragment>
    <section className="products-section">
      <div className="products-grid-items-wrapper">
        Moji proizvodi
      </div>
    </section>
  </React.Fragment>
)

export default ({ location }) => {
  const lang = React.useContext(LocaleContext)

  console.log(lang)

  return (
    <>
      <RenderBody />
    </>
  );
}
