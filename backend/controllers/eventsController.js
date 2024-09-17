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

    const [checkResult] = await conn.query(`select * from events where id = ?`, [id]);
    if(checkResult.length === 0)
    {
      return res.status(404).send("event not found");
    }


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

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      event_link,
      dept,
      semester,
      scheduled_at,
      ends_at,
    } = req.body;

    const created_by = 2; //req.cookies.userId;

    const [event] = await conn.query(`SELECT created_by FROM events WHERE id = ?`,[id]);

    if (event.length === 0) {
      return res.status(404).send("event not found");
    }

    if (event[0].created_by !== created_by) {
      return res
        .status(403)
        .send("You are not authorized to update this event");
    }

    const fieldsToUpdate = {};
    if (title !== undefined && title !== "") fieldsToUpdate.title = title;
    if (description !== undefined && description !== "")
      fieldsToUpdate.description = description;
    if (event_link !== undefined && event_link !== "")
      fieldsToUpdate.event_link = event_link;
    if (semester !== undefined && semester !== "")
      fieldsToUpdate.semester = semester;
    if (dept !== undefined && dept !== "") fieldsToUpdate.dept = dept;
    if (scheduled_at !== undefined && scheduled_at !== "")
      fieldsToUpdate.scheduled_at = scheduled_at;
    if (ends_at !== undefined && ends_at !== "")
      fieldsToUpdate.ends_at = ends_at;

    if (Object.keys(fieldsToUpdate).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Nothing to update.",
      });
    }

    const setClause = Object.keys(fieldsToUpdate)
      .map((field) => `${field} = ?`)
      .join(", ");

    const values = Object.values(fieldsToUpdate);
    values.push(id);

    const query = `UPDATE events SET ${setClause} WHERE id = ?`;
    await conn.query(query, values);

    res.status(200).send("event updated successfully");
  } catch (error) {
    console.error("error: ", error);
    res.status(500).send("Failed to update event");
  }
};

export const deleteEvent = async (req, res) => {
  // TODO: Implement delete event logic
  try {
    const { eventId } = req.body;
    const userId = 2; //req.cookies.userId;

    const [checkResult] = await conn.query(
      `
      SELECT created_by FROM events WHERE id = ?;
    `,
      [eventId]
    );

    if (checkResult.length === 0) {
      return res.status(404).send("event not found");
    }

    const event = checkResult[0];
    if (event.created_by !== userId) {
      return res
        .status(403)
        .send("You are not authorized to delete this event");
    }

    await conn.query(`DELETE FROM event WHERE id = ?;`, [eventId]);

    res.status(200).send("event deleted successfully");
  } catch (error) {
    console.error("error: ", error);
    res.status(500).send("cant delete event");
  }
};
