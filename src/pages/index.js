import React from "react"
import { graphql } from 'gatsby'
import { LocaleContext } from '../components/layout'
import SEO from '../components/SEO'
import Img from "gatsby-image"

export const query = graphql`
query HomeQuery($locale: String!){
  home: prismicStranicaDobrodoslice(lang: { eq: $locale }) {
    data {
      banner_image {
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
      banner_text {
        html
        text
      }
      title {
        html
        text
      }
    }
    id
    type
  }
}
`

const BannerFotografija = ({ home }) => {
  const { fluid } = home.banner_image.localFile.childImageSharp

  return <Img className="homepage-banner-image" fluid={fluid} />
}

const RenderBody = ({ home }) => (
  <React.Fragment>
    <div className="l-wrapper">
      <hr className="separator-hr" />
    </div>

    <header className="homepage-header">
      <div className="l-wrapper">
        <div className="homepage-header-title">
          {home.title.text}
        </div>
      </div>
    </header>

    <section className="homepage-banner">
      <BannerFotografija home={home} />
      <div className="homepage-banner-box-wrapper">
        <div className="homepage-banner-box">
        {home.banner_text.text}
        </div>
      </div>
    </section>
  </React.Fragment>
);

export default ({ data: { home }, pageContext: { locale }, location }) => {
  return (
    <>
      <SEO pathname={location.pathname} locale={locale} />
      <RenderBody home={home.data} />
    </>
  );
}
