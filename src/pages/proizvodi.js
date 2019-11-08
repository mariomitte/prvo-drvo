import React from "react"
import { graphql } from 'gatsby'
import LocalizedLink from '../components/linkResolve'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'
import config from '../../config/website'

export const query = graphql`
query ProizvodiQuery($locale: String!){
  sviProizvodi: allPrismicSviProizvodi(filter: { lang: { eq: $locale } }) {
    edges {
      node {
        data {
          meta_title {
            html
            text
          }
          meta_description {
            html
            text
          }
        }
      }
    }
  }
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
            localFile {
              childImageSharp {
                fluid(maxWidth: 500, quality: 90) {
                  ...GatsbyImageSharpFluid_withWebp
                }
                resize(width: 1200, quality: 90) {
                  src
                  height
                  width
                }
              }
            }
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

const ProizvodiFotografija = ({ proizvod }) => {
  const { fluid } = proizvod.product_image.localFile.childImageSharp

  return <Img className="products-grid-item-image" fluid={fluid} />
}

const RenderProductList = ({ proizvodi }) => {
  return proizvodi.map((item) =>
    <div key={item.node.id} className="products-grid-item-wrapper">
      <LocalizedLink to={item.node.uid}>
        <ProizvodiFotografija proizvod={item.node.data} />
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


export default ({ data: { sviProizvodi, proizvodi }, pageContext: { locale }, location }) => {

  const showAll = sviProizvodi.edges[0].node.data

  return (
    <>
      <Helmet>
        <title>{showAll.meta_title.text}</title>
        <meta charSet="utf-8" />
        <meta name="description" content={showAll.meta_description.text} />
      </Helmet>
      <RenderBody proizvodi={proizvodi.edges} />
    </>
  );
}
