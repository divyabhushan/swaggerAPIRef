
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./swagger.yaml');

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const { router } = require("./routes/app.routes");

const app = express ();
const port = 5000;

const options = {
    swaggerDefinition: {
        openapi: '3.0.1',
    basePath: '/v2',
    schemes: [
        'https',
        'http'
    ],
    paths: {
        '/pet': {
            'post': {
                'tags': [
                    'pet'
                ],
            'summary': 'Add a new pet',
            'operationId': 'addPet',
            'consumes': [
                'application/json',
                'application/xml'
            ],
            'produces': [
                'application/xml',
                'application/json'
            ],
            'parameters': [
                {
                'in': 'body',
                'name': 'body',
                'description': 'Pet object that needs to be added to the store',
                'required': true,
                'schema': {
                    'type': 'object',
                    'required': [
                        'name',
                        'photoUrls'
                    ],
                    'properties': {
                        'id':  {
                            'type': 'integer',
                            'format': 'int64'
                        },
                        'name': {
                            'type': 'string',
                            'example': 'doggie'
                        },
                    }
                }
                },
            ],
            'responses': {
                '200': {
                    'description': 'Successful operation',
                    'schema': {
                        'type': 'array'
                    },
                },
            },
            },
        },
    },
    },
    apis: ["./routes/*.js"],
};

const swaggerSpecs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api", router);

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname});
    //res.send("Generating SwaggerAPI documentation");
});

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});

