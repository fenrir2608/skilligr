import conn from "../helpers/connection.js"

export const createJob = async (req, res) => {
    try {
        const { job_title, description, created_by, company_name, company_profile, registration_link, dept, semester, deadline} = req.body;

        const [adminUser] = await conn.query(`
            SELECT id FROM users WHERE id = ? AND role = 'admin'
          `, [created_by]);
    
          if (adminUser.length === 0) {
            return res.status(400).send("Invalid created_by ID");
          }
        
        const currentTimestamp = Math.floor(Date.now() / 1000);

        if (new Date(deadline).getTime() / 1000 < currentTimestamp) {
            return res.status(400).send("Deadline cannot be set before the current time.");
        }
          
        const deadlineTimestamp = new Date(deadline).getTime() / 1000;

        if (isNaN(deadlineTimestamp)) {
            return res.status(400).send("Invalid deadline format. Please provide a valid timestamp.");
        }

          const [result] = await conn.query(
            `
            INSERT INTO jobs (job_title, description, created_by, company_name, company_profile, registration_link, dept, semester, deadline)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [job_title, description, created_by, company_name, company_profile, registration_link, dept, semester, deadline]
          );

          res.status(201).send("Job posted successfully");
    } catch (error) {
        console.error("error: ", error);
        res.status(500).send("Failed to create Job posting.");
    }
};

export const viewAllJob = async (req, res) => {
    try {
        const [result] = await conn.query(`
            SELECT 
            j.id,
            j.job_title,
            j.company_name,
            j.company_profile,
            j.description,
            j.registration_link,
            CONVERT_TZ(j.deadline, '+00:00', '+05:30') as deadline,
            u.full_name AS created_by
            FROM 
            jobs j
            JOIN 
            users u ON j.created_by = u.id;`);
    
        if (result.length === 0) {
          return res.status(404).send("No Jobs posted.");
        }
    
        res.status(200).send(result);
      } catch (error) {
        console.error("error: ", error);
        res.status(500).send("Can't retrieve jobs!");
      }
};

export const viewJob = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await conn.query(`
            SELECT 
            j.id,
            j.job_title,
            j.company_name,
            j.company_profile,
            j.description,
            j.registration_link,
            CONVERT_TZ(j.deadline, '+00:00', '+05:30') as deadline,
            u.full_name AS created_by
            FROM 
            jobs j
            JOIN 
            users u ON j.created_by = u.id
            AND j.id = ?;`, [id]);
    
        if (result.length === 0) {
          return res.status(404).send("Job not found.");
        }
    
        res.status(200).send(result);
      } catch (error) {
        console.error("error: ", error);
        res.status(500).send("Can't retrieve job!");
      }
};

export const updateJob = (req, res) => {
    // TODO: Implement update job logic
};

export const deleteJob = (req, res) => {
    // TODO: Implement delete job logic
};
