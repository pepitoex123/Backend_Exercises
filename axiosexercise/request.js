const axios = require("axios");

axios.get("https://www.google.com")
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.log("Oops there was an error: " + error.message);
    })
    .then(() => {
        console.log("All done!");
    })