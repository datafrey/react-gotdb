import React, { Component } from 'react';

import { HousesItemList } from '../../itemList';
import ItemDetails, { Field } from '../../itemDetails';
import ErrorMessage from '../../errorMessage';
import GotService from '../../../services/gotService';
import RowBlock from '../../rowBlock';

export default class HousePage extends Component {

  gotService = new GotService();

  state = {
    selectedHouse: null,
    error: false
  }

  onItemSelected = (id) => {
    this.setState({ selectedHouse: id });
  }

  componentDidCatch() {
    this.setState({ error: true });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }

    const itemList = (
      <HousesItemList 
        onItemSelected={ this.onItemSelected }
        renderItem={ ({ name }) => name } />
    );

    const houseDetails = (
      <ItemDetails 
        placeholderText="Select house for more info"
        itemId={ this.state.selectedHouse }
        getData={ this.gotService.getHouse }>
        <Field field='region' label='Region' />
        <Field field='words' label='Words' />
        <Field field='titles' label='Titles' />
        <Field field='overlord' label='Overlord' />
        <Field field='ancestralWeapons' label='Ancestral weapons' />
      </ItemDetails>
    );

    return (
      <RowBlock left={ itemList } right={ houseDetails } />
    );
  }
}
