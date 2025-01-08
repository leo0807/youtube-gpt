import type { PlasmoCSConfig, PlasmoGetInlineAnchor, PlasmoGetShadowHostId } from "plasmo"
import cssText from "data-text:~style.css"
import Extension from "~*/components/extension"
import Provider from "~*/components/provider"

const INJECTED_ELEMENT_ID = "#secondary.style-scope.ytd-watch-flexy"

export const getStyle = () => {
  const baseFontSize = 12
  let updatedCssText = cssText.replaceAll(":root", ":host(plasmo-csui)")
  const remRegex = /([\d.]+)rem/g
  updatedCssText = updatedCssText.replace(remRegex, (match, remValue) => {
    const pxValue = parseFloat(remValue) * baseFontSize
    return `${pxValue}px`
  })
  const style = document.createElement("style")
  style.textContent = updatedCssText
  return style
}

export const config: PlasmoCSConfig = {
  matches: ["https://www.youtube.com/*"]
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => ({
  element: document.querySelector(INJECTED_ELEMENT_ID),
  insertPosition: "afterbegin"
})

export const getShadowHostId: PlasmoGetShadowHostId = () => "plasmo-inline"

function PlasmoMainUI() {
  return (
    <Provider>
      <Extension />
    </Provider>
  )
}


export default PlasmoMainUI