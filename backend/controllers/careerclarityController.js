import conn from "../helpers/connection.js"

export const insertScore = async (req, res) => {
    try{
        const { user_id, score } = req.body;

        const [user] = await conn.query(
            `
            SELECT * FROM user_details WHERE user_id = ?
            `,
            [user_id]
        );

        if (user.length === 0) {
            return res.status(400).send("Invalid user_id");
        }

        const [result] = await conn.query(
            `
            INSERT INTO career_assessment (user_id, score)
            VALUES (?, ?)
            `,
            [user_id, score]
        );

        res.status(201).send("Score inserted successfully!");

    }catch(error){
        console.error("error: ", error);
        res.status(500).send("Failed to insert score!");
    }
};

export const viewAllLearningpaths = async (req, res) => {
    try {
        const [result] = await conn.query(`
            SELECT 
            l.id,
            l.title,
            l.category,
            l.description
            FROM
            learning_paths l;`);
    
        if (result.length === 0) {
          return res.status(404).send("No Learning paths exist.");
        }
    
        res.status(200).send(result);

    }catch(error){
        console.error("error: ", error);
        res.status(500).send("Can't retrieve learning paths!");
    }
};

export const viewLearningpath = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await conn.query(`
            SELECT 
            l.id,
            l.title,
            l.category,
            l.description
            FROM
            learning_paths l
            WHERE
            l.id = ?;`, [id]);
    
        if (result.length === 0) {
          return res.status(404).send("Learning path not found.");
        }
    
        res.status(200).send(result);

    }catch(error){
        console.error("error: ", error);
        res.status(500).send("Can't retrieve learning path!");
    }
};