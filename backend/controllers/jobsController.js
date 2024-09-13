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

export const viewAllJob = (req, res) => {
    // TODO: Implement view jobs logic
};

export const viewJob = (req, res) => {
    // TODO: Implement view job logic
};

export const updateJob = (req, res) => {
    // TODO: Implement update job logic
};

export const deleteJob = (req, res) => {
    // TODO: Implement delete job logic
};
