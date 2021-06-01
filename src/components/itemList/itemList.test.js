import React from 'react';
import { mount } from 'enzyme';

import GotService from '../../services/gotService';
import ItemList from './itemList';

describe('Testing <ItemList />', () => {
  // const service = new GotService();
  // const list = mount(<ItemList
  //                      data={ () => service.getAllHouses() }
  //                      renderItem={ ({ name }) => name } />);
  
  // it('Click on item list must rerender all list in 1 instance', () => {
  //   list.setState({
  //     itemList: [
  //       {
  //         name: 'wqw',
  //         id: 1
  //       },
  //       {
  //         name: 'wqw',
  //         id: 2
  //       }
  //     ]
  //   });

  //   list.find('.list-group-item:first-child').simulate('click');
  //   expect(list.find('ul')).toHaveLength(1);
  // });
});

