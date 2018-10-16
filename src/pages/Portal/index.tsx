import * as React from 'react'
import { connect } from 'react-redux'
import { requestContactsByPhoneNumber } from '@/redux/saga/models/contacts'

const styles = require('./index.scss')

interface PassProps {}

const mapStateToProps = (state: IStore.IRoot) => ({
  contact: state.contact,
})

const mapDispatchToProps = {
  requestContactsByPhoneNumber,
}

type Props = PassProps &
  ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps

interface State {}

class Portal extends React.Component<Props, State> {
  state: State = {}

  componentDidMount() {
    this.props.requestContactsByPhoneNumber('123')
  }

  public render() {
    console.log('contact', this.props.contact)
    // if (this.props.contact.items.length > 0) {
    //   this.props.contact.items[0].id = '2333'
    // }
    return <div className={styles.wrapper}>Portal</div>
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Portal)
