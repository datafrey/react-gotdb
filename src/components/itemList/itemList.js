import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ListGroupItem = styled.li`
	cursor: pointer;
`;

const ItemList = ({ data, onItemSelected, renderItem }) => {
	const elements = data.map((item) => {
		const { id } = item;
		const label = renderItem(item);
		return (
			<ListGroupItem 
				key={ id }
				className="list-group-item"
				onClick={ () => onItemSelected(id) }>
				{ label }
			</ListGroupItem>
		);
	});

	return (
		<ul className="item-list list-group">
			{ elements }
		</ul>
	);
};

ItemList.defaultProps = {
	onItemSelected: () => {}
};

ItemList.propTypes = {
	onItemSelected: PropTypes.func,
	// getData: PropTypes.arrayOf(PropTypes.object)
};

export default ItemList;
