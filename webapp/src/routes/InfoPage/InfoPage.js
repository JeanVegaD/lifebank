import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Divider from '@material-ui/core/Divider'
import Slider from '@material-ui/core/Slider'
import { useLazyQuery, useMutation, useSubscription } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Fab from '@material-ui/core/Fab'
import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  cardBody: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    marginBottom: '0',
    marginTop: '16px',
    //borderStyle: 'groove'
  },
  headerCardBody: {
    width: '100%',
    height: '12%',
    //borderStyle: 'groove'
  },
  avatarSection: {
    width: '20%',
    height: '100%',
    //borderStyle: 'groove',
    float: 'left'
  },
  avatarRound: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginLeft: '16px',
    marginRight: '13px',
    marginTop: '13px',
  },
  tituleSection: {
    width: '80%',
    height: '100%',
    //borderStyle: 'groove',
    float: 'left'
  },
  bodyCard: {
    width: '100%',
    height: '88%',
    //borderStyle: 'groove'
  },
  imageSection: {
    width: '100%',
    //borderStyle: 'groove',
    height: '35%'
  },
  detailsSection: {
    width: '100%',
    height: '65%',
    //borderStyle: 'groove'
  },
  headerDetails: {
    width: '50%',
    height: '10%',
    marginTop: '4%',
    //borderStyle: 'groove',
    float: 'left'
  },
  bodyDetails: {
    width: '100%',
    height: '86%',
    //borderStyle: 'groove',
    float: 'left'
  },
  fabButton: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    boxShadow: '0 2px 6px 0 rgba(0, 0, 0, 0.18), 0 2px 4px 0 rgba(0, 0, 0, 0.24)',
    backgroundColor: '#ba0d0d',
    top: -585,
    margin: '0',
    right: 20,
    float: 'right',
    color: "#ffffff"
  },
  title: {
    width: '196px',
    height: '23px',
    fontFamily: 'Roboto',
    fontSize: '20px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '0.15px',
    color: 'rgba(0, 0, 0, 0.87)',
    marginRight: '60px',
    marginTop: '14px',
    marginBottom: '4px'
  },
  subtitle: {
    width: '194.4px',
    height: '16px',
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.43',
    letterSpacing: '0.25px',
    color: 'rgba(0, 0, 0, 0.6)',
    marginRight: '91.6px',
    marginTop: '4px',
  },
  label: {
    width: '77px',
    height: '16px',
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: '500',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.14',
    letterSpacing: '1px',
    color: 'rgba(0, 0, 0, 0.6)',
    marginLeft: '34px'
  },
  text: {
    width: '327px',
    height: '234px',
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.43',
    letterSpacing: '0.25px',
    color: 'rgba(0, 0, 0, 0.6)',
    marginLeft: '16px'
  },
  carruselImage: {
    height: '90%',
    marginTop: '-22px',
    width: '100%',
    maxWidth: '100%'
  },
  carousel: {
    maxWidth: '100%'
  },
  divider: {
    width: '100%'
  },
  boldText: {
    fontWeight: 'bold'
  },
  bloodDemand: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  markLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    '& h4': {
      fontSize: 18
    }
  },
  slider: {
    padding: theme.spacing(0, 2)
  },
  midLabel: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}))

const InfoPage = ({ profile }) => {
  const classes = useStyles()
  const [actualImageIndex, setActualImageIndex] = useState(0)
  const images = '["https://b122fe8e0b8ea4d16cb3-8420fc0ce05d0ddef095398ad3e98f10.ssl.cf5.rackcdn.com/hospital-trauma-mob.jpg", "https://d1lofqbqbj927c.cloudfront.net/monumental/2018/02/19141317/Calderon-Guardia-2.jpg"]'
  const numbers = JSON.parse(images)
  const valueLabelFormat = (value) => {
    switch (value) {
      case 1:
        return 'Low'
      case 2:
        return 'Medium'
      case 3:
        return 'High'
      default:
        return 'N/A'
    }
  }

  return (
    <Box className={classes.cardBody}>
      <div className={classes.headerCardBody}>
        <div className={classes.avatarSection}>
          <img className={classes.avatarRound} src="https://static.vecteezy.com/system/resources/previews/001/194/392/non_2x/red-cross-png.png" alt="Avatar"></img>
        </div>
        <div className={classes.tituleSection}>
          <h2 className={classes.title}>Metropolitan Hospital</h2>
          <h3 className={classes.subtitle}>Hospital</h3>
        </div>
      </div>
      <div className={classes.bodyCard}>
        <div className={classes.imageSection}>
          <Carousel
            value={actualImageIndex}
            className={classes.carousel}
            onChange={(val) => setActualImageIndex(val)}
            plugins={[
              'arrows',
              {
                resolve: slidesToShowPlugin,
                options: {
                  numberOfSlides: 1
                }
              }
            ]}
          >
            {numbers.map((url, key) => (
              <img className={classes.carruselImage} src={url} key={key} alt={`${key}`} />
            ))}
          </Carousel>
        </div>
        <div className={classes.detailsSection}>
          <div className={classes.headerDetails}>
            <Button
              className={classes.label}
              startIcon={<LocationOnIcon color="action" />}
            >
              Location
            </Button>
          </div>
          <div className={classes.headerDetails}>
            <Button
              className={classes.label}
              startIcon={<CalendarTodayIcon color="action" />}
            >
              Schedule
            </Button>
          </div>
          <div className={classes.bodyDetails}>
            <Divider className={classes.divider} />
            <Box className={classes.rowBox, classes.midLabel}>
              <Typography className={classes.boldText} variant="subtitle1">Description</Typography>
              <Typography variant="body1"> We are an institution created to save lives through the
              collection of blood. Remember that giving blood is giving life.
              </Typography>
            </Box>
            <Divider className={classes.divider} />
            <Box className={classes.rowBox, classes.midLabel}>
              <Typography className={classes.boldText} variant="subtitle1">Address</Typography>
              <Typography variant="body1">Siquirres, Limon, Costa Rica</Typography>
            </Box>
            <Divider className={classes.divider} />
            <Box className={classes.rowBox, classes.midLabel}>
              <Typography className={classes.boldText} variant="subtitle1">Email</Typography>
              <Typography variant="body1">BancoSangre@mail.com</Typography>
            </Box>
            <Divider className={classes.divider} />
            <Box className={classes.rowBox, classes.midLabel}>
              <Typography className={classes.boldText} variant="subtitle1">Telephone</Typography>
              <Typography variant="body1">800-010-800</Typography>
            </Box>
            <Divider className={classes.divider} />
            <Box className={classes.rowBox, classes.midLabel}>
              <Typography className={classes.boldText} variant="subtitle1">Blood urgency level</Typography>
              <Box className={classes.bloodDemand}>
                <Box className={classes.markLabel}>
                  <Typography variant="body1" className={classes.midLabel}>Low</Typography>
                  <Typography variant="body1" className={classes.midLabel}>Medium</Typography>
                  <Typography variant="body1" className={classes.midLabel}>Urgent</Typography>
                </Box>
                <Box className={classes.slider}>
                  <Slider
                    valueLabelDisplay="off"
                    color="secondary"
                    defaultValue={2}
                    //valueLabelFormat={valueLabelFormat}
                    step={null}
                    min={1}
                    max={3}
                  />
                </Box>
              </Box>
            </Box>
          </div>
        </div>
      </div>
      <Fab className={classes.fabButton}>
        <FavoriteIcon className={classes.iconFab} />
      </Fab>
    </Box>
  )
}

export default InfoPage
