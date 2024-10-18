import conn from "../helpers/connection.js"
import { getCreatedById } from "../helpers/getCreatedById.js";
import { getUserDetails } from "../helpers/getUserDetails.js";

export const createJob = async (req, res) => {
    try {
        const created_by = await getCreatedById(req);
        const { job_title, description, company_name, company_profile, registration_link, dept, semester, deadline} = req.body;

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
            j.dept,
            j.semester,
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
            j.dept,
            j.semester,
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

export const updateJob = async (req, res) => {
  try {
    const created_by = await getCreatedById(req);
    const { job_title, description, company_name, company_profile, registration_link, dept, semester, deadline} = req.body;
    const { id } = req.params;

    const [job] = await conn.query(`
      SELECT created_by FROM jobs WHERE id = ?;
    `, [id]);

    if (job.length === 0) {
      return res.status(404).send("Job Posting not found");
    }

    if (job[0].created_by !== created_by) {
      return res.status(403).send("You are not authorized to update this job posting!");
    }

    const fieldsToUpdate = {};
    if (job_title !== undefined && job_title !== "") fieldsToUpdate.job_title = job_title;
    if (description !== undefined && description !== "") fieldsToUpdate.description = description;
    if (company_name !== undefined && company_name !== "") fieldsToUpdate.company_name = company_name;
    if (company_profile !== undefined && company_profile !== "") fieldsToUpdate.company_profile = company_profile;
    if (registration_link !== undefined && registration_link !== "") fieldsToUpdate.registration_link = registration_link;
    if (semester !== undefined && semester !== "") fieldsToUpdate.semester = semester;
    if (dept !== undefined && dept !== "") fieldsToUpdate.dept = dept;
    if (deadline !== undefined && deadline !== "") fieldsToUpdate.deadline = deadline;

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

    const query = `UPDATE jobs SET ${setClause} WHERE id = ?`;
    await conn.query(query, values);

    res.status(200).send("Job Posting updated successfully");
  } catch (error) {
    console.error("error: ", error);
    res.status(500).send("Failed to update job posting");
  }
};

export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = await getCreatedById(req); 

    const [checkResult] = await conn.query(`
      SELECT created_by FROM jobs WHERE id = ?;
    `, [jobId]);

    if (checkResult.length === 0) {
      return res.status(404).send('Job posting not found');
    }

    const notification = checkResult[0];
    if (notification.created_by !== userId) {
      return res.status(403).send('You are not authorized to delete this Job Posting');
    }

    const [deleteResult] = await conn.query(`
      DELETE FROM jobs WHERE id = ?;
    `, [jobId]);

    res.status(200).send('Job Posting deleted successfully');
  } catch (error) {
    console.error('Error deleting Job posting:', error);
    res.status(500).send('Can not delete job posting');
  }
};

export const userJobs = async (req, res) => {
  try {
      const User = await getUserDetails(req);
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
          AND j.dept =? AND j.semester = ?;`, [User.dept, User.semester]);
  
      if (result.length === 0) {
        return res.status(404).send("No Jobs posted.");
      }
  
      res.status(200).send(result);
    } catch (error) {
      console.error("error: ", error);
      res.status(500).send("Can't retrieve jobs!");
    }
};

export const userJob = async (req, res) => {
  try {
      const { id } = req.params;
      const User = await getUserDetails(req);
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
          AND j.dept =? AND j.semester = ? AND j.id = ?;`, [User.dept, User.semester, id]);
  
      if (result.length === 0) {
        return res.status(404).send("Job not found.");
      }
  
      res.status(200).send(result);
    } catch (error) {
      console.error("error: ", error);
      res.status(500).send("Can't retrieve job!");
    }
};