export const resourceQueries = {
  readResources: `
    SELECT * FROM resource;
  `,

  readResourceById: `
    SELECT * FROM resource
    WHERE resource_id = ?;
  `,

  readResourcesByNameSearch: `
    SELECT * FROM resource
    WHERE name LIKE CONCAT('%', ?, '%');
  `,

  readResourcesByCategory: `
    SELECT * FROM resource
    WHERE category = ?;
  `,

  readResourcesByAvailability: `
    SELECT * FROM resource
    WHERE availability_status = ?;
  `,

  createResource: `
  INSERT INTO resource 
    (name, category, location, availability_status, image_url, last_updated)
  VALUES (?, ?, ?, ?, ?, CURDATE());
`,

  updateResource: `
  UPDATE resource
  SET
    name = ?,
    category = ?,
    location = ?,
    availability_status = ?,
    image_url = ?,
    last_updated = CURDATE()
  WHERE resource_id = ?;
`,

  deleteResource: `
    DELETE FROM resource
    WHERE resource_id = ?;
  `,
};
