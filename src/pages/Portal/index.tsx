import * as React from 'react'
import { connect } from 'react-redux'
import contactsSaga from '@/redux/saga/contacts'

const styles = require('./index.scss')

interface PassProps {}

const mapStateToProps = (state: IStore.IRoot) => ({
  contact: state.contact,
})

type Props = PassProps & ReturnType<typeof mapStateToProps>

interface State {}

class Portal extends React.Component<Props, State> {
  state: State = {}

  componentDidMount() {
    contactsSaga.requestContactsByPhoneNumber('123', true)
  }

  public render() {
    console.log('contact', this.props.contact)
    // if (this.props.contact.items.length > 0) {
    //   this.props.contact.items[0].id = '2333'
    // }
    return <div className={styles.wrapper}>Portal</div>
  }
}

export default connect(mapStateToProps)(Portal)
