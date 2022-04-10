// import logo from './logo.svg';
import './App.css';
import React from 'react'
// import ReactDom from 'react-dom'
import {
  withRouter,
  Switch,
  Route,
  Redirect,
  Link
} from 'react-router-dom'
import {
  // CssBaseline,
  ThemeProvider,
  createTheme,
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

class App extends React.Component {
  #title = 'Aaron Peter Samuel'
  #defaultTheme = createTheme(darkTheme)
  #drawerWidth = 200

  constructor(props) {
    super(props)
    this.props = { ...props }
    this.state = {
      colorMode: 'dark',
      theme: this.#defaultTheme
    }
    this.toggleColorMode = this.toggleColorMode.bind(this)
    this.darkTheme = createTheme(darkTheme)
    this.lightTheme = createTheme(lightTheme)
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

  // eventHandler(state) {
  //   console.log(state)
  // }

  render() {
    const title = this.#title
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
                <p>Testing 123</p>
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/resume">
                <Resume />
              </Route>
              <Route path="/blog">
                <Blog {...this.props}/>
              </Route>
              <Route path="/contact">
                <Contact />
              </Route>
            </Switch>
          </Box>
        </ThemeProvider>
      </div>
    );
  }
}

export default withRouter(App);
