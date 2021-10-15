import React, { useState } from 'react';
import { Card } from 'semantic-ui-react';
import Spacer from '../../components/Spacer';
import '../style/TilesPage.scss';
import Tile from './Tile';
import TileModal from './TileModal';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function TilesPage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [openTileData, setOpenTileData] = useState();

  const onTileClick = (tileData) => {
    setOpenTileData(tileData);
    setModalOpen(true);
  };

  return (
    <div className="tiles-page-container">
      <TileModal
        isOpen={isModalOpen}
        setOpen={setModalOpen}
        tileData={openTileData}
      />
      <button class="ui right labeled icon button add-tile-button">
        <i class="plus icon"></i>
        הוסף אריח חדש
      </button>
      <Spacer height="40px" />

      <Card.Group className="tile-group">
        {data.map((val) => (
          <Tile onClick={onTileClick} />
        ))}
      </Card.Group>
    </div>
  );
}
