import React from "react"
import { graphql } from 'gatsby'
import SEO from '../components/SEO'

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
      title_ostalo {
        html
        text
      }
      sadrzaj_ostalo {
        html
        text
      }
      title1 {
        html
        text
      }
      about {
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
    <section className="container about">
      <div class="mt-5 mb-5">
        <h1 className="mb-5">{home.title1.text}</h1>
        <div dangerouslySetInnerHTML={{ __html: home.about.html }} />
      </div>
    </section>
    <section className="container other">
      <div>
        <h4 className="mb-4">{home.title_ostalo.text}</h4>
        <p>{home.sadrzaj_ostalo.text}</p>
      </div>
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
