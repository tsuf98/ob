import React, { useRef, useState } from 'react';
import {
  Button,
  Header,
  Image,
  Modal,
  Input
} from 'semantic-ui-react';
import Styled from 'styled-components';
import '../style/TilesPage.scss';

export default function TileModal({ tileData, isOpen, setOpen }) {
  const tileNameInputRef = useRef();
  const [isTileNameInputDisabled, setTileNameInputDisabled] =
    useState(true);
  const [tileName, setTileName] = useState(tileData?.tileName || '');
  const [tileNameButtonState, setTileNameButtonState] =
    useState('edit');

  const onEditTileNameClick = () => {
    if (tileNameButtonState === 'edit') {
      setTileNameInputDisabled(false);
      tileNameInputRef.current.focus();
      setTileNameButtonState('save');
      return;
    }

    console.log('new tile name is: ', tileName);

    setTileNameButtonState('edit');
    setTileNameInputDisabled(true);
  };

  const onTileNameChange = (_, data) => {
    setTileName(data.value);
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={isOpen}
      className="tile-modal-container"
    >
      <ModalHeader>עריכת פרטי אריח</ModalHeader>
      <ModalImageContainer>
        <ModalImage
          alt="tile"
          src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
          onClick={() => console.log('image clicked')}
        />
        <ModalImageOverlay>
          <ModalImageOverlayButton>
            עריכת תמונה
          </ModalImageOverlayButton>
        </ModalImageOverlay>
      </ModalImageContainer>
      <TileNameContainer>
        <Input
          className="tile-modal-input"
          disabled={isTileNameInputDisabled}
          ref={tileNameInputRef}
          placeholder="Search..."
          onChange={onTileNameChange}
          value={tileName}
          size="huge"
        />
        <Button
          className="tile-modal-button"
          content={tileNameButtonState === 'edit' ? 'ערוך' : 'שמור'}
          onClick={onEditTileNameClick}
        />
      </TileNameContainer>
    </Modal>
  );
}

const ModalHeader = Styled.div`
	text-align: center;
	font-size: 2em;
	padding-bottom: 15px;
	border-bottom: 1px solid #bbb;
`;

const ModalImageContainer = Styled.div`
	display: flex;
	position: relative;
	align-content: center;
	justify-content: center;
	margin-top: 20px;
`;

const ModalImage = Styled.img`
	max-height: 50%;
	max-width: 50%;
`;

const ModalImageOverlay = Styled.div`
	position: absolute;
	height: 100%;
	width: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: .8s ease;
	opacity: 0;

	${ModalImageContainer}:hover & {
		opacity: 1;
	}
`;

const ModalImageOverlayButton = Styled.button`
	background-color: lightblue;
	padding: 10px;
	font-size: 1.5em;
	font-weight: bold;
	cursor:pointer;
`;

const TileNameContainer = Styled.div`
	display: flex;
	align-content: center;
	justify-content: center;
	margin-top: 20px;
`;
