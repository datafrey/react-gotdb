export default class GotService {

  _apiBase = 'https://www.anapioficeandfire.com/api';

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    
    return await res.json();
  }

  getAllCharacters = async () => {
    const characters = await this.getResource('/characters?page=5&pageSize=10');
    return characters.map(this._transformCharacter);
  }

  getCharacter = async (id) => {
    const character = await this.getResource(`/characters/${id}`);
    return this._transformCharacter(character);
  }

  getAllHouses = async () => {
    const houses = await this.getResource('/houses/');
    return houses.map(this._transformHouse);
  }

  getHouse = async (id) => {
    const house = await this.getResource(`/houses/${id}`);
    return this._transformHouse(house);
  }

  getAllBooks = async () => {
    const books = await this.getResource('/books/');
    return books.map(this._transformBook);
  }

  getBook = async (id) => {
    const book = await this.getResource(`/books/${id}`);
    return this._transformBook(book);
  }

  // _extractId = (item) => {
  //   return +item.url.match(/\d+/g);
  // }

  _transformCharacter(char) {
    // const id = this._extractId(char);
    return {
      id: +char.url.match(/\d+/g),
      name: char.name,
      gender: char.gender,
      born: char.born,
      died: char.died,
      culture: char.culture
    };
  }

  _transformHouse(house) {
    // const id = this._extractId(house);
    return {
      id: +house.url.match(/\d+/g),
      name: house.name,
      region: house.region,
      words: house.words,
      titles: house.titles,
      overlord: house.overlord,
      ancestralWeapons: house.ancestralWeapons
    };
  }

  _transformBook(book) {
    // const id = this._extractId(book);
    return {
      id: +book.url.match(/\d+/g),
      name: book.name,
      numberOfPages: book.numberOfPages,
      publisher: book.publisher,
      released: book.released
    };
  }
}
