import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import '../style/TilesPage.scss';

export default function Tile({ image, name, onClick }) {
  return (
    <Card className="tile" onClick={onClick}>
      <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
      <Card.Content>
        <Card.Header textAlign="center">Matthew</Card.Header>
      </Card.Content>
    </Card>
  );
}
