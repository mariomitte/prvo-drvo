import React from "react"
import { graphql } from 'gatsby'
import { LocaleContext } from '../components/layout'
import SEO from '../components/SEO'
import website from '../../config/website'
import Img from "gatsby-image"

export const query = graphql`
query HomeQuery($locale: String!){
  home: prismicStranicaDobrodoslice(lang: { eq: $locale }) {
    data {
      banner_image {
        alt
        copyright
        url
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
      <img className="homepage-banner-image" src={home.banner_image.url} alt={home.banner_image.alt} />
      <div className="homepage-banner-box-wrapper">
        <div className="homepage-banner-box">
        {home.banner_text.text}
        </div>
      </div>
    </section>
  </React.Fragment>
);

export default ({ data: { home }, pageContext: { locale }, location }) => {
  const lang = React.useContext(LocaleContext)

  return (
    <>
      <SEO pathname={location.pathname} locale={locale} />
      <RenderBody home={home.data} />
    </>
  );
}
