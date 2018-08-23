import * as React from 'react'
import LoginForm from '@/components/LoginForm'
import logo from '@/assets/logo.svg'
import { connect } from 'react-redux'
import { getContacts, setContactsEmail } from '@/redux/actionCreators/contacts'

const styles = require('./index.scss')

const mapStateToProps = (state: IStore.IRoot) => ({
  items: state.contact.items,
  test: state.contact.test,
})
const mapDispatchToProps = {
  getContacts,
  setContactsEmail,
}

type Props = {
  items: any
  test: string
} & typeof mapDispatchToProps
interface State {}

class Login extends React.Component<Props, State> {
  onClick = () => {
    this.props.getContacts({ phoneNumber: '123456' })
  }

  componentDidMount() {
    this.props.getContacts({})
  }
  public render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <img src={logo} />
          <h1>Sign in to GitHub</h1>
        </div>
        <LoginForm />
        <div onClick={this.onClick}>get contacts by phone number</div>
        <div>{this.props.test}</div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
