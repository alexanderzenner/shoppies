// Copyright (C) 2021 Alexander Zenner for Shopify Application - All Rights Reserved

import React from 'react';
import { Button, Banner, Stack, TextContainer, List, Card } from '@shopify/polaris';

class NominationsCard extends React.Component {

  getNominationsTitle = () => {
    return `Nominations (${this.props.nominations.length}/${this.props.nominationsAmountGoal})`
  }

  render() {
    return (
      <Card title={this.getNominationsTitle()} sectioned>
        <TextContainer>
          {
            this.props.isNominationsComplete() &&
            <Banner status="success">
              <p>You've completed your {this.props.nominationsAmountGoal} nominations</p>
            </Banner>
          }
          <List type="bullet">
            {this.props.nominations.map((movie, i) => (
              <List.Item key={i}>
                <Stack spacing="extraTight" alignment="center">
                  <TextContainer>
                    {movie["Title"]} ({movie["Year"]})
              </TextContainer>
                  <Button size="slim" onClick={() => this.props.unselectMovie(i)}>Remove</Button>
                </Stack>
              </List.Item>
            ))}
          </List>
        </TextContainer>
      </Card>
    );
  }
}

export default NominationsCard;