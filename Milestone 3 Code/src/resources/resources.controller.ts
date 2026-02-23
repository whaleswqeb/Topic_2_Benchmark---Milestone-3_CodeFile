import { Request, RequestHandler, Response } from "express";
import { Resource } from "./resources.model";
import { ResourceDAO } from "./resources.dao";


export const readResources: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    let resources: Resource[];
    const resourceId = parseInt(req.query.resourceId as string);

    console.log("resourceId:", resourceId);

    if (Number.isNaN(resourceId)) {
      resources = await ResourceDAO.findAll();
    } else {
      const resource = await ResourceDAO.findById(resourceId);
      resources = resource ? [resource] : [];
    }

    res.status(200).json({
      resources,
    });
  } catch (error) {
    console.error("[resources.controller][readResources][Error]", error);
    res.status(500).json({
      message: "There was an error when fetching resources",
    });
  }
};


export const readResourcesByNameSearch: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const search = req.params.search;

    console.log("search by name:", search);

    const resources = await ResourceDAO.searchByName(search);

    res.status(200).json(resources);
  } catch (error) {
    console.error(
      "[resources.controller][readResourcesByNameSearch][Error]",
      error,
    );
    res.status(500).json({
      message: "There was an error when searching resources by name",
    });
  }
};


export const readResourcesByCategory: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const category = req.params.category;

    const resources = await ResourceDAO.filterByCategory(category);

    res.status(200).json(resources);
  } catch (error) {
    console.error(
      "[resources.controller][readResourcesByCategory][Error]",
      error,
    );
    res.status(500).json({
      message: "There was an error when filtering resources by category",
    });
  }
};


export const readResourcesByAvailability: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const status = parseInt(req.params.status);

    if (Number.isNaN(status)) {
      return res.status(400).json({
        message: "Availability status must be 0 or 1",
      });
    }

    const resources = await ResourceDAO.filterByAvailability(status);

    res.status(200).json(resources);
  } catch (error) {
    console.error(
      "[resources.controller][readResourcesByAvailability][Error]",
      error,
    );
    res.status(500).json({
      message: "There was an error when filtering resources by availability",
    });
  }
};


export const createResource: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const resource: Resource = req.body;

    const insertId = await ResourceDAO.create(resource);

    res.status(201).json({
      message: "Resource created successfully",
      resource_id: insertId,
    });
  } catch (error) {
    console.error("[resources.controller][createResource][Error]", error);
    res.status(500).json({
      message: "There was an error when creating resource",
    });
  }
};


export const updateResource: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const resource: Resource = req.body;

    if (!resource.resource_id) {
      return res.status(400).json({
        message: "resource_id is required for update",
      });
    }

    await ResourceDAO.update(resource);

    res.status(200).json({
      message: "Resource updated successfully",
    });
  } catch (error) {
    console.error("[resources.controller][updateResource][Error]", error);
    res.status(500).json({
      message: "There was an error when updating resource",
    });
  }
};


export const deleteResource: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const resourceId = parseInt(req.params.resourceId);

    if (Number.isNaN(resourceId)) {
      return res.status(400).json({
        message: "Integer expected for resourceId",
      });
    }

    await ResourceDAO.delete(resourceId);

    res.status(200).json({
      message: "Resource deleted successfully",
    });
  } catch (error) {
    console.error("[resources.controller][deleteResource][Error]", error);
    res.status(500).json({
      message: "There was an error when deleting resource",
    });
  }
};
