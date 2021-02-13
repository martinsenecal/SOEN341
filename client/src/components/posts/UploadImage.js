import React, { useState } from 'react';
import S3 from 'react-aws-s3';
import { v4 as uuid } from 'uuid';

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
  const [uploadedPath, setUploadedPath] = useState('');
  const S3FileUpload = new S3(awsConfig);

  const newFileName = uuid();
  const upload = (e) => {
    S3FileUpload.uploadFile(e.target.files[0], newFileName)
      .then((data) => {
        setUploadedPath(data.location);
        console.log(data.location);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div id="uploader">
      <input type="file" onChange={upload} />
      <br />
      {uploadedPath ? <img src={uploadedPath} alt=""></img> : null}
    </div>
  );
};

export default UploadImage;
