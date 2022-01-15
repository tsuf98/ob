import React, { useEffect, useRef, useState } from 'react';
import { Modal, Form, Dropdown, Popup, Button } from 'semantic-ui-react';
import Styled from 'styled-components';
import '../style/TilesPage.scss';
import { TILE_SIZE } from 'shared/constants';
import Spacer from '../../components/Spacer';
import { useQuery, useMutation, gql } from '@apollo/client';
import {
  pleaseFillInTheFollowingDetails,
  tileImageText,
  tileCategoriesText,
  tileDescriptionText,
  tileNameText,
  tileSizeText
} from '../texts';
import {
  SAVE_TILE,
  TILE_CATEGORIES_PLACEHOLDER,
  TILE_DESCRIPTION_PLACEHOLDER,
  TILE_NAME_PLACEHOLDER,
  TILE_PLACEHOLDER_IMAGE,
  UPDATE_TILE
} from '../tileConstants';

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

  const CREATE_TILE = gql`
    mutation ($tileInput: TileInput) {
      createTile(tileInput: $tileInput) {
        title
      }
    }
  `;

  const [tileName, setTileName] = useState(tileData?.title || '');
  const [tileSize, setTileSize] = useState(tileData?.size);
  const [tileImage, setTileImage] = useState(tileData?.connectedImages[0]?.image);
  const [tileImageFile, setTileImageFile] = useState();

  const [tagOptions, setTagOptions] = useState();
  const [tileCategories, setTileCategories] = useState(tileData?.tags?.map((tag) => tag.name));
  const [tileDescription, setTileDescription] = useState(tileData?.description);
  const imageInputRef = useRef(null);

  const [createPicture] = useMutation(CREATE_PICTURE, {
    onCompleted: (data) => setTileImage(data.createPicture.image)
  });

  const [createTile] = useMutation(CREATE_TILE, {
    onCompleted: (data) => console.log('saved tile - data: ', data)
  });

  const onTileNameChange = (changeEvent) => {
    setTileName(changeEvent.target.value);
  };

  const onChangeTileSize = (changeEvent) => {
    setTileSize(changeEvent.target.value);
  };

  const onChangeTileCategories = (_, data) => {
    console.log('current categories', data.value);
    console.log('TILE categories', tileCategories);

    setTileCategories(data.value);
  };

  const onAddTileCategory = (_, { value }) => {
    setTagOptions([...tagOptions, { key: value, text: value, value }]);
  };

  const onChangeTileDescription = (changeEvent) => {
    setTileDescription(changeEvent.target.value);
  };

  const { loading, error, data } = useQuery(GET_TAGS);

  if (!tagOptions && data) {
    setTagOptions(data.getTags.map(({ name }) => ({ key: name, text: name, value: name })));
  }

  const onEditImageClick = () => {
    imageInputRef.current.click();
  };

  const getTileTags = () =>
    tileCategories.map((tileCategory) => ({
      name: tileCategory,
      hidden: false
    }));

  const getTilePictureInput = () => ({
    title: tileImageFile.name,
    imageFile: tileImageFile,
    tags: getTileTags(),
    description: tileDescription
  });

  const onImageChange = (changeEvent) => {
    const file = changeEvent.target.files[0];
    console.log('file is: ', file);
    console.log('file name is: ', file.name);

    const fileUrl = URL.createObjectURL(file);
    setTileImageFile(file);
    setTileImage(fileUrl);
    // createPicture({
    //   variables: { pictureInput: { title: 'testus123', imageFile: file } }
    // });
  };

  const onSubmit = () => {
    // TODO(need to validate the input)
    createTile({
      variables: {
        tileInput: {
          title: tileName,
          connectedImages: [getTilePictureInput()],
          tags: getTileTags(),
          description: tileDescription,
          size: TILE_SIZE[tileSize]
        }
      }
    });

    setOpen(false);
  };

  const tileHasMissingData =
    !tileImage || !tileName || !tileSize || !tileCategories || !tileDescription;

  const getMissingDataInfo = () =>
    `${pleaseFillInTheFollowingDetails} ${tileImage ? '' : tileImageText} ${
      tileName ? '' : tileNameText
    } ${tileSize ? '' : tileSizeText} ${tileCategories ? '' : tileCategoriesText} ${
      tileDescription ? '' : tileDescriptionText
    }`;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const tileImageSrc =
    typeof tileImage === 'object'
      ? `data:${tileImage.contentType};base64,${tileImage.data}`
      : tileImage;

  const saveButtonTitle = tileData ? UPDATE_TILE : SAVE_TILE;

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
        <ModalImage alt="tile" src={tileImageSrc || TILE_PLACEHOLDER_IMAGE} />

        <input
          type="file"
          ref={imageInputRef}
          style={{ display: 'none' }}
          onChange={onImageChange}
        />
        <ModalImageOverlay>
          <ModalImageOverlayButton onClick={onEditImageClick}>עריכת תמונה</ModalImageOverlayButton>
        </ModalImageOverlay>
      </ModalImageContainer>
      <Form size="huge">
        <InputContainer>
          <label>שם האריח </label>
          <Spacer height={'20px'} />
          <input value={tileName} placeholder={TILE_NAME_PLACEHOLDER} onChange={onTileNameChange} />
        </InputContainer>
        <Spacer height={'20px'} />

        <Form.Group inline>
          <label>גודל אריח</label>
          {Object.keys(TILE_SIZE).map((size) => (
            <div className="tile-sizes-container">
              <label>
                <input
                  className="tile-radio-input"
                  checked={size === tileSize}
                  type="radio"
                  value={size}
                  onChange={onChangeTileSize}
                />
                {TILE_SIZE[size]}
              </label>
            </div>
          ))}
        </Form.Group>
        <Spacer height={'1px'} />

        <InputContainer>
          <label>קטגוריות האריח </label>
          <Spacer height={'20px'} />

          <Dropdown
            allowAdditions
            search
            fluid
            multiple
            selection
            options={tagOptions}
            onAddItem={onAddTileCategory}
            onChange={onChangeTileCategories}
            value={tileCategories}
            placeholder={TILE_CATEGORIES_PLACEHOLDER}
          />
        </InputContainer>

        <InputContainer>
          <label>תיאור האריח </label>
          <Spacer height={'20px'} />
          <textarea
            rows={3}
            placeholder={TILE_DESCRIPTION_PLACEHOLDER}
            value={tileDescription}
            onChange={onChangeTileDescription}
          />
        </InputContainer>

        <InputContainer>
          <Popup
            content={getMissingDataInfo()}
            disabled={!tileHasMissingData}
            trigger={
              <Button size="big" onClick={onSubmit}>
                {saveButtonTitle}
              </Button>
            }
          ></Popup>
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
	max-height: 300px;
	max-width: 300px;
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
