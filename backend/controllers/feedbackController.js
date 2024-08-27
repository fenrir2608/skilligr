import conn from "../helpers/connection.js"

export const insertFeedback = async (req, res) => {
    try {
        const { user_id, title, feedback, is_anonymous } = req.body;

        const [user] = await conn.query(
            `
            SELECT * FROM user_details WHERE user_id = ?
            `,
            [user_id]
        );

        if (user.length === 0) {
            return res.status(400).send("Invalid user_id");
        }

        if (is_anonymous !== 0 && is_anonymous !== 1) {
            return res.status(400).send("Invalid is_anonymous value");
        }
        const [result] = await conn.query(
        `
        INSERT INTO feedbacks (user_id, title, feedback, is_anonymous)
        VALUES (?, ?, ?, ?)
        `,
        [user_id, title, feedback, is_anonymous]
        );

        res.status(201).send("Feedback inserted successfully");
    }   catch (error) {
        console.error("error: ", error);
        res.status(500).send("Failed to insert feedback");
    }
};

export const viewAllFeedback = async (req, res) => {
    try {
        const [result] = await conn.query(`
            SELECT 
            f.id,
            f.title,
            f.feedback, 
            CASE
                WHEN f.is_anonymous = 0 THEN u.full_name
                ELSE 'Anonymous User'
            END AS feedback_by
            FROM 
            feedbacks f
            JOIN 
            users u ON f.user_id = u.id;`);

        if (result.length === 0) {
            return res.status(404).send("No Feedbacks.");
            }

        res.status(200).send(result);
      } catch (error) {
        console.error("error: ", error);
        res.status(500).send("Can't get feedbacks!");
      }
};

export const viewFeedback = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await conn.query(`
            SELECT 
            f.id,
            f.title,
            f.feedback, 
            CASE
                WHEN f.is_anonymous = 0 THEN u.full_name
                ELSE 'Anonymous User'
            END AS feedback_by
            FROM 
            feedbacks f
            JOIN 
            users u ON f.user_id = u.id
            AND f.id = ?;`, [id]);
    
        if (result.length === 0) {
            return res.status(404).send("Feedback not found");
            }    

        res.status(200).send(result);
      } catch (error) {
        console.error("error: ", error);
        res.status(500).send("Can't get feedback!");
      }
};