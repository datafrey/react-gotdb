import ItemList from './itemList';
import withData from '../withData';
import GotService from '../../services/gotService';

export default ItemList;

const gotService = new GotService();
const CharacterItemList = withData(ItemList, gotService.getAllCharacters);
const HousesItemList = withData(ItemList, gotService.getAllHouses);
const BooksItemList = withData(ItemList, gotService.getAllBooks);

export {
  CharacterItemList,
  HousesItemList,
  BooksItemList
}
