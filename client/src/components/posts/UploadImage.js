import React, { useState, useRef } from 'react';
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

const UploadImage = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [validFiles, setValidFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadedPath, setUploadedPath] = useState('');
  const [uploadComplete, setUploadComplete] = useState('');
  const [previewPath, setPreviewPath] = useState('');
  const S3FileUpload = new S3(awsConfig);

  //input ref
  const inputImageRef = useRef();

  const newFileName = uuid();
  const upload = (e) => {
    //e.target.files[0]
    S3FileUpload.uploadFile(validFiles[0], newFileName)
      .then((data) => {
        setUploadedPath(data.location);

        //Call node backend here and save data.location which contains the image url on s3

        setUploadComplete('uploaded');
        console.log(data.location);
      })
      .catch((err) => {
        alert(err);
      });
  };

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
    const files = [e.target.files[0]];
    if (files.length) {
      handleFiles(files);
    }
  };
  const openFile = (e) => {
    inputImageRef.current.click();
  };
  const fileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFiles(files);
    }
  };
  //validate files
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
  const handleFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        // add to an array so we can display the name of file
        setSelectedFiles([files[i]]);
        setValidFiles([files[i]]);
        reader.readAsDataURL(files[i]);
      } else {
        files[i]['invalid'] = true;
        // add to the same array so we can display the name of the file
        setSelectedFiles((prevArray) => [...prevArray, files[i]]);
        // set error message
        setErrorMessage('File type not permitted');
      }
    }
  };

  //handle reader
  reader.onload = function (e) {
    setPreviewPath(e.target.result);
  };

  //remove file
  const removeFile = (name) => {
    // find the index of the item
    // remove the item from array

    const validFileIndex = validFiles.findIndex((e) => e.name === name);
    validFiles.splice(validFileIndex, 1);
    // update validFiles array
    setValidFiles([...validFiles]);
    //remove preview image
    setPreviewPath('');
    const selectedFileIndex = selectedFiles.findIndex((e) => e.name === name);
    selectedFiles.splice(selectedFileIndex, 1);
    // update selectedFiles array
    setSelectedFiles([...selectedFiles]);
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
        <div
          className="drop-container"
          onDragOver={dragOver}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDrop={fileDrop}
          onClick={openFile}
        >
          <div className="drop-message">
            <div className="upload-icon"></div>
            Drag & Drop files here or click to upload
          </div>
        </div>

        <div className="file-display-container">
          {selectedFiles.map((data, i) => (
            <div className="file-status-bar" key={i}>
              <div>
                <span
                  className={`file-name ${data.invalid ? 'file-error' : ''}`}
                >
                  {data.name}
                </span>
                {data.invalid && (
                  <span className="file-error-message">({errorMessage})</span>
                )}
              </div>
              <div
                className="file-remove"
                onClick={() => removeFile(data.name)}
              >
                X
              </div>
            </div>
          ))}
        </div>

        {previewPath ? (
          <img className="image-preview" src={previewPath}></img>
        ) : null}
        {validFiles.length > 0 ? (
          <button className="file-upload-btn" onClick={() => upload()}>
            Upload Files
          </button>
        ) : (
          ''
        )}
        {uploadComplete ? <h1>Uploaded</h1> : null}
      </div>
    </div>
  );
};

export default UploadImage;
