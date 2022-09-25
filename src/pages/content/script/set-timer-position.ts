interface SetTimerPosition {
  element: HTMLElement
}

export const setTimerPosition = ({ element }: SetTimerPosition): void => {
  const onChange = () => {
    const isDesktop = window.matchMedia('(min-width: 1024px)')
    element.style.position = 'absolute'
    element.style.right= isDesktop.matches ? '328px' : '243px'
    isDesktop.addEventListener('change', onChange, { once: true })
  }

  onChange()
}
