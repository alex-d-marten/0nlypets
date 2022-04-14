import React from 'react';
// import { createUploadLink } from "apollo-upload-client";
// import { ApolloClient, ApolloProvider, Mutation, InMemoryCache } from "apollo-client";
import { useMutation } from "@apollo/client";
import { UPLOAD_FILE } from "../../utils/mutations";

const ImageUploader = () => {
    const [uploadImage] = useMutation(UPLOAD_FILE, {
        onCompleted: (data) => console.log(data),
    });
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log(file)
        if (!file) return;
        uploadImage({ variables: { file } });
      };
    return (
        <div className='mt-3'>
            <input name={'document'} type={'file'} onChange={handleFileChange}/>
        </div>
    )
}

export default ImageUploader;