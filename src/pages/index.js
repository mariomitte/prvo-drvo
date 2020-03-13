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
  <div className="mb-5">
    <section
      className="hero"
      style={{ backgroundImage: `url(${home.banner_image.url})` }}
    >
      <div className="products-box-wrapper">
        <div className="p-5 products-box-items">
          <p>{home.banner_text.text}</p>
        </div>
      </div>
    </section>
    <div>
      <br />
      <br />
      <br />
    </div>
    <section className="container">
      asdaklfjdakjfkjdsfklsjdkafj
    </section>
    <div>
      <br />
      <br />
      <br />
    </div>
    <section className="container">
      asdaklfjdakjfkjdsfklsjdkafj
    </section>
    <div>
      <br />
      <br />
      <br />
    </div>
    <section className="container">
      asdaklfjdakjfkjdsfklsjdkafj
    </section>
  </div>
);

export default ({ data: { home }, pageContext: { locale }, location }) => {
  return (
    <>
      <SEO pathname={location.pathname} locale={locale} />
      <RenderBody home={home.data} />
    </>
  );
}
