import React from 'react'

// import { withStyles } from '@mui/material'
import {
  Box,
  AppBar,
  Toolbar,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Menu,
  MenuItem,
  Switch,
  FormGroup,
  FormControlLabel,
  Typography,
  Button,
  IconButton,
} from '@mui/material'

import {
  Menu as MenuIcon
} from '@mui/icons-material'

const headerListData = [
  {
    name: 'About'
  },
  {
    name: 'Resume'
  },
  {
    name: 'Blog',
  },
  {
    name: 'Contact'
  }
]

const headerList = () => (
  <Box
    sx={{ width: 'auto' }}
    role="presentation"
  >
    <List>
      {headerListData.map( (item, index) => (
        <ListItem button key={item.name}>
          <ListItemText primary={item.name} />
        </ListItem>
      ) )}
    </List>
  </Box>
);

class HomeHeader extends React.Component {
  constructor(props) {
    super(props);
    // unwrap props
    this.props = { ...props };
    // state
    this.state = {
      anchorMenuElement: false,
      drawerOpen: false,
      darkMode: false,
    }
    // reactive handlers

    this.handleMenu = this.handleMenu.bind(this)
    this.handleSwitch = this.handleSwitch.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleDrawer = this.handleDrawer.bind(this)
  }

  handleSwitch(event) {

    // console.log(event);
    this.setState((state) => ({
      ...state,
      darkMode: event.target.checked,
    }));
    if (this.props.onChange) {
      this.props.onChange(this.state);
    }
    console.log(`the theme switch was toggled to ${this.state.darkMode ? 'dark' : 'light'} mode`);
  }

  handleMenu(event) {
    if (this.state.anchorMenuElement === true) {
      console.log(`menu item closed at ${new Date().toJSON()}`)
    } else {
      console.log(`menu item opened at ${new Date().toJSON()}`)
    }

    this.setState(state => ({
      ...state,
      anchorMenuElement: !this.state.anchorMenuElement
    }))
  }

  handleDrawer(event) {
    // const keyEvent = (event as React.KeyboardEvent).key
    // console.log(event)
    this.setState((state) => ({
      ...state,
      drawerOpen: !this.state.drawerOpen
    }))
    console.log(`drawer item opened at ${new Date().toJSON()}`)
  }

  handleClose(event) {
    // console.log(event)
    console.log(`menu item closed at ${new Date().toJSON()} by ${event.target.id}`);
    this.setState(state => ({
      ...state,
      anchorMenuElement: false
    }))
  }

  render() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={this.handleMenu}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={this.state.anchorMenuElement}
              open={Boolean(this.state.anchorMenuElement)}
              onClose={this.handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              keepMounted
            >
              <MenuItem id="about-me" onClick={this.handleClose}>
                About Me
              </MenuItem>
              <MenuItem id="resume" onClick={this.handleClose}>
                Resume
              </MenuItem>
              <MenuItem id="blog" onClick={this.handleClose}>
                Blog
              </MenuItem>
              <MenuItem id="contact" onClick={this.handleClose}>
                Contact
              </MenuItem>
            </Menu>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Aaron Peter Samuel
            </Typography>

            <div>
              <React.Fragment>
                <Button onClick={this.handleDrawer}>Menu</Button>
                <SwipeableDrawer
                  anchor={'left'}
                  open={this.state.drawerOpen}
                  onClose={this.handleDrawer}
                  onOpen={this.handleDrawer}
                >
                  {
                    <Box
                      sx={{ width: 'auto' }}
                      role="presentation"
                      onClick={this.handleDrawer}
                      onKeyDown={this.handleDrawer}
                    >
                      <List>
                        {headerListData.map((item, index) => (
                          <ListItem button key={item.name}>
                            <ListItemText primary={item.name} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  }
                </SwipeableDrawer>
              </React.Fragment>
            </div>

            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    aria-label="theme-switch"
                    checked={this.state.darkMode}
                    onChange={this.handleSwitch}
                  />
                }
                label={this.state.darkMode ? 'light mode' : 'dark mode'}
              ></FormControlLabel>
            </FormGroup>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}

export default HomeHeader

// export default withStyles(
//   styles,
//   {
//     withTheme: true
//   }
// )(HomeHeader)