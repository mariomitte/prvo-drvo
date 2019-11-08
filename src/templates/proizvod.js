import React from 'react'
import { Link, graphql } from 'gatsby'
import { LocaleContext } from '../components/layout'
import SEO from '../components/SEO'

export const query = graphql`
query ProizvodDetailQuery($uid: String!, $locale: String!) {
  proizvod: prismicProizvod(uid: { eq: $uid }, lang: { eq: $locale }) {
    uid
    first_publication_date
    last_publication_date
    data {
      product_description {
        html
        text
      }
      product_image {
        alt
        copyright
        url
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

const RenderSirovine = ({ sirovine }) => {
  return sirovine.map((item) =>
    <li key={item.product1.document[0].slugs}>
      <p className="products-grid-item-name">
        <a href={item.product1.document[0].slugs}>
          {item.product1.document[0].data.title.text}
        </a>
      </p>
    </li>
  )
}

const RenderBody = ({ proizvod }) => (
  <React.Fragment>
    <div className="l-wrapper">
      <hr className="separator-hr" />
    </div>

    <div className="product-sections-wrapper">
      <section>
        <div className="l-wrapper">
          <div className="product-hero-inner">
            <img className="product-hero-image" src={proizvod.data.product_image.url} alt={proizvod.data.product_image.alt} />
            <div className="product-hero-content">
              <div className="product-hero-name">
                {proizvod.data.product_name.text}
              </div>
              <div className="product-hero-rich-content">
                {proizvod.data.rich_content.text}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="product-description">
        <div className="l-wrapper">
          <div className="product-description-title">
            {proizvod.data.title.text}
          </div>
          <div className="product-description-content">
            {proizvod.data.product_description.text}
          </div>
        </div>
      </section>

      <div className="product-separator-wrapper">
        <div className="l-wrapper">
          <hr className="separator-hr" />
        </div>
      </div>

      <section>
        <div className="l-wrapper">
          <header className="products-grid-header">
            <div className="products-grid-header-title">
              {proizvod.data.sirovina_naziv.text}
            </div>
          </header>
        </div>
        <ul className="products-grid-items-wrapper">
          <RenderSirovine sirovine={proizvod.data.sirovine} />
        </ul>
      </section>

    </div>

    <div data-wio-id={proizvod.data.uid}></div>
  </React.Fragment>
)

const Product = ({ data: { proizvod }, location, pageContext: { locale } }) => {
  const lang = React.useContext(LocaleContext)
  const i18n = lang.i18n[lang.locale]

  console.log(proizvod.data.product_image.url)

  return (
    <>
      <SEO
        title={`${proizvod.data.product_name.text} | ${i18n.defaultTitleAlt}`}
        banner={proizvod.data.product_image.url}
        pathname={location.pathname}
        locale={locale}
        desc={proizvod.data.product_description.text}
        node={proizvod}
        article
      />
      <RenderBody
        proizvod={proizvod} />
    </>
  )
}

export default Product
