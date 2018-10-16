import * as React from 'react'
import { connect } from 'react-redux'
import { match } from 'react-router'

const styles = require('./index.scss')

interface PassProps {
  match: match<{ id: string; name: string }>
}

const mapStateToProps = (state: any) => ({})

const mapDispatchToProps = {}

type Props = PassProps &
  ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps

interface State {}

class Profile extends React.Component<Props, State> {

  public render() {
    return (
      <div className={styles.wrapper}>
        id: {this.props.match.params.id}, name: {this.props.match.params.name}
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
