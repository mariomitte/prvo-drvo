import React from "react"

import { LocaleContext } from '../components/layout'

export default () => {
  const lang = React.useContext(LocaleContext)

  console.log(lang)

  return (
    <>
      Hello world!
    </>
  )
}
