import * as React from 'react'
import TopBar from '@/components/TopBar'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import { replace, push } from 'react-router-redux'
import Join from '@/pages/Join'
import Login from '@/pages/Login'
import Portal from '@/pages/Portal'
import Profile from '@/pages/Profile'
import NotFound from '@/components/NotFound'
import Forbidden from '@/components/Forbidden'
import history from '@/redux/history'

interface PassProps {}

const mapStateToProps = (state: IStore.IRoot) => ({
  contacts: state.contact.items,
  test: state.contact.test,
})

const mapDispatchToProps = {
  replace,
  push,
}

type Props = PassProps & {
  contacts: any
  test: string
} & typeof mapDispatchToProps

interface State {}

class App extends React.Component<Props, State> {
  pushToPortal = () => {
    this.props.push('/portal')
  }
  pushToJoin = () => {
    this.props.push('/join')
  }
  replaceToLogin = () => {
    this.props.replace('/login')
  }

  renderProfile = (props: RouteComponentProps<null>) => {
    return <Profile {...props} />
  }

  public render() {
    return (
      <div>
        <TopBar />
        <Switch>
          <Route path="/join" component={Join} />
          <Route path="/login" component={Login} />
          <Route path="/portal" component={Portal} />
          <Route path="/profile/:id&:name" component={this.renderProfile} />
          <Route path="/404" component={NotFound} />
          <Route path="/403" component={Forbidden} />
          <Redirect from="/admin" to="/" />
        </Switch>
        <div onClick={this.pushToPortal}>=> portal</div>
        <div onClick={this.pushToJoin}>=> join</div>
        <div onClick={this.replaceToLogin}>=> login</div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
