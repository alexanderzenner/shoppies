import React from 'react';
import { Button, Stack, TextContainer, List, Card, Spinner } from '@shopify/polaris';

class ResultsCard extends React.Component {

  getSearchResultTitle() {
    return `Results for "${this.props.searchTerm}"`
  }

  render() {
    return (
      <Card title={this.getSearchResultTitle()} sectioned>
        {
          this.props.isLoading &&
          <Spinner accessibilityLabel="Spinner example" size="large" color="teal" />
        }
        <List type="bullet">
          {this.props.movies.map((movie, i) => (
            <List.Item key={i}>
              <Stack spacing="extraTight" alignment="center">
                <TextContainer>
                  {movie["Title"]} ({movie["Year"]})
                    </TextContainer>
                <Button size="slim" onClick={() => this.props.selectMovie(movie)} disabled={this.props.checkIfIsSelected(movie) || this.props.isNominationsComplete()}>Nominate</Button>
              </Stack>
            </List.Item>
          ))}
        </List>
      </Card>
    );
  }
}

export default ResultsCard;