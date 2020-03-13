import React from "react"
import { graphql } from 'gatsby'
import LocalizedLink from '../components/linkResolve'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'

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
                fluid(maxWidth: 1920, quality: 90) {
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

  return <Img className="rounded" fluid={fluid} />
}

const RenderProductList = ({ proizvodi }) => {
  return proizvodi.map((item) =>
    <div key={item.node.id} className="mt-4 mb-4 products-wrapper">
      <LocalizedLink to={item.node.uid}>
        <ProizvodiFotografija proizvod={item.node.data} />
      </LocalizedLink>
      <div className="products-box-wrapper">
        <div className="p-2 products-box-items">
          <p>
              {item.node.data.product_name.text}
          </p>
          <p>{item.node.data.product_description.text}</p>
        </div>
      </div>
    </div>
  )
}

const RenderBody = ({ proizvodi }) => (
  <div className="container d-flex justify-content-center">
    <section className="products-section">
      <RenderProductList proizvodi={proizvodi} />
    </section>
  </div>
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
