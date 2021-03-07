import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import S3 from 'react-aws-s3';
import { v4 as uuid } from 'uuid';
import '../../static/style/Upload.css';

//setup env vars for s3 bucket
const awsConfig = {
  bucketName: process.env.REACT_APP_BUCKETNAME,
  dirName: 'photos' /* optional */,
  region: process.env.REACT_APP_AWSBUCKETREGION,
  accessKeyId: process.env.REACT_APP_AWSACCESSKEY,
  secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY,
  s3Url: 'https://soen341insta.s3.amazonaws.com',
};

const UploadImage = forwardRef((props, ref) => {
  const [errorMessage, setErrorMessage] = useState(false);
  const [previewPath, setPreviewPath] = useState('');
  const S3FileUpload = new S3(awsConfig);
  const [selectedFile, setSelectedFile] = useState('');
  const [showRemove, setShowRemove] = useState('');

  //input ref
  const inputImageRef = useRef();

  const newFileName = uuid();
  useImperativeHandle(ref, () => ({
    async upload() {
      //e.target.files[0]
      return S3FileUpload.uploadFile(selectedFile, newFileName)
        .then(async (data) => {
          return data.location;
        })

        .catch((err) => {
          //Empty image folder
        });
    },
  }));

  //events for dropzone
  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    e.preventDefault();
  };
  const fileAdd = (e) => {
    setSelectedFile(e.target.files[0]);
    if (e.target.files[0]) {
      handleFiles(e.target.files[0]);
    }
  };
  const openFile = (e) => {
    inputImageRef.current.click();
  };
  const fileDrop = (e) => {
    e.preventDefault();
    setSelectedFile(e.dataTransfer.files[0]);
    if (e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };
  //validate file
  const validateFile = (file) => {
    const validTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/x-icon',
    ];
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }
    return true;
  };

  //preview for file
  const reader = new FileReader();

  //handle file dropped
  const handleFiles = (file) => {
    if (validateFile(file)) {
      // set preview path if valid
      reader.readAsDataURL(file);
      setErrorMessage(false);
    } else {
      //remove file and send error message
      setSelectedFile(null);
      setPreviewPath(null);
      setErrorMessage(true);
    }
  };

  //handle reader
  reader.onload = function (e) {
    setPreviewPath(e.target.result);
  };

  //remove file
  const removeFile = () => {
    setSelectedFile(null);
    setPreviewPath(null);
  };

  return (
    <div id="uploader">
      <input
        className="input-hide"
        type="file"
        onChange={fileAdd}
        ref={inputImageRef}
      />

      <div className="container">
        {!previewPath ? (
          <div
            className="drop-container"
            onDragOver={dragOver}
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
            onDrop={fileDrop}
            onClick={openFile}
          >
            <div className="drop-message">
              <i
                className="fa fa-cloud-upload"
                style={{ marginRight: '0.5em' }}
              ></i>
              Drag & Drop files here or click to upload
            </div>
          </div>
        ) : null}
        {errorMessage && (
          <p
            className="validationError"
            style={{ marginLeft: '5.5%', marginTop: '0.5em' }}
          >
            Invalid File. Please upload a valid image.
          </p>
        )}
        {previewPath ? (
          <div
            className="preview-image-box"
            onMouseOver={() => setShowRemove(true)}
            onMouseLeave={() => setShowRemove(false)}
          >
            <img
              className="image-preview"
              alt="imagePreview"
              src={previewPath}
            ></img>
            {showRemove ? (
              <button
                type="button"
                className="remove-upload-image btn btn-danger"
                onClick={removeFile}
              >
                <i className=" fa fa-close" onClick={removeFile}></i>
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
});

export default UploadImage;
