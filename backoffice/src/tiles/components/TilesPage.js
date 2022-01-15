import React, { useState, useEffect } from 'react';
import { Card } from 'semantic-ui-react';
import { useQuery, useMutation, gql } from '@apollo/client';
import Spacer from '../../components/Spacer';
import '../style/TilesPage.scss';
import Tile from './Tile';
import TileModal from './TileModal';
import { ADD_NEW_TILE } from '../tileConstants';

// const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function TilesPage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [openTileData, setOpenTileData] = useState();
  const [tiles, setTiles] = useState();

  const GET_TILES = gql`
    query {
      getTiles {
        title
        connectedImages {
          title
          image {
            data
            contentType
          }
        }
        tags {
          name
        }
        description
        size
      }
    }
  `;

  const onTileClick = (tileData) => {
    console.log('on tile click - ', tileData);
    setOpenTileData(tileData);
    setModalOpen(true);
  };

  const onAddTileClick = () => {
    setOpenTileData(null);
    setModalOpen(true);
  };

  const { loading, error, data } = useQuery(GET_TILES, { pollInterval: 500 });

  if (data) {
    console.log('data is: ', data);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="tiles-page-container">
      {isModalOpen && (
        <TileModal isOpen={isModalOpen} setOpen={setModalOpen} tileData={openTileData} />
      )}

      <button onClick={onAddTileClick} className="ui right labeled icon button add-tile-button">
        <i className="plus icon"></i>
        {ADD_NEW_TILE}
      </button>
      <Spacer height="40px" />

      <Card.Group className="tile-group">
        {data.getTiles.map((tileData) => (
          <Tile tileData={tileData} onClick={onTileClick} />
        ))}
      </Card.Group>
    </div>
  );
}
