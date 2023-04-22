import * as PropTypes from 'prop-types'
import * as React from 'react'
import { AvatarStyle, OptionContext } from 'avataaars'

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
    return null
  }
  private onOptionValueChange = (key: string, value: string) => {
    this.forceUpdate()
  }
}
