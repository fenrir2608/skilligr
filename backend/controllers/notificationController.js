import conn from "../helpers/connection.js";

export const createNotification = (req, res) => {
  
};

export const viewAllNotification = async (req, res) => {
  try {
    const [result] = await conn.query(`
        SELECT 
        n.description,
        u.full_name AS created_by_name
        FROM 
        notifications n
        JOIN 
        users u ON n.created_by = u.id;`);

    res.status(200).send(result);
  } catch (error) {
    console.error("error: ", error);
    res.status(500).send("cant get notifications");
  }
};

export const viewNotification = async(req, res) => {
  // TODO: Implement view notification logic
  try
  {
    const id = req.params.id;

    const [checkResult] = await conn.query(`select * from notifications where id = ?`, [id]);
    if(checkResult.length === 0)
    {
      return res.status(404).send("Notification not found");
    }

    const [result] = await conn.query(`
        SELECT 
        n.description,
        u.full_name AS created_by_name
        FROM 
        notifications n
        JOIN 
        users u ON n.created_by = u.id
        WHERE
        n.id = ?;`, [id]);

    res.status(200).send(result);
  }
  catch(error)
  {
    console.error("error: ", error);
    res.status(500).send("cant get notifications");
  }
};


export const deleteNotification = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const userId = 2 //req.session.userId; 

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
      const { description, created_by, label, dept, semester } = req.body;

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
=======

