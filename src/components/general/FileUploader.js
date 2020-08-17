import React from 'react'
import { storage } from '../../firebase'
import { Button } from '@material-ui/core'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { useSelector } from 'react-redux';

const FileUploader = ({ fileName, folder, setImageUrl, setProgress, setIsUploading }) => {
  const { translation, direction } = useSelector(state => state.theme)

  const handleChange = async e => {
    if (e.target.files[0]) {
      await handleUpload(e.target.files[0])
    }
  }

  const handleUpload = async (file) => {
    setIsUploading(true)
    const uploadTask = storage.ref(`${folder}/${fileName}`).put(file)
    uploadTask.on('state_changed',
      snapshot => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress)
      },
      error => console.log(error),
      async () => {
        const url = await storage.ref(folder).child(fileName).getDownloadURL()
        setIsUploading(false)
        setImageUrl(url)
      }
    )
  }

  const fileUploadContainer = {
    margin: '0 0 1rem 0'
  }

  const iconStyle = {
    margin: direction === 'rtl' ? '0 .5rem 0 0' : '0 0 0 .5rem'
  }

  const labelStyle = {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  }

  return (
    <div style={fileUploadContainer}>
      <input id='file-upload' type='file' onChange={handleChange} />
      <Button variant='outlined' color='primary'>
        <label style={labelStyle} htmlFor='file-upload'>
          {translation.uploadPhoto}
        <PhotoCameraIcon style={iconStyle} />
        </label>
      </Button>
    </div>
  )
}

export default FileUploader
