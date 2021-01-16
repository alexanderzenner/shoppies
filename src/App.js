
import './App.css';
import { Component } from 'react';
import axios from 'axios';

class App extends Component {

  apiUrl = 'http://www.omdbapi.com/?type=movie';
  apiKey = '449289f';
  favoritesLengthGoal = 5;

  state = {
    search: '',
    movies: [],
    favorites: [],
  }

  search() {
    axios.get(`${this.apiUrl}&s=${this.state.search}&apikey=${this.apiKey}`)
    .then((response) => {
      if (response.data['Response'] === 'True') {
        this.setState({ movies: response.data['Search'] });
      } else {
        this.setState({ movies: []});
      }
    })
    .catch(console.log)
  }

  updateSearchTerm = (e) => {
    this.setState({ search: e.target.value }, () => this.search());
  }

  selectMovie(movie) {
    this.setState({ favorites: [...this.state.favorites, movie] })
  }

  unselectMovie(index) {
    var favoritesCopy = this.state.favorites;
    favoritesCopy.splice(index, 1);
    this.setState({ favorites: favoritesCopy})
  }

  checkIfIsSelected(movie) {
    return this.state.favorites.map((m) => m["imdbID"]).includes(movie["imdbID"]);
  }

  favoritesIsFull() {
    return this.state.favorites.length === this.favoritesLengthGoal;
  }

  componentDidMount() {
    console.log(window.location.href);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>The Shoppies</h1>
          <input value={this.state.search} onChange={this.updateSearchTerm}></input>
          <table>
            <tbody>
                {this.state.movies.map((movie, i) => (
                <tr key={i}>
                  <td>
                    {movie["Title"]} ({movie["Year"]})
                    <button onClick={() => this.selectMovie(movie)} disabled={this.checkIfIsSelected(movie) || this.favoritesIsFull()}>Nominate</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {
            this.favoritesIsFull() &&
            <p>You've completed your 5 nominations</p>
          }
          <table>
            <tbody>
                {this.state.favorites.map((movie, i) => (
                <tr key={i}>
                  <td>
                    {movie["Title"]} ({movie["Year"]})
                    <button onClick={() => this.unselectMovie(i)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </header>
      </div>
    );
  }

  
}

export default App;
