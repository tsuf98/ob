import React, { useRef, useState } from 'react';
import { Modal, Form, Dropdown } from 'semantic-ui-react';
import Styled from 'styled-components';
import '../style/TilesPage.scss';
import { TILE_SIZE } from 'shared/constants';
import Spacer from '../../components/Spacer';

export default function TileModal({ tileData, isOpen, setOpen }) {
  const [tileName, setTileName] = useState(tileData?.tileName || '');
  const [selectedTileSize, setSelectedTileSize] = useState();
  const [tileImage, setTileImage] = useState('');
  const imageInputRef = useRef(null);

  const onTileNameChange = (changeEvent) => {
    setTileName(changeEvent.target.value);
  };

  const onChangeTileSize = (changeEvent) => {
    setSelectedTileSize(changeEvent.target.value);
  };

  const options = [
    { key: 'm', text: 'בדיקה', value: 'male' },
    { key: 'f', text: 'בדיקה נוספת', value: 'female' },
    { key: 'o', text: 'בהחלט', value: 'other' }
  ];

  const onEditImageClick = () => {
    console.log('clicked');
    console.log('imageInputRef', imageInputRef);

    imageInputRef.current.click();
  };

  const onImageChange = (changeEvent) => {
    console.log('change event: ', changeEvent);
    console.log('change event: ', changeEvent.target.files[0]);

    const file = changeEvent.target.files[0];
    console.log(file);
    const fileUrl = URL.createObjectURL(file);
    console.log(fileUrl);

    setTileImage(fileUrl);
  };

  return (
    <Modal
      closeIcon
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={isOpen}
      className="tile-modal-container"
    >
      <ModalHeader>עריכת פרטי אריח</ModalHeader>
      <ModalImageContainer>
        <ModalImage
          alt="tile"
          src={tileImage || 'https://tileisrael.com/wp-content/uploads/2020/05/55.jpg'}
        />
        <input
          type="file"
          ref={imageInputRef}
          style={{ display: 'none' }}
          onChange={onImageChange}
        />
        <ModalImageOverlay>
          <ModalImageOverlayButton onClick={onEditImageClick}>
            עריכת תמונה
          </ModalImageOverlayButton>
        </ModalImageOverlay>
      </ModalImageContainer>
      <Form size="huge">
        <InputContainer>
          <label>שם האריח </label>
          <Spacer height={'20px'} />
          <input value={tileName} placeholder="test" onChange={onTileNameChange} />
        </InputContainer>
        <Spacer height={'20px'} />

        <Form.Group inline>
          <label>גודל אריח</label>
          {Object.keys(TILE_SIZE).map((tileSize) => (
            <div className="tile-sizes-container">
              <label>
                <input
                  className="tile-radio-input"
                  checked={tileSize === selectedTileSize}
                  type="radio"
                  value={tileSize}
                  onChange={onChangeTileSize}
                />
                {TILE_SIZE[tileSize]}
              </label>
            </div>
          ))}
        </Form.Group>
        <Spacer height={'1px'} />

        <InputContainer>
          <label>קטגוריות האריח </label>
          <Spacer height={'20px'} />

          <Dropdown fluid multiple selection options={options} />
        </InputContainer>

        <InputContainer>
          <label>תיאור האריח </label>
          <Spacer height={'20px'} />
          <textarea rows={3} placeholder="test" />
        </InputContainer>

        <InputContainer>
          <FormSubmitButton>עדכן פרטים</FormSubmitButton>
        </InputContainer>
      </Form>
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
	max-height: 80%;
	max-width: 80%;
`;

const ModalImageOverlay = Styled.div`
	position: absolute;
	height: 100%;
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

const InputContainer = Styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 20px;
	direction: rtl;
`;

const FormSubmitButton = Styled.button`
	background-color: green;
	padding: 10px;
	font-size: 1.1em;
	cursor:pointer;
`;
