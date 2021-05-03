import { stimulusApp } from "./app.js";

import BlockListController from "./controller/BlockListController";
import BlockListItemController from "./controller/BlockListItemController";

stimulusApp.register("block-list", BlockListController);
stimulusApp.register("block-list-item", BlockListItemController);

console.log("Settings loaded!");