import React from "react"
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'
import config from '../../config/website'

export const query = graphql`
query ClanoviQuery($locale: String!){
  sviClanovi: allPrismicSviClanovi(filter: { lang: { eq: $locale } }) {
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


export default ({ data: { sviClanovi, clanovi }, pageContext: { locale }, location }) => {

  const showAll = sviClanovi.edges[0].node.data

  return (
    <>
    <Helmet>
        <title>{showAll.meta_title.text}</title>
        <meta charSet="utf-8" />
        <meta name="description" content={showAll.meta_description.text} />
      </Helmet>
      <RenderBody clanovi={clanovi.edges} />
    </>
  );
}
