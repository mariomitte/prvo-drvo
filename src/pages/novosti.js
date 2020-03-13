import React from "react"
import { graphql } from 'gatsby'
import LocalizedLink from '../components/linkResolve'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'

export const query = graphql`
query NovostiQuery($locale: String!){
  sviNovosti: allPrismicSviNovosti(filter: { lang: { eq: $locale } }) {
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
  novosti: allPrismicNovosti(sort: { fields: [data___date], order: DESC }, filter: { lang: { eq: $locale } }) {
    edges {
      node {
        data {
          product_name {
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

const NovostiFotografija = ({ proizvod }) => {
  const { fluid } = proizvod.product_image.localFile.childImageSharp

  return <Img className="rounded" fluid={fluid} />
}

const RenderNovostiList = ({ novosti }) => {
  return novosti.map((item) =>
    <div key={item.node.id} className="mt-4 mb-4 products-wrapper">
      <LocalizedLink to={item.node.uid}>
        <NovostiFotografija proizvod={item.node.data} />
      </LocalizedLink>
      <div className="products-box-wrapper">
        <div className="p-2 products-box-items">
          <p>
              {item.node.data.product_name.text}
          </p>
        </div>
      </div>
    </div>
  )
}

const RenderBody = ({ novosti }) => (
  <div className="container d-flex justify-content-center">
    <section className="products-section">
      <RenderNovostiList novosti={novosti} />
    </section>
  </div>
)


export default ({ data: { sviNovosti, novosti }, pageContext: { locale }, location }) => {

  console.log('novosti', novosti)

  const showAll = sviNovosti.edges[0].node.data

  return (
    <>
      <Helmet>
        <title>{showAll.meta_title.text}</title>
        <meta charSet="utf-8" />
        <meta name="description" content={showAll.meta_description.text} />
      </Helmet>
      <RenderBody novosti={novosti.edges} />
    </>
  );
}
