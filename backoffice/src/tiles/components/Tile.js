import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import '../style/TilesPage.scss';

export default function Tile({ tileData, onClick }) {
  const { connectedImages, title } = tileData;
  const tileImage = connectedImages[0].image;

  const onTileClick = () => {
    onClick(tileData);
  };

  return (
    <Card className="tile" onClick={onTileClick}>
      <Image
        className="tile-image"
        src={`data:${tileImage.contentType};base64,${tileImage.data}`}
      />
      <Card.Content className="tile-content">
        <Card.Header className="tile-title" textAlign="center">
          {title}
        </Card.Header>
      </Card.Content>
    </Card>
  );
}
