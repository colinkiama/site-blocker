import { stimulusApp } from "./app.js";

import BlockListController from "./controller/BlockListController";

stimulusApp.register("block-list", BlockListController);

console.log("Settings loaded!");