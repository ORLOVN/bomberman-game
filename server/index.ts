import express from "express";
// import { sequelize } from "./database";
import middleware from "../ssr";
import router from "./router/router";
// import { SiteTheme } from "./db/models/site-theme";
// import {ETheme} from './db/models/enum';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(router);

app.use(express.static(__dirname));

app.get('/*', middleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

// (async () =>{
//   try {
//     await sequelize.sync({ force: true });

//     console.log("Connection has been established successfully.");

//     await SiteTheme.bulkCreate([
//       {
//         theme: ETheme.LIGHT
//       },
//       {
//         theme: ETheme.DARK
//       }
//     ]);

//     app.listen(PORT, () => {
//       console.log(`Listening on port ${PORT}...`);
//     });
//   } catch (error) {
//     console.error("Unable to connect to the database: ", error);
//   }
// })()
