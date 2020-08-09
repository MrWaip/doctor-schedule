import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Toolbar, Container, AppBar, Button, CssBaseline } from '@material-ui/core';
import { Schedule } from './pages/Schedule';
import { Registration } from './pages/Registration';
import './styles/App.scss';

function App() {
  return (
    <div className="app">
      <CssBaseline />
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Container maxWidth="lg">
              <Button color="inherit" component={Link} to="/">
                Запись на прием
              </Button>
              <Button color="inherit" component={Link} to="/schedule">
                Расписание
              </Button>
            </Container>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" className="app__content">
          <Route path="/" exact>
            <Registration />
          </Route>
          <Route path="/schedule" exact>
            <Schedule />
          </Route>
        </Container>
      </Router>
    </div>
  );
}

export default App;
