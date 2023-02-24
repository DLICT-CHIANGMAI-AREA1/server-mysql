
const swaggerDocument = {
	swaggerDefinition: {
	  openapi: "3.0.0",
	  info: {
		title: "DLICT API",
		version: "1.0.0",
	  },
	  servers: [
		{
		  url: "https://dlictchaingmaiarea1server.onrender.com",
		},
	  ],
	  components: {
		securitySchemes: {
		  bearerAuth: {
			type: "http",
			scheme: "bearer",
			bearerFormat: "JWT",
		  },
		},
	  },
	  security: [
		{
		  bearerAuth: [],
		},
	  ], 
	},
	apis: ["*.js"],
  };

module.exports = swaggerDocument