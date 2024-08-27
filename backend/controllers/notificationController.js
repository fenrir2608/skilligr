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

export const updateNotification = (req, res) => {
  // TODO: Implement update notification logic
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
