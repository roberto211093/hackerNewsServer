const mongoose = require("mongoose");
const app = require("./app");
const PORT_SERVER = process.env.PORT || 3977;
const {API_VERSION, IP_SERVER, DB_PORT, DB_NAME} = require("./config");
const request = require('request');

mongoose.set("useFindAndModify", false);

mongoose.connect(`mongodb://${IP_SERVER}:${DB_PORT}/${DB_NAME}`,
    {useNewUrlParser: true, useUnifiedTopology: true}, (err, res) => {
        if (err) {
            throw err;
        } else {
            app.listen(PORT_SERVER, () => {
                console.log("########################");
                console.log("### conexion exitosa ###");
                console.log("########################");

                console.log(`http://${IP_SERVER}:${PORT_SERVER}/api/${API_VERSION}/`);
            });

            setInterval(() => {
                request(`http://${IP_SERVER}:${PORT_SERVER}/api/${API_VERSION}/getNewsHn`);
            }, 1000 * 60 * 60);
        }
    });
