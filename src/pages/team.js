import React from "react"
import { graphql } from 'gatsby'
import { LocaleContext } from '../components/layout'
import locales from '../../config/i18n'

export const query = graphql`
query ClanoviQuery($locale: String!){
  clanovi: allPrismicAuthor(sort: {order: DESC, fields: first_publication_date}, filter: { lang: { eq: $locale } }) {
    edges {
      node {
        id
        type
        data {
          name {
            html
            text
          }
          picture {
            alt
            copyright
            url
          }
          bio {
            html
            text
          }
        }
        lang
      }
    }
  }
}
`

const RenderClanoviList = ({ clanovi }) => {
  return clanovi.map((item) =>
    <div key={item.node.id} className="products-grid-item-wrapper">
      <>
        <span>{item.node.data.name.text}</span>
        <img className="products-grid-item-image" src={item.node.data.picture.url} alt={item.node.data.picture.alt}/>
        <p className="products-grid-item-name">
            {item.node.data.bio.text}
        </p>
      </>
    </div>
  )
}

const RenderBody = ({ clanovi }) => (
  <React.Fragment>
    <div className="l-wrapper">
      <hr className="separator-hr" />
    </div>

    <section className="products-section">
      <div className="products-grid-items-wrapper">
        <RenderClanoviList clanovi={clanovi} />
      </div>
    </section>
  </React.Fragment>
)


export default ({ data: { clanovi }, pageContext: { locale }, location }) => {
  const lang = React.useContext(LocaleContext)
  const i18n = lang.i18n[lang.locale]

  return (
    <>
      <RenderBody clanovi={clanovi.edges} />
    </>
  );
}
