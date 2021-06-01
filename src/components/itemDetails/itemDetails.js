import React, { Component } from 'react';
import styled from 'styled-components';

import GotService from '../../services/gotService';
import ErrorMessage from '../errorMessage';
import Spinner from '../spinner';

const ItemDetailsBlock = styled.div`
  background-color: #fff;
  padding: 25px 25px 15px 25px;
  margin-bottom: 40px;
`;

const ItemDetailsHeader = styled.h4`
  margin-bottom: 20px;
	font-size: 20px;
  text-align: center;
`;

const PlaceholderMessage = styled.div`
  color: #fff;
  text-align: center;
  font-size: 26px;
`;

const Term = styled.span`
	font-weight: bold;
`;

const Field = ({ item, field, label }) => {
	const replaceWithMockIfEmpty = (value) => {
		return value === "" 
			? "No data :(" 
			: value;
	};

	return (
		<li className="list-group-item d-flex justify-content-between">
			<Term>{ label }</Term>
			<span>{ replaceWithMockIfEmpty(item[field]) }</span>
		</li>
	);
};

export {
	Field
}

export default class ItemDetails extends Component {

	gotService = new GotService();

	state = {
		item: null,
		showPlaceholder: true,
		loading: false,
		error: false
	}

	componentDidMount() {
		this.updateItem();
	}

	componentDidUpdate(prevProps) {
		if (this.props.itemId !== prevProps.itemId) {
			this.updateItem();
		}
	}

	onError = (error) => {
    this.setState({
      error: true,
      loading: false
    });
  }

	updateItem() {
		const { itemId, getData } = this.props;
		if (!itemId) {
			return;
		}

		this.setState({ showPlaceholder: false, loading: true });

		getData(itemId)
			.then((item) => {
				this.setState({
					item,
					loading: false,
					error: false 
				});
			})
			.catch(this.onError);
	}

	render() {
		if (this.state.showPlaceholder) {
			return <PlaceholderMessage>{ this.props.placeholderText }</PlaceholderMessage>;
		}

		const { item, loading, error } = this.state;

		const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) 
			? <View 
					item={ item } 
					propsChildren={ this.props.children } />
			: null;

		return (
			<ItemDetailsBlock className="rounded">
				{ errorMessage }
        { spinner }
        { content }
			</ItemDetailsBlock>
		);
	}
}

ItemDetails.defaultProps = {
  placeholderText: ''
};

const View = ({ item, propsChildren }) => {
	const { name } = item;
	return (
		<>
			<ItemDetailsHeader>{ name }</ItemDetailsHeader>
			<ul className="list-group list-group-flush">
				{
					React.Children.map(propsChildren, (child) => {
						return React.cloneElement(child, { item });
					})
				}
			</ul>
		</>
	);
}
