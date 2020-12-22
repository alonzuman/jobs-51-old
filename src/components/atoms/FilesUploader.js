import { Box, Button, CircularProgress, Grid } from '@material-ui/core';
import { PhotoCameraOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import useTheme from '../../hooks/useTheme';
import FilePreviewAndUpload from './FilePreviewAndUpload';

const FilesUploader = ({ fileName, folder = 'job-images', images, setImages }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [filesArray, setFilesArray] = useState([])
  const [image, setImage] = useState('');
  const { translation } = useTheme();

  const deleteImage = (deletedImage, deletedFile) => {
    setImages(images => images.filter(v => v !== deletedImage));
    setFilesArray(filesArray => filesArray.filter(file => file !== deletedFile));
  }

  const handleChange = async e => {
    setFilesArray(Object.keys(e.target.files)?.map(key => e.target.files[key]))
  }

  useEffect(() => {
    if (image) {
      setImages([...images, image]);
    }
  }, [image]);

  return (
    <Box display='flex' alignItems='center'>
      <input id='file-upload' type='file' onChange={handleChange} multiple />
      <Button size='large' style={{ width: 256 }} variant='outlined' color='primary'>
        <Box style={{ cursor: 'pointer' }} component='label' htmlFor='file-upload' display='flex' alignItems='center'>
          {isUploading ? <CircularProgress color='primary' size={24} /> : <>{translation.uploadPhotos}<PhotoCameraOutlined className='mr-5' /></>}
        </Box>
      </Button>
      <Grid style={{ marginRight: 16 }} container spacing={1}>
        {filesArray.map((file, i) => (
          <Grid item>
            <FilePreviewAndUpload deleteImage={deleteImage} setIsUploading={setIsUploading} key={i} image={image} setImage={setImage} folder={folder} file={file} fileName={`${fileName}-${i}`} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FilesUploader;
