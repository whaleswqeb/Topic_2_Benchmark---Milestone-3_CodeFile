import { Router } from "express";
import * as ResourcesController from "./resources.controller";

const router = Router();


router
  .route("/resources")
  .get(ResourcesController.readResources)
  .post(ResourcesController.createResource)
  .put(ResourcesController.updateResource);


router
  .route("/resources/search/name/:search")
  .get(ResourcesController.readResourcesByNameSearch);


router
  .route("/resources/category/:category")
  .get(ResourcesController.readResourcesByCategory);


router
  .route("/resources/availability/:status")
  .get(ResourcesController.readResourcesByAvailability);


router
  .route("/resources/:resourceId")
  .delete(ResourcesController.deleteResource);

export default router;
