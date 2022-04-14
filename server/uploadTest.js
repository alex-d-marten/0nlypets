require("dotenv").config();
const cloudinary = require("cloudinary").v2;
console.log(cloudinary.config().cloud_name);

cloudinary.uploader
    .upload("./uploadedFiles/cat-pic-1.jpg", {
        resource_type: "image",
    })
    .then((results) => {
        console.log("Success!", JSON.stringify(results, null, 2));
        console.log(results.secure_url)
    })
    .catch((error) => {
        console.log("Error!", JSON.stringify(error, null, 2));
    })