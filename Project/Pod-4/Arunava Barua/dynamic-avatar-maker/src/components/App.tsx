import * as React from 'react'

import Main from './Main'
import history from '../history'
import Generator from './Generate'
import { Button } from 'react-bootstrap'
export default class App extends React.Component {
  clickhandler() {
    localStorage.setItem('imageset', 'false')
    window.location.reload()
  }

  componentDidMount() {
    // force an update if the URL changes
    history.listen(() => this.forceUpdate())
  }

  render() {
    return (
      <>
        {localStorage.getItem('imageset') === 'true' ? (
          <Button variant='primary' type='submit' onClick={this.clickhandler}>
            Image has been set , click to re edit
          </Button>
        ) : (
          <Main />
        )}
        {localStorage.getItem('imageset') === 'true' ? <Generator /> : null}
      </>
    )
  }
}
