import conn from "../helpers/connection.js";

export const createNotification = async (req, res) => {
    try {
      const { description, created_by, label, dept, semester } = req.body;

      const [adminUser] = await conn.query(`
        SELECT id FROM users WHERE id = ? AND role = 'admin'
      `, [created_by]);

      if (adminUser.length === 0) {
        return res.status(400).send("Invalid created_by ID");
      }

      const [result] = await conn.query(
        `
        INSERT INTO notifications (description, created_by, label, dept, semester)
        VALUES (?, ?, ?, ?, ?)
        `,
        [description, created_by, label, dept, semester]
      );

      res.status(201).send("Notification created successfully");
    } catch (error) {
      console.error("error: ", error);
      res.status(500).send("Failed to create notification");
    }
  };

export const viewAllNotification = async (req, res) => {
  try {
    const [result] = await conn.query(`
        SELECT 
        n.id,
        n.description, 
        n.label,
        u.full_name AS created_by
        FROM 
        notifications n
        JOIN 
        users u ON n.created_by = u.id;`);

    if (result.length === 0) {
      return res.status(404).send("No Notifications.");
    }

    res.status(200).send(result);
  } catch (error) {
    console.error("error: ", error);
    res.status(500).send("Can't get notifications!");
  }
};

export const viewNotification = async (req, res) => {
  try {
    const { id } = req.params; 

    const [result] = await conn.query(`
        SELECT 
        n.description, 
        n.label,
        u.full_name AS created_by
        FROM 
        notifications n
        JOIN 
        users u ON n.created_by = u.id 
        AND n.id = ?;`, [id]); 

    if (result.length === 0) {
      return res.status(404).send("Notification not found");
    }
        
    res.status(200).send(result);
  } catch (error) {
    console.error("error: ", error);
    res.status(500).send("Can't get notification!");
  }
};

export const updateNotification = async (req, res) => { //put condition that only the admin who created notofication can update it.
    try {
      const { id } = req.params;
      const { description, created_by, label, dept, semester } = req.body;

      const [adminUser] = await conn.query(`
        SELECT id FROM users WHERE id = ? AND role = 'admin'
      `, [created_by]);

      if (adminUser.length === 0) {
        return res.status(400).send("Invalid created_by ID");
      }

      const [result] = await conn.query(`
        UPDATE notifications 
        SET description = ?, created_by = ?, label = ?, dept = ?, semester = ?
        WHERE id = ?
      `, [description, created_by, label, dept, semester, id]);

      if (result.affectedRows === 0) {
        return res.status(404).send("Notification not found");
      }

      res.status(200).send("Notification updated successfully");
    } catch (error) {
      console.error("error: ", error);
      res.status(500).send("Failed to update notification");
    }
  };

export const deleteNotification = (req, res) => {
  // TODO: Implement delete notification logic
};
