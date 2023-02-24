// configs

const express = require("express");
const app = express();
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
//////////////////////////////////////////////////////////////////////////////// swagger config

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "DLICT API",
            version: "1.0.0",
            description: " Express DLICT API",
        },
        servers: [
            {
                url: "https://dlictchaingmaiarea1server.onrender.com",
            },
        ],
    },
    apis: ["./routes/*.js"],
};
const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

////////////////////////////////////////////////////////////////////////////////
require("dotenv").config();
const cors = require("cors");
const router = require("./routes");
const PORT = process.env.PORT || 7000;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(router);

const listener = app.listen(PORT, () => {
    console.log("Server is running on port " + listener.address().port);
});
