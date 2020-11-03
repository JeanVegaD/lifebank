import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'

import { useLazyQuery } from '@apollo/react-hooks'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import routes from './routes'
import { MainContainer, TopBar, SideBar } from './containers'
import MedicalClinicStructuredData from './components/MedicalClinicStructuredData'
import SplashIntro from './components/SplashIntro'
import { useUser } from './context/user.context'
import { GET_VALID_LIFEBANKS_QUERY } from './gql'

const App = ({ ual }) => {
  const [validLifebanks, setValidLifebanks] = useState([])
  const [currentUser, { logout }] = useUser()
  const [cookies, setCookie] = useCookies(['splash'])

  const [loadValidLifebanks, { data }] = useLazyQuery(GET_VALID_LIFEBANKS_QUERY, {
    fetchPolicy: 'network-only'
  })

  useEffect(() => {
    if (validLifebanks.length === 0) loadValidLifebanks()
    console.log("validLifebanks", validLifebanks)
  }, [loadValidLifebanks])

  useEffect(() => {
    if (data) setValidLifebanks(data.get_valid_lifebanks)
    console.log("data", data)
  }, [data])

  return (
    <BrowserRouter>
      {!cookies.splash ? (
        <SplashIntro
          skipHandling={(cookie) => {
            const d = new Date()
            d.setMonth(d.getMonth() + 3)
            setCookie(cookie, undefined, {
              expires: d
            })
          }}
        />
      ) : (
          <MainContainer
            topbarContent={<TopBar user={currentUser} onLogout={logout} />}
            sidebarContent={<SideBar user={currentUser} onLogout={logout} />}
          >
            {validLifebanks.length > 0 && (
              <>
                {validLifebanks.map((element, key) => (
                  <MedicalClinicStructuredData
                    key={key}
                    name={element.name}
                    openingHours={element.openingHours}
                    address={element.address}
                    logo={element.logo}
                    email={element.email}
                    description={element.description}
                    location={element.location}
                    telephone={element.telephone}
                  />
                ))}
              </>
            )}
            <Grid container justify="center" alignItems="center">
              <Switch>
                {routes.map(({ path, component: Component, ...args }) => (
                  <Route key={`path-${path}`} path={path} {...args}>
                    <Component ual={ual} />
                  </Route>
                ))}
                <Redirect to="/not-found" />
              </Switch>
            </Grid>
          </MainContainer>
        )}
    </BrowserRouter>
  )
}

App.propTypes = {
  ual: PropTypes.object
}

export default App
