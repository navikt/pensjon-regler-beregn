import express from "express";
import routes from "./route/routes";
import healthRouter from "./health";
import path from "node:path";
import {serverConfiguration} from "./environment/config";

const serverConfig = serverConfiguration;

const app = express();
const port = serverConfig.exposedPort;
const staticDir = path.resolve(__dirname, "../../frontend/dist");

app.use(express.json());
app.use('/internal', healthRouter);

app.use(routes());

app.use(express.static(staticDir));
app.use((req, res, next) => {
    if (req.method !== 'GET') return next();
    res.sendFile(path.join(staticDir, 'index.html'), (err) => {
        if (err) next(err);
    });
});

app.listen(port, () => {
    console.log(`Logviewer server kjører på port ${port}`);
    console.log(`Tilgangskontroll er ${serverConfig.enableAccessControl ? "på" : "av"}`);
});