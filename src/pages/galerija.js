import React from "react"
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

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
  const { fluid } = fotografija.naziv_slike.localFile.childImageSharp

  return <Img className="rounded m-2 gallery-photo-item" fluid={fluid} />
}

const RenderGallery = ({ galerija }) => {
  return galerija.map((item, i) =>
    <div key={i} className="gallery-item">
      <Fotografija fotografija={item} />
    </div>
  )
}

export default ({ data: { svaGalerija } }) => {

  const showAll = svaGalerija.edges[0].node.data

  return (
    <div style={{ minHeight: "80vh" }} className="mt-4 container">
      <div className="gallery d-flex">
        <RenderGallery galerija={showAll.general} />
      </div>
    </div>
  );
}
