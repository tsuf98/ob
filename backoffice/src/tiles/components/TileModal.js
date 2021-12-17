import React, { useRef, useState } from 'react';
import { Modal, Form, Dropdown } from 'semantic-ui-react';
import Styled from 'styled-components';
import '../style/TilesPage.scss';
import { TILE_SIZE } from 'shared/constants';
import Spacer from '../../components/Spacer';
import { useQuery, useMutation, gql } from '@apollo/client';

export default function TileModal({ tileData, isOpen, setOpen }) {
  const GET_TAGS = gql`
    query {
      getTags {
        name
      }
    }
  `;

  const CREATE_PICTURE = gql`
    mutation ($pictureInput: PictureInput) {
      createPicture(pictureInput: $pictureInput) {
        title
        image {
          data
          contentType
        }
      }
    }
  `;

  const [tileName, setTileName] = useState(tileData?.tileName || '');
  const [selectedTileSize, setSelectedTileSize] = useState();
  const [tileImage, setTileImage] = useState('');
  const imageInputRef = useRef(null);

  const [createPicture] = useMutation(CREATE_PICTURE, {
    onCompleted: (data) => setTileImage(data.createPicture.image)
  });

  const onTileNameChange = (changeEvent) => {
    setTileName(changeEvent.target.value);
  };

  const onChangeTileSize = (changeEvent) => {
    setSelectedTileSize(changeEvent.target.value);
  };

  const { loading, error, data } = useQuery(GET_TAGS);

  const tags = data?.getTags.map(({ name }) => {
    return { key: name, text: name, value: name };
  });

  const onEditImageClick = () => {
    imageInputRef.current.click();
  };

  const onImageChange = (changeEvent) => {
    const file = changeEvent.target.files[0];

    createPicture({
      variables: { pictureInput: { title: 'testus123', imageFile: file } }
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  // if (pictureData?.getPictures.length > 0) {
  //   return (
  //     <img
  //       src={`data:${pictureData.getPictures[0].image.contentType};base64,${pictureData.getPictures[0].image.data}`}
  //     />
  //   );
  // }

  const tileImageSrc = tileImage
    ? `data:${tileImage.contentType};base64,${tileImage.data}`
    : '';

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
          src={tileImageSrc || 'https://tileisrael.com/wp-content/uploads/2020/05/55.jpg'}
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

          <Dropdown fluid multiple selection options={tags} />
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
