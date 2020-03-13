import React from 'react'
import { graphql } from 'gatsby'
import { LocaleContext } from '../components/layout'
import SEO from '../components/SEO'
import Img from 'gatsby-image'

export const query = graphql`
query ProizvodDetailQuery($uid: String!, $locale: String!) {
  proizvod: prismicProizvod(uid: { eq: $uid }, lang: { eq: $locale }) {
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
      product_description {
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
      title {
        html
        text
      }
      rich_content {
        html
        text
      }
      sirovina_naziv {
        html
        text
      }
      sirovine {
        product1 {
          document {
            id
            slugs
            data {
              title {
                html
                text
              }
            }
          }
        }
      }
    }
  }
}
`

const ProizvodFotografija = ({ proizvod }) => {
  const { fluid } = proizvod.product_image.localFile.childImageSharp

  return <Img className="mt-2 mb-4 rounded-lg" fluid={fluid} />
}

const RenderSirovine = ({ sirovine }) => {
  return sirovine.map((item) =>
    <li className="pt-1 pb-1" key={item.product1.document[0].slugs}>
      {item.product1.document[0].data.title.text}
    </li>
  )
}

const RenderBody = ({ proizvod }) => (
  <React.Fragment>
    <div className="container mb-5">
      <section className="d-flex justify-content-center">
        <div className="products-section">
          <div className="product-hero-inner">
            <ProizvodFotografija proizvod={proizvod} />
            <div className="product-hero-content">
              <h1>{proizvod.product_name.text}</h1>
              <div className="mt-4 product-hero-rich-content">
                {proizvod.rich_content.text}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-4 product-description">
        <div className="l-wrapper">
          <div className="product-description-title">
            {proizvod.title.text}
          </div>
          <div className="product-description-content">
            {proizvod.product_description.text}
          </div>
        </div>
      </section>

      <div className="product-separator-wrapper">
        <div className="l-wrapper">
          <hr className="separator-hr" />
        </div>
      </div>

      <section>
        <div className="mb-2">
          <header className="products-grid-header">
            <div className="font-weight-bold products-grid-header-title">
              {proizvod.sirovina_naziv.text}
            </div>
          </header>
        </div>
        <div className="container">
          <ul className="d-flex flex-column">
            <RenderSirovine sirovine={proizvod.sirovine} />
          </ul>
        </div>
      </section>

    </div>

    <div data-wio-id={proizvod.uid}></div>
  </React.Fragment>
)

const Product = ({ data: { proizvod }, location, pageContext: { locale } }) => {
  const lang = React.useContext(LocaleContext)
  const i18n = lang.i18n[lang.locale]

  return (
    <>
      <SEO
        title={`${proizvod.data.meta_title.text} | ${i18n.defaultTitleAlt}`}
        banner={proizvod.data.product_image.localFile.childImageSharp.fluid.src}
        pathname={location.pathname}
        locale={locale}
        desc={proizvod.data.meta_description.text}
        node={proizvod}
        article
      />
      <RenderBody
        proizvod={proizvod.data} />
    </>
  )
}

export default Product
