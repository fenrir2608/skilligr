import conn from "../helpers/connection.js";

export const createNotification = (req, res) => {
  // TODO: Implement create notification logic
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

export const viewNotification = (req, res) => {
  // TODO: Implement view notification logic
};

export const updateNotification = (req, res) => {
  // TODO: Implement update notification logic
};

export const deleteNotification = (req, res) => {
  // TODO: Implement delete notification logic
};
