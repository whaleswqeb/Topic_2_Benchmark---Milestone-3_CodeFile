import { Request, RequestHandler, Response } from "express";
import { Event } from "./events.model";
import { EventDAO } from "./events.dao";


export const readEvents: RequestHandler = async (req, res) => {
  try {
    let events: Event[];
    const eventId = parseInt(req.query.eventId as string);

    if (Number.isNaN(eventId)) {
      events = await EventDAO.findAll();
    } else {
      const event = await EventDAO.findById(eventId);
      events = event ? [event] : [];
    }

    res.status(200).json({ events });
  } catch (error) {
    console.error("[events.controller][readEvents][Error]", error);
    res.status(500).json({
      message: "Error fetching events",
    });
  }
};


export const readEventsByTitleSearch: RequestHandler = async (req, res) => {
  try {
    const events = await EventDAO.searchByTitle(req.params.search);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({
      message: "Error searching events",
    });
  }
};


export const readEventsByDate: RequestHandler = async (req, res) => {
  try {
    const events = await EventDAO.filterByDate(req.params.date);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({
      message: "Error filtering events by date",
    });
  }
};


export const readEventsByResource: RequestHandler = async (req, res) => {
  try {
    const resourceId = parseInt(req.params.resourceId);

    if (Number.isNaN(resourceId)) {
      return res.status(400).json({
        message: "Integer expected for resourceId",
      });
    }

    const events = await EventDAO.filterByResource(resourceId);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({
      message: "Error filtering events by resource",
    });
  }
};


export const createEvent: RequestHandler = async (req, res) => {
  try {
    const event: Event = req.body;

    const insertId = await EventDAO.create(event);

    res.status(201).json({
      message: "Event created successfully",
      event_id: insertId,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating event",
    });
  }
};


export const updateEvent: RequestHandler = async (req, res) => {
  try {
    const event: Event = req.body;

    if (!event.event_id) {
      return res.status(400).json({
        message: "event_id is required",
      });
    }

    await EventDAO.update(event);

    res.status(200).json({
      message: "Event updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating event",
    });
  }
};


export const deleteEvent: RequestHandler = async (req, res) => {
  try {
    const eventId = parseInt(req.params.eventId);

    if (Number.isNaN(eventId)) {
      return res.status(400).json({
        message: "Integer expected for eventId",
      });
    }

    await EventDAO.delete(eventId);

    res.status(200).json({
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting event",
    });
  }
};
