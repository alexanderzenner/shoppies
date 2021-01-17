
import React, { Component } from 'react';
import axios from 'axios';
import { Autocomplete, Icon, Button, Banner, Stack, TextContainer, List, Page, Layout, Card, Spinner } from '@shopify/polaris';
import { SearchMinor } from '@shopify/polaris-icons';

class App extends Component {

  apiUrl = 'http://www.omdbapi.com/?type=movie';
  apiKey = '449289f';
  favoritesLengthGoal = 5;

  state = {
    search: '',
    isLoading: false,
    movies: [],
    favorites: [],
  }

  search() {
    axios.get(`${this.apiUrl}&s=${this.state.search}&apikey=${this.apiKey}`)
    .then((response) => {
      if (response.data['Response'] === 'True') {
        this.setState({ movies: response.data['Search'], isLoading: false});
      } else {
        this.setState({ movies: [], isLoading: false});
      }
    })
    .catch(console.log)
  }

  updateSearchTerm = (value) => {
    this.setState({ search: value, isLoading: true }, () => this.search());
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

  getSearchResultTitle() {
    return `Results for "${this.state.search}"`
  }

  render() {
    return (
      <Page
        title="The Shoppies">
        <Layout>
          <Layout.Section>
            <Card>
              <Card.Section>
              <Autocomplete.TextField
                onChange={this.updateSearchTerm}
                label="Movie title"
                value={this.state.search}
                prefix={<Icon source={SearchMinor} color="inkLighter" />}
                placeholder="Search"
              />
              </Card.Section>
            </Card>
          </Layout.Section>
          <Layout.Section oneHalf>
            <Card title={this.getSearchResultTitle()} sectioned>
            {
              this.state.isLoading && 
              <Spinner accessibilityLabel="Spinner example" size="large" color="teal" />
            }
            <List type="bullet">
              {this.state.movies.map((movie, i) => (
                <List.Item key={i}>
                  <Stack spacing="extraTight" alignment="center">
                    <TextContainer>
                      {movie["Title"]} ({movie["Year"]}) 
                    </TextContainer>
                    <Button size="slim" onClick={() => this.selectMovie(movie)} disabled={this.checkIfIsSelected(movie) || this.favoritesIsFull()}>Nominate</Button>
                  </Stack>
                </List.Item>
              ))}
            </List>
            </Card>
          </Layout.Section>
          <Layout.Section oneHalf>
            <Card title="Nominations" sectioned>
              <TextContainer>
              {
                this.favoritesIsFull() &&
                <Banner>
                  <p>You've completed your {this.favoritesLengthGoal} nominations</p>
                </Banner>
              }
              <List type="bullet">
                {this.state.favorites.map((movie, i) => (
                  <List.Item key={i}>
                    <Stack spacing="extraTight" alignment="center">
                      <TextContainer>
                        {movie["Title"]} ({movie["Year"]})
                      </TextContainer>
                      <Button size="slim" onClick={() => this.unselectMovie(i)}>Remove</Button>
                    </Stack>
                  </List.Item>
                ))}
              </List>
              </TextContainer>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }  
}

export default App;
