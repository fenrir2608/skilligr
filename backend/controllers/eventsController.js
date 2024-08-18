import conn from "../helpers/connection.js";

export const createEvent = async (req, res) => {
  // TODO: Implement create event logic
  try {
    const title = req.body.title;
    const description = req.body.description;
    const event_link = req.body.event_link;
    const dept = req.body.dept;
    const semester = req.body.semester;
    const scheduled_at = req.body.scheduled_at;
    const ends_at = req.body.ends_at;
    const created_by = req.body.created_by;

    const [result] = await conn.query(
      `INSERT INTO events (title, description, event_link, dept, semester, scheduled_at, ends_at, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description,
        event_link,
        dept,
        semester,
        scheduled_at,
        ends_at,
        created_by,
      ]
    );
    res.status(200).send("event created");
  } catch (error) {
    console.error("error: ", error);
    res.status(500).send("cant create event");
  }
};

export const viewAllEvent = async (req, res) => {
  // TODO: Implement view events logic
  try {
    const [result] = await conn.query(`
            SELECT
            e.title, 
            e.description,
            e.event_link,
            e.dept,
            e.semester,
            e.scheduled_at,
            e.ends_at,
            u.full_name AS created_by_name
            FROM 
            events e
            JOIN 
            users u ON e.created_by = u.id;`);

    res.status(200).send(result);
  } catch (error) {
    console.error("error: ", error);
    res.status(500).send("cant get notifications");
  }
};

export const viewEvent = async (req, res) => {
  // TODO: Implement view event logic
  try {
    const id = req.params.id;
    const [result] = await conn.query(
      `SELECT 
    e.title,
    e.description,
    e.event_link,
    e.dept,
    e.semester,
    e.scheduled_at,
    e.ends_at,
    u.full_name AS created_by_name
    FROM 
    events e
    JOIN 
    users u ON e.created_by = u.id
    WHERE 
    e.id = ?;`,
      [id]
    );
    res.status(200).send(result);
  } catch (error) {
    console.error("error: ", error);
    res.status(500).send("cant get event");
  }
};

export const updateEvent = (req, res) => {
  // TODO: Implement update event logic
};

export const deleteEvent = (req, res) => {
  // TODO: Implement delete event logic
  try {
    const id = req.query.id;
    const [result] = conn.query(`DELETE FROM events WHERE id = ?`, [id]);
  } catch (error) {
    console.log(error);
    res.status(500).send("cant delete event");
  }
};
