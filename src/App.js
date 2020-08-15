import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// Components
import Dialogs from './components/layout/Dialogs'
import CustomAlert from './components/layout/CustomAlert'

// Pages
import Home from './pages/Home'
import Jobs from './pages/Jobs'
import Employees from './pages/Employees'

// Mui
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Container } from '@material-ui/core'

const theme = createMuiTheme({
  direction: 'rtl',
});

function App() {
  return (
    <ThemeProvider theme={theme}>
        <Router>
          <Dialogs />
          <CustomAlert />
          <Switch>
            <Container>
              <Route exact path='/' component={Home} />
              <Route path='/jobs' component={Jobs} />
              <Route path='/employees' component={Employees} />
            </Container>
          </Switch>
        </Router>
    </ThemeProvider>
  )
}

export default App;
