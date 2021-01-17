import React, { Component } from 'react';
import axios from 'axios';
import { Page, Layout, FooterHelp, Link } from '@shopify/polaris';
import SearchCard from './components/SearchCard';
import ResultsCard from './components/ResultsCard';
import NominationsCard from './components/NominationsCard';

class App extends Component {

  apiUrl = 'https://www.omdbapi.com/?type=movie';
  apiKey = '449289f';
  nominationsAmountGoal = 5;

  state = {
    searchTerm: '',
    isLoading: false,
    movies: [],
    nominations: [],
  }

  search() {
    axios.get(`${this.apiUrl}&s=${this.state.searchTerm}&apikey=${this.apiKey}`)
      .then((response) => {
        if (response.data['Response'] === 'True') {
          this.setState({ movies: response.data['Search'], isLoading: false });
        } else {
          this.setState({ movies: [], isLoading: false });
        }
      })
      .catch(console.log)
  }

  updateSearchTerm = term => {
    this.setState({ searchTerm: term, isLoading: true }, () => this.search());
  }

  selectMovie = movie => {
    this.setState({ nominations: [...this.state.nominations, movie] }, () => this.updateLocalNominationsStorage())
  }

  unselectMovie = index => {
    var nominationsCopy = this.state.nominations;
    nominationsCopy.splice(index, 1);
    this.setState({ nominations: nominationsCopy }, () => this.updateLocalNominationsStorage())
  }

  checkIfIsSelected = movie => {
    return this.state.nominations.map((m) => m["imdbID"]).includes(movie["imdbID"]);
  }

  isNominationsComplete = () => {
    return this.state.nominations.length === this.nominationsAmountGoal;
  }

  updateLocalNominationsStorage() {
    localStorage.setItem('nominations', JSON.stringify(this.state.nominations));
  }

  componentDidMount() {
    var storedNominations = JSON.parse(localStorage.getItem('nominations'));
    if (storedNominations !== null && storedNominations !== undefined) {
      this.setState({
        nominations: storedNominations
      });
    }
  }

  render() {
    return (
      <Page
        title="The Shoppies">
        <Layout>
          <Layout.Section>
            <SearchCard
              nominationsAmountGoal={this.nominationsAmountGoal}
              searchTerm={this.state.searchTerm}
              updateSearchTerm={this.updateSearchTerm}>
            </SearchCard>
          </Layout.Section>
          <Layout.Section oneHalf>
            <ResultsCard
              searchTerm={this.state.searchTerm}
              isLoading={this.state.isLoading}
              movies={this.state.movies}
              selectMovie={this.selectMovie}
              checkIfIsSelected={this.checkIfIsSelected}
              isNominationsComplete={this.isNominationsComplete}>
            </ResultsCard>
          </Layout.Section>
          <Layout.Section oneHalf>
            <NominationsCard
              nominations={this.state.nominations}
              nominationsAmountGoal={this.nominationsAmountGoal}
              unselectMovie={this.unselectMovie}
              isNominationsComplete={this.isNominationsComplete}
            >
            </NominationsCard>
          </Layout.Section>
        </Layout>
        <FooterHelp>
          Find the code and my notes in my <Link url="https://github.com/alexanderzenner/shoppies">
            GitHub repository
          </Link>
        </FooterHelp>
      </Page>
    );
  }
}

export default App;
