import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

const jsDoc = swaggerJsdoc({
  definition: {
    openapi: "3.1.0",
    info: {
      title: "CD-Banking",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        authorization: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          value: "Bearer <JWT token here>",
        },
      },
    },
  },
  apis: ["./v1/routes/*.js"],
});

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(jsDoc));
  // app.get('/api.json',(req,res)=>{
  //   res.send(jsDoc)
  // })
};

export default setupSwagger;
