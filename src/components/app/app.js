import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import styled from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from '../header';
import RandomChar from '../randomChar';
import CharacterPage from '../pages/characterPage';
import HousePage from '../pages/housePage';
import BookPage from '../pages/bookPage';
import BooksItem from '../pages/booksItem';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';

import './app.css';

const ToggleRandomChar = styled.button`
  margin-bottom: 40px;
  width: 300px;
  height: 50px;
  background: #225;
  color: #fff;
  border: none;
  text-size: 18px;
  border-radius: 5px;
`;

const WelcomePlaceholder = styled.h1`
  color: #fff;
`;

export default class App extends Component {

  gotService = new GotService();

  state = {
    randomCharIsShown: true,
    error: false
  }

  componentDidCatch() {
    this.setState({ error: true });
  }

  onToggleRandomChar = (e) => {
    e.preventDefault();
    this.setState({ randomCharIsShown: !this.state.randomCharIsShown });
  }

	render() {
    const { randomCharIsShown } = this.state;
    const randomCharElement = randomCharIsShown ? <RandomChar /> : null;

    if (this.state.error) {
      return <ErrorMessage />;
    }
    
    return (
      <Router>
        <div className="app"> 
          <Container>
            <Header />
          </Container>
          <Container>
            <Row>
              <Col lg={ { size: 5, offset: 0 } }>
                { randomCharElement }
                <ToggleRandomChar onClick={ this.onToggleRandomChar }>
                  Toggle random char
                </ToggleRandomChar>
              </Col>
            </Row>
            <Route path="/" exact component={ () => <WelcomePlaceholder>Welcome to GOT BD</WelcomePlaceholder> } />
            <Route path="/characters" component={ CharacterPage } />
            <Route path="/houses" component={ HousePage } />
            <Route path="/books" exact component={ BookPage } />
            <Route path="/books/:id" render={
              ({ match }) => {
                const { id } = match.params;
                return <BooksItem bookId={ id } />
              }
            } />
          </Container>
        </div>
      </Router>
    );
  }
}
