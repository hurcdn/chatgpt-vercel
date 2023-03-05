import { copyToClipboard } from "../utils"

export function useCopyCode() {
  const timeoutIdMap: Map<HTMLElement, NodeJS.Timeout> = new Map()
  window.addEventListener("click", e => {
    const el = e.target as HTMLElement
    if (el.matches(".code-copy")) {
      const parent = el.parentElement
      const sibling = el.nextElementSibling as HTMLPreElement | null
      if (!parent || !sibling) {
        return
      }

      let text = sibling.innerText

      copyToClipboard(text).then(() => {
        el.classList.add("copied")
        clearTimeout(timeoutIdMap.get(el))
        const timeoutId = setTimeout(() => {
          el.classList.remove("copied")
          el.blur()
          timeoutIdMap.delete(el)
        }, 2000)
        timeoutIdMap.set(el, timeoutId)
      })
    }
  })
}
