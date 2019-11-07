import React from "react"
import { graphql } from 'gatsby'
import { LocaleContext } from '../components/layout'
import LocalizedLink from '../components/linkResolve'
import locales from '../../config/i18n'

export const query = graphql`
query ProizvodiQuery($locale: String!){
  proizvodi: allPrismicProizvod(sort: { fields: [data___date], order: DESC }, filter: { lang: { eq: $locale } }) {
    edges {
      node {
        data {
          title {
            html
            text
          }
          product_image {
            alt
            copyright
            url
          }
          product_name {
            html
            text
          }
          product_description {
            html
            text
          }
          meta_title {
            html
            text
          }
          meta_description {
            html
            text
          }
        }
        uid
        id
        type
      }
    }
  }
}
`

const RenderProductList = ({ proizvodi }) => {
  return proizvodi.map((item) =>
    <div key={item.node.id} className="products-grid-item-wrapper">
      <LocalizedLink to={item.node.uid}>
        <img className="products-grid-item-image" src={item.node.data.product_image.url} alt={item.node.data.product_image.alt}/>
        <p className="products-grid-item-name">
            {item.node.data.product_name.text}
        </p>
      </LocalizedLink>
      <p className="products-grid-item-subtitle">{item.node.data.product_description.text}</p>
    </div>
  )
}

const RenderBody = ({ proizvodi }) => (
  <React.Fragment>
    <div className="l-wrapper">
      <hr className="separator-hr" />
    </div>
    
    <section className="products-section">
      <div className="products-grid-items-wrapper">
        <RenderProductList proizvodi={proizvodi} />
      </div>
    </section>
  </React.Fragment>
)


export default ({ data: { home, proizvodi }, pageContext: { locale }, location }) => {
  const lang = React.useContext(LocaleContext)
  const i18n = lang.i18n[lang.locale]

  return (
    <>
      <RenderBody proizvodi={proizvodi.edges} />
    </>
  );
}
