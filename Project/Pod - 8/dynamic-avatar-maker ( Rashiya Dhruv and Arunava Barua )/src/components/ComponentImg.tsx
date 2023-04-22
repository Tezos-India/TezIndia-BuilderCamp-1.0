import * as PropTypes from 'prop-types'
import * as React from 'react'
import { AvatarStyle, OptionContext, allOptions } from 'avataaars'

export interface Props {
  avatarStyle: AvatarStyle
}

export default class ComponentCode extends React.Component<Props> {
  static contextTypes = {
    optionContext: PropTypes.instanceOf(OptionContext),
  }

  private get optionContext(): OptionContext {
    return this.context.optionContext
  }

  UNSAFE_componentWillMount() {
    this.optionContext.addValueChangeListener(this.onOptionValueChange)
  }

  componentWillUnmount() {
    this.optionContext.removeValueChangeListener(this.onOptionValueChange)
  }

  render() {
    const { avatarStyle } = this.props
    const { optionContext } = this
    const props: Array<string> = []
    
    for (const option of allOptions) {
      
      const state = optionContext.getOptionState(option.key)
      if (!state || !state.available) {
        continue
      }
      const value = optionContext.getValue(option.key)
      props.push(`${option.key}=${value}`)
    }
    const propsStr = props.join('&')
    const code = `<img src='https://avataaars.io/?avatarStyle=${avatarStyle}&${propsStr}'/>`
    localStorage.setItem('code', code)
    localStorage.setItem('imageset', "true")
    return null
  }

  private onOptionValueChange = (key: string, value: string) => {
    this.forceUpdate()
  }
}
