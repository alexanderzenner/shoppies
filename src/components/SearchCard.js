import React from 'react';
import { Autocomplete, Icon, TextContainer, Card, TextStyle } from '@shopify/polaris';
import { SearchMinor } from '@shopify/polaris-icons';

class SearchCard extends React.Component {
  render() {
    return (
      <Card >
        <Card.Section>
          <Autocomplete.TextField
            onChange={this.props.updateSearchTerm}
            label="Movie title"
            value={this.props.searchTerm}
            prefix={<Icon source={SearchMinor} color="inkLighter" />}
            placeholder="Search"
          />
        </Card.Section>
        <Card.Section subdued>
          <TextContainer>
            Search for your favorite movies and nominate {this.props.nominationsAmountGoal} for <TextStyle variation="strong">The Shoppies</TextStyle>.
                </TextContainer>
        </Card.Section>
      </Card>
    );
  }
}

export default SearchCard;