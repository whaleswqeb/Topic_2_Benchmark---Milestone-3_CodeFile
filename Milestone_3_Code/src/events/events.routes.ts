import { Router } from "express";
import * as EventsController from "./events.controller";

const router = Router();

router
  .route("/events")
  .get(EventsController.readEvents)
  .post(EventsController.createEvent)
  .put(EventsController.updateEvent);

router
  .route("/events/search/title/:search")
  .get(EventsController.readEventsByTitleSearch);

router.route("/events/date/:date").get(EventsController.readEventsByDate);

router
  .route("/events/resource/:resourceId")
  .get(EventsController.readEventsByResource);

router.route("/events/:eventId").delete(EventsController.deleteEvent);

export default router;
