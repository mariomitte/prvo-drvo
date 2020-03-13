import React from 'react'
import { graphql } from 'gatsby'
import { LocaleContext } from '../components/layout'
import SEO from '../components/SEO'
import Img from 'gatsby-image'

export const query = graphql`
query NovostDetailQuery($uid: String!, $locale: String!) {
  novost: prismicNovosti(uid: { eq: $uid }, lang: { eq: $locale }) {
    uid
    first_publication_date
    last_publication_date
    data {
      meta_description {
        html
        text
      }
      meta_title {
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
      rich_content {
        html
        text
      }
    }
  }
}
`

const NovostFotografija = ({ novost }) => {
  const { fluid } = novost.product_image.localFile.childImageSharp

  return <Img className="mt-2 mb-4 rounded-lg" fluid={fluid} />
}

const RenderBody = ({ novost }) => (
  <React.Fragment>
    <div className="container mb-5">
      <section className="d-flex justify-content-center">
        <div className="products-section">
          <div className="product-hero-inner">
            <NovostFotografija novost={novost} />
            <div className="product-hero-content">
              <h1>{novost.product_name.text}</h1>
              <div className="mt-4 product-hero-rich-content">
                {novost.rich_content.text}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div data-wio-id={novost.uid}></div>
  </React.Fragment>
)

const Novost = ({ data: { novost }, location, pageContext: { locale } }) => {
  const lang = React.useContext(LocaleContext)
  const i18n = lang.i18n[lang.locale]

  return (
    <>
      <SEO
        title={`${novost.data.meta_title.text} | ${i18n.defaultTitleAlt}`}
        banner={novost.data.product_image.localFile.childImageSharp.fluid.src}
        pathname={location.pathname}
        locale={locale}
        desc={novost.data.meta_description.text}
        node={novost}
        article
      />
      <RenderBody
        novost={novost.data} />
    </>
  )
}

export default Novost
