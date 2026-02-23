export const eventQueries = {
  readEvents: `
    SELECT * FROM event;
  `,

  readEventById: `
    SELECT * FROM event
    WHERE event_id = ?;
  `,

  readEventsByTitleSearch: `
    SELECT * FROM event
    WHERE title LIKE CONCAT('%', ?, '%');
  `,

  readEventsByDate: `
    SELECT * FROM event
    WHERE event_date = ?;
  `,

  readEventsByResource: `
    SELECT * FROM event
    WHERE resource_id = ?;
  `,

  createEvent: `
  INSERT INTO event 
    (title, description, event_date, resource_id, image_url)
  VALUES (?, ?, ?, ?, ?);
`,

  updateEvent: `
  UPDATE event
  SET
    title = ?,
    description = ?,
    event_date = ?,
    resource_id = ?,
    image_url = ?
  WHERE event_id = ?;
`,

  deleteEvent: `
    DELETE FROM event
    WHERE event_id = ?;
  `,
};
