import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const RandomCharBlock = styled.div`
	background-color: #fff;
	padding: 25px 25px 15px 25px;
	margin-bottom: 40px;
`;

const RandomCharHeader = styled.h4`
	margin-bottom: 20px;
  font-size: 20px;
	text-align: center;
`;

const Term = styled.span`
	font-weight: bold;
`;

export default class RandomChar extends Component {

  gotService = new GotService();

  state = {
    char: {},
    loading: true,
    error: false
  }
  
  // static defaultProps = {
  //   interval: 15000
  // }

  componentDidMount() {
    this.updateCharacter();
    this.timerId = setInterval(this.updateCharacter, this.props.interval);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  onCharLoaded = (char) => {
    this.setState({
      char, 
      loading: false, 
      error: false
    });
  }

  onError = (error) => {
    this.setState({
      error: true,
      loading: false
    });
  }

  updateCharacter = () => {
    const id = Math.floor(Math.random() * 140 + 25);  // 25-140
    this.gotService.getCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError);
  }

	render() {
    const { char, loading, error } = this.state;

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View char={ char } /> : null;

		return (
			<RandomCharBlock className="rounded">
        { errorMessage }
        { spinner }
        { content }
			</RandomCharBlock>
		);
	}
}

RandomChar.defaultProps = {
  interval: 15000
};

RandomChar.propTypes = {
  interval: PropTypes.number
};

const View = ({ char }) => {
  const { name, gender, born, died, culture } = char;
  const replaceWithMockIfEmpty = (value) => {
    return value === "" 
      ? "No data :(" 
      : value;
  }
  
  return (
    <>
      <RandomCharHeader>Random Character: { name }</RandomCharHeader>
      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex justify-content-between">
          <Term>Gender </Term>
          <span>{ replaceWithMockIfEmpty(gender) }</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <Term>Born </Term>
          <span>{ replaceWithMockIfEmpty(born) }</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <Term>Died </Term>
          <span>{ replaceWithMockIfEmpty(died) }</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <Term>Culture </Term>
          <span>{ replaceWithMockIfEmpty(culture) }</span>
        </li>
      </ul>
    </>
  );
};
