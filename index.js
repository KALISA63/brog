const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const multer = require("multer");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const catRoute = require("./routes/cats");
const router = require("./routes/users");
const swaggerUI =require("swagger-ui-express");
const swaggerJSDoc= require("swagger-jsdoc");
const cors = require("cors");

dotenv.config();
app.use(express.json()); //allow to send json body into the object
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.CONNECTION)
  .then(console.log("DB connected"))
  .catch((err) => console.log(err));

//swagger documentation

app.use(cors());
const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'My APIs documentation',
            version: '1.0.0',
            description: 'This is my API documentation'
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'apiKey',
                    scheme: 'bearer',
                    name: 'Authorization',
                    in: 'header',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [{
            bearerAuth: []
        }],
        servers: [{
            url: 'https://localhost:8000'
        }]
      
    },
    apis: ['./routes/*.js'],
}
const specs = swaggerJSDoc(options)

app.listen("8000", () => {
  console.log("KALISA Jacques");
});

app.get("/", (req, res) => {
  res.send("KALISA Jacques");
});

app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/cats", catRoute);
app.use(cors());
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));
