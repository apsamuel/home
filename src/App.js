import './App.css';
import React from 'react'

import {
  library
} from '@fortawesome/fontawesome-svg-core'
import {
  fab
} from '@fortawesome/free-brands-svg-icons'
import {
  faCheckSquare,
  faCoffee
} from '@fortawesome/free-solid-svg-icons'

// fab['  ']
import {
  withRouter,
  Switch,
  Route,
} from 'react-router-dom'
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
  Box
} from '@mui/material'
import {
  darkTheme,
  lightTheme
} from './themes/basic'
import HomeHeader from './components/Header';
import About from './components/About'
import Resume from './components/Resume'
import Blog from './components/Blog'
import Contact from './components/Contact'

library.add(fab, faCheckSquare, faCoffee)

class App extends React.Component {
  #title = 'Aaron Peter Samuel'
  #defaultTheme = responsiveFontSizes( createTheme(darkTheme))
  #drawerWidth = 200

  constructor(props) {
    super(props)
    // this.props = { ...props }
    this.state = {
      colorMode: 'dark',
      theme: this.#defaultTheme
    }
    this.toggleColorMode = this.toggleColorMode.bind(this)
    this.darkTheme = responsiveFontSizes (createTheme(darkTheme))
    this.lightTheme = responsiveFontSizes( createTheme(lightTheme) )
  }

  toggleColorMode(componentState) {
    this.setState(state => ({
      ...state,
      theme: componentState.darkMode
      ? this.darkTheme
      : this.lightTheme,
      colorMode: componentState.darkMode
      ? 'dark'
      : 'light'
    }))
  }

  componentDidMount() {
    console.log(this.props)
  }


  render() {
    const title = this.#title
    // const title = 'Dark Photon Consultation'
    const { colorMode } = this.state
    const selectedTheme = colorMode === 'dark'
      ? this.darkTheme
      : this.lightTheme
    return (
      <div className="App">
        <ThemeProvider theme={selectedTheme}>
          {/* Header Navigation, sticky across all views */}
          <HomeHeader
            {...this.props}
            title={title}
            drawerWidth={this.#drawerWidth}
            theme={selectedTheme}
            onChange={this.toggleColorMode}
          />

          {/* Content Section */}
          <Box
            style={{
              paddingTop: 10,
            }}
          >
            <Switch>
              <Route exact path="/">
                <p>Home Content</p>
              </Route>
              <Route path="/about">
                <About { ...this.props }/>
              </Route>
              <Route path="/resume">
                <Resume { ...this.props }/>
              </Route>
              <Route path="/blog">
                <Blog {...this.props}/>
              </Route>
              <Route path="/contact">
                <Contact {...this.props} />
              </Route>
            </Switch>
          </Box>
        </ThemeProvider>
      </div>
    );
  }
}

export default withRouter(App);
