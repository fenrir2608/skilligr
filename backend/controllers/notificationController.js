import conn from "../helpers/connection.js";
import { getCreatedById } from "../helpers/getCreatedById.js";
import { getUserDetails } from "../helpers/getUserDetails.js";

export const createNotification = async (req, res) => {
    try {

      const created_by = await getCreatedById(req);

      const { description, label, dept, semester } = req.body;

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
        n.dept,
        n.semester,
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
        n.dept,
        n.semester,
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


export const deleteNotification = async (req, res) => {
  try {
    const notificationId = req.params.id;    
    const userId = await getCreatedById(req);

    const [checkResult] = await conn.query(`
      SELECT created_by FROM notifications WHERE id = ?;
    `, [notificationId]);

    if (checkResult.length === 0) {
      return res.status(404).send('Notification not found');
    }

    const notification = checkResult[0];
    if (notification.created_by !== userId) {
      return res.status(403).send('You are not authorized to delete this notification');
    }

    const [deleteResult] = await conn.query(`
      DELETE FROM notifications WHERE id = ?;
    `, [notificationId]);

    res.status(200).send('Notification deleted successfully');
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).send('Cannot delete notification');
  }
};

export const updateNotification = async (req, res) => { 
    try {
      const { id } = req.params;
      const created_by = await getCreatedById(req);
      const { description, label, dept, semester } = req.body;

      const [notification] = await conn.query(`
        SELECT created_by FROM notifications WHERE id = ?;
      `, [id]);

      if (notification.length === 0) {
        return res.status(404).send("Notification not found");
      }

      if (notification[0].created_by !== created_by) {
        return res.status(403).send("You are not authorized to update this notification");
      }

      const fieldsToUpdate = {};
      if (description !== undefined && description !== "") fieldsToUpdate.description = description;
      if (label !== undefined && label !== "") fieldsToUpdate.label = label;
      if (semester !== undefined && semester !== "") fieldsToUpdate.semester = semester;
      if (dept !== undefined && dept !== "") fieldsToUpdate.dept = dept;

      if (Object.keys(fieldsToUpdate).length === 0) {
        return res.status(400).json({
          success: false,
          message: "Nothing to update.",
        });
      }

      const setClause = Object.keys(fieldsToUpdate)
        .map(field => `${field} = ?`)
        .join(', ');

      const values = Object.values(fieldsToUpdate);
      values.push(id); 

      const query = `UPDATE notifications SET ${setClause} WHERE id = ?`;
      await conn.query(query, values);

      res.status(200).send("Notification updated successfully");
    } catch (error) {
      console.error("error: ", error);
      res.status(500).send("Failed to update notification");
    }
};

export const getNotificationsUser = async (req, res) => {
  try {
    const User = await getUserDetails(req);
    const [result] = await conn.query(`
      SELECT 
      n.id,
      n.description, 
      n.label,
      u.full_name AS created_by
      FROM 
      notifications n
      JOIN 
      users u ON n.created_by = u.id 
      AND n.dept =? AND n.semester = ? AND n.id;`, [User.dept, User.semester]);

    if (result.length === 0) {
      return res.status(404).send("No Notifications.");
    }

    res.status(200).send(result);
  } catch (error) {
    console.error("error: ", error);
    res.status(500).send("Can't get notifications!");
  }
}

export const getNotificationUser = async (req, res) => {
  try {
    const nid = req.params.id;
    const User = await getUserDetails(req);
    const [result] = await conn.query(`
      SELECT
      n.description, 
      n.label,
      u.full_name AS created_by
      FROM 
      notifications n
      JOIN 
      users u ON n.created_by = u.id 
      AND n.dept =? AND n.semester = ? AND n.id = ?;`, [User.dept, User.semester, nid]);

    if (result.length === 0) {
      return res.status(404).send("Notification not found.");
    }

    res.status(200).send(result);
  } catch (error) {
    console.error("error: ", error);
    res.status(500).send("Can't get notification!");
  }
}