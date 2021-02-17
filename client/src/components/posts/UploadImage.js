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
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [validFiles, setValidFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadComplete, setUploadComplete] = useState('');
  const [previewPath, setPreviewPath] = useState('');
  const S3FileUpload = new S3(awsConfig);

  //input ref
  const inputImageRef = useRef();

  const newFileName = uuid();
  useImperativeHandle(ref, () => ({
    async upload() {
      //e.target.files[0]
      return S3FileUpload.uploadFile(validFiles[0], newFileName)
        .then(async (data) => {
          return data.location;
        })

        .catch((err) => {
          alert(err);
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
        setSelectedFiles([]);
        setValidFiles([]);
        // set error message
        alert('File type not permitted');
      }
    }
  };

  //handle reader
  reader.onload = function (e) {
    setPreviewPath(e.target.result);
  };

  //remove file
  const removeFile = () => {
    setValidFiles([]);
    //remove preview image
    setPreviewPath('');
    setSelectedFiles([]);
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
              <i className="fa fa-cloud-upload"></i>
              Drag & Drop files here or click to upload
            </div>
          </div>
        ) : null}

        {previewPath ? (
          <img className="image-preview" src={previewPath}></img>
        ) : null}
        {validFiles.length > 0 ? (
          <div className="upload-button mt-2">
            <button
              type="button"
              className="ml-1 btn btn-outline-danger"
              onClick={removeFile}
            >
              Remove
            </button>
          </div>
        ) : (
          ''
        )}
        {uploadComplete ? <h1>Uploaded</h1> : null}
      </div>
    </div>
  );
});

export default UploadImage;
