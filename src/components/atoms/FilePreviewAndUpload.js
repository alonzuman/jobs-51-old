import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { storage } from '../../firebase';
import useTheme from '../../hooks/useTheme';
import ApprovalDialog from '../layout/ApprovalDialog';

const Image = styled.img`
  height: 40px;
  width: 40px;
  object-fit: cover;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    filter: brightness(.5);
  }
`

const FilePreviewAndUpload = ({ file, folder, setImage, fileName, setIsUploading, deleteImage }) => {
  const { translation } = useTheme();
  const [progress, setProgress] = useState(0);
  const [imgSrc, setImgSrc] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteFile = () => {
    storage.ref(folder).child(fileName).delete().then(() => deleteImage(imgSrc, file)).then(setIsDeleting(false));
  }

  useEffect(() => {
    const uploadFile = async () => {
      setIsUploading(true)
      const uploadRef = storage.ref(folder).child(fileName);
      const task = uploadRef.put(file);
      await task.on('state_changed',
        snapshot => {
          let uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(uploadProgress);
        },
        error => console.log(error),
        () => uploadRef.getDownloadURL().then(url => {
          setImgSrc(url);
          setImage(url);
        })
      )
      setIsUploading(false)
    }
    uploadFile()
  }, [])

  if (imgSrc) {
    return (
      <>
        <ApprovalDialog open={isDeleting} onClose={() => setIsDeleting(false)} action={deleteFile} text={translation.areYouSureDeletePhoto} />
        {progress > 0 && progress < 100 && <h1>{progress}</h1>}
        <Image onClick={() => setIsDeleting(true)} src={imgSrc} />
      </>
    )
  } else {
    return null;
  }
}

export default FilePreviewAndUpload
