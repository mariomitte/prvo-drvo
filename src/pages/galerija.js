import React from "react"
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import config from '../../config/website'

export const query = graphql`
query GalerijaQuery($locale: String!){
  svaGalerija: allPrismicGalerija(filter: { lang: { eq: $locale } }) {
    edges {
      node {
        data {
          general {
            naziv_slike {
              alt
              copyright
              url
              localFile {
                childImageSharp {
                  fluid(maxWidth: 500, quality: 90) {
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
          }
        }
        id
        type
      }
    }
  }
}
`

const Fotografija = ({ fotografija }) => {
  console.log(fotografija)
  const { fluid } = fotografija.naziv_slike.localFile.childImageSharp

  return <Img className="rounded m-2" fluid={fluid} />
}

const RenderGallery = ({ galerija }) => {
  return galerija.map((item, i) =>
    <div key={i} className="gallery-item">
      <Fotografija fotografija={item} />
    </div>
  )
}

export default ({ data: { svaGalerija }, pageContext: { locale }, location }) => {

  const showAll = svaGalerija.edges[0].node.data

  return (
    <>
      <RenderGallery galerija={showAll.general} />
    </>
  );
}
