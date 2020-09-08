import React, { forwardRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Slide from '@material-ui/core/Slide'
import CloseIcon from '@material-ui/icons/Close'
import EventAvailableIcon from '@material-ui/icons/EventAvailable'
import EventBusyIcon from '@material-ui/icons/EventBusy'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import BallotIcon from '@material-ui/icons/Ballot'
import LocationOffIcon from '@material-ui/icons/LocationOff'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import * as m from 'moment-timezone'
import moment from 'moment'
import CarouselComponent from '../../components/Carousel'

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />
})

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    color: 'white',
    flex: 1
  },
  content: {
    maxWidth: '100%'
  },
  carouselComponent: {
    justifyContent: 'center',
    margin: 'auto'
  }
}))

const OfferDetails = ({ offer, open, setOpen }) => {
  const classes = useStyles()
  const timezone = moment.tz.guess()

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={() => setOpen(false)}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setOpen(false)}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h1" className={classes.title}>
            Offer details
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={3} className={classes.content}>
        <Grid item xs={12}>
          <Typography variant="h6" className={classes.title}>
            Icon with text
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <EventAvailableIcon color="secondary" />
              </ListItemIcon>
              <ListItemText>
                <strong>Start date: </strong>
                {m(offer.start_date)
                  .tz(timezone)
                  .format('DD MMMM YYYY, h:mm:ss a z')}
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <EventBusyIcon color="secondary" />
              </ListItemIcon>
              <ListItemText>
                <strong>End date: </strong>{' '}
                {m(offer.end_date)
                  .tz(timezone)
                  .format('DD MMMM YYYY, h:mm:ss a z')}
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <BallotIcon color="secondary" />
              </ListItemIcon>
              <ListItemText>
                <strong>Quantity to redeem: </strong> {offer.quantity}
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                {offer.online_only ? (
                  <LocationOffIcon color="secondary" />
                ) : (
                  <LocationOnIcon color="secondary" />
                )}
              </ListItemIcon>
              <ListItemText>
                {offer.online_only ? 'Online only' : 'Physical location'}
              </ListItemText>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={6} className={classes.carouselComponent}>
          <CarouselComponent images={JSON.parse(offer.images)} />
        </Grid>
      </Grid>
    </Dialog>
  )
}

OfferDetails.prototype = {
  offer: PropTypes.object,
  open: PropTypes.bool,
  setOpen: PropTypes.func
}

export default OfferDetails
