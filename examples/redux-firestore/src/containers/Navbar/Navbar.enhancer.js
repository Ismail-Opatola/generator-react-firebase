import { connect } from 'react-redux'
import {
  withHandlers,
  compose,
  withProps,
  flattenProp,
  withStateHandlers
} from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { withFirebase, isEmpty, isLoaded } from 'react-redux-firebase'
import { ACCOUNT_PATH } from 'constants/paths'
import { spinnerWhileLoading } from 'utils/components'
import styles from './Navbar.styles'

export default compose(
  connect(({ firebase: { auth, profile } }) => ({
    auth,
    profile
  })),
  withStateHandlers(
    ({ accountMenuOpenInitially = false }) => ({
      accountMenuOpen: accountMenuOpenInitially,
      anchorEl: null
    }),
    {
      closeAccountMenu: ({ accountMenuOpen }) => () => ({
        anchorEl: null
      }),
      handleMenu: () => event => ({
        anchorEl: event.target
      })
    }
  ),
  // Add props.router (used in handlers)
  withRouter,
  // Add props.firebase (used in handlers)
  withFirebase,
  // Handlers
  withHandlers({
    handleLogout: props => () => {
      props.firebase.logout()
      props.router.push('/')
      props.closeAccountMenu()
    },
    goToAccount: props => () => {
      props.history.push(ACCOUNT_PATH)
      props.closeAccountMenu()
    }
  }),
  withProps(({ auth, profile }) => ({
    authExists: isLoaded(auth) && !isEmpty(auth)
  })),
  // Flatten profile so that avatarUrl and displayName are available
  flattenProp('profile'),
  withStyles(styles)
)
