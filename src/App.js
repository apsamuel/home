// import logo from './logo.svg';
import './App.css';
import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material'
import { darkTheme, lightTheme } from './themes/basic'
import HomeHeader from './components/Header';

// const theme = createTheme({
//   mode: 'dark',
//   palette: {
//     primary: {
//       main: '#fff'
//     },
//     secondary: {
//       main: '#351436'
//     }
//   }
// })

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      colorMode: 'dark'
    }
    this.toggleColorMode = this.toggleColorMode.bind(this)
    // this.eventHandler = this.eventHandler.bind(this)
    this.theme = createTheme({
      mode: 'dark',
      shape: {
        borderRadius: 4
      },
      palette: {
        primary: {
          main: '#fff',
        },
        secondary: {
          main: '#351436',
        },
      },
    });
    this.darkTheme = createTheme(darkTheme)
    this.lightTheme = createTheme(lightTheme)
  }

  toggleColorMode(componentState) {
    this.setState(state => ({
      ...state,
      colorMode: componentState.darkMode
      ? 'dark'
      : 'light'
    }))
  }

  eventHandler(state) {
    console.log(state)
  }

  render() {
    const { colorMode } = this.state
    return (
      <div className="App">
        <ThemeProvider theme={ colorMode === 'dark' ? this.darkTheme : this.lightTheme }
        >
          <HomeHeader onChange={this.toggleColorMode}/>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
