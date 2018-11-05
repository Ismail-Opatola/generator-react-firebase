import React from 'react'
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress'

const LoadingSpinner = ({ size, classes }) => (
  <div className={classes.container}>
    <div className={classes.progress}>
      <CircularProgress mode="indeterminate" size={size || 80} />
    </div>
  </div>
)

LoadingSpinner.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  size: PropTypes.number
}

export default LoadingSpinner
