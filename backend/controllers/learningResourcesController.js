import conn from "../helpers/connection.js";
import { getCreatedById } from "../helpers/getCreatedById.js";
import { getUserDetails } from "../helpers/getUserDetails.js";

export const createResource = async (req, res) => {
  try {
    const created_by = await getCreatedById(req);
    const { title, resources, type, content, dept, semester } =
      req.body;

    const [adminUser] = await conn.query(
      `
            SELECT id FROM users WHERE id = ? AND role = 'admin'
          `,
      [created_by]
    );

    if (adminUser.length === 0) {
      return res.status(400).send("Invalid created_by ID");
    }

    const [result] = await conn.query(
      `
            INSERT INTO resources (title, resources, type, content, dept, semester, created_by)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            `,
      [title, resources, type, content, dept, semester, created_by]
    );

    res.status(201).send("Learning Resource created successfully");
  } catch (error) {
    console.error("error: ", error);
    res.status(500).send("Failed to create learning resource.");
  }
};

export const viewAllResource = async (req, res) => {
  try {
    const [result] = await conn.query(`
            SELECT 
            r.id,
            r.title,
            r.resources,
            r.type,
            r.content,
            r.dept,
            r.semester, 
            u.full_name AS created_by
            FROM
            resources r
            JOIN
            users u ON r.created_by = u.id;`);

    if (result.length === 0) {
      return res.status(404).send("No Learning resources exist.");
    }

    res.status(200).send(result);
  } catch (error) {
    console.error("error: ", error);
    res.status(500).send("Can't retrieve learning resources!");
  }
};

export const viewResource = async (req, res) => {
  // TODO: Implement view resource logic
  try {
    const { id } = req.params;

    const [result] = await conn.query(
      `
            SELECT 
            r.id,
            r.title,
            r.resources,
            r.type,
            r.content,
            r.dept,
            r.semester, 
            u.full_name AS created_by
            FROM
            resources r
            JOIN
            users u ON r.created_by = u.id
            AND r.id = ?;`,
      [id]
    );

    if (result.length === 0) {
      return res.status(404).send("Learning resource not found.");
    }

    res.status(200).send(result);
  } catch (error) {
    console.error("error: ", error);
    res.status(500).send("Can't retrieve learning resource!");
  }
};

export const deleteResource = async (req, res) => {
  // TODO: Implement delete resource logic
  try {
    const { id } = req.params;
    const userId = await getCreatedById(req);

    const [checkResult] = await conn.query(
      `select * from resources where id = ?`,
      [id]
    );
    if (checkResult.length === 0) {
      return res.status(404).send("Learning resource not found");
    }

    if (checkResult[0].created_by !== userId) {
      return res
        .status(403)
        .send("You are not authorized to delete this learning resource");
    }

    const [result] = await conn.query(`DELETE FROM resources WHERE id = ?`, [
      id,
    ]);
    res.status(200).send("Learning resource deleted successfully");
  } catch (error) {
    console.error("error: ", error);
    res.status(500).send("Can't retrieve learning resource!");
  }
};

export const userResources = async (req, res) => {
  try {
    const User = await getUserDetails(req);
    const [result] = await conn.query(`
            SELECT 
            r.id,
            r.title,
            r.resources,
            r.type,
            r.content, 
            u.full_name AS created_by
            FROM
            resources r
            JOIN
            users u ON r.created_by = u.id
            AND r.dept =? AND r.semester = ?;`, [User.dept, User.semester]);

    if (result.length === 0) {
      return res.status(404).send("No Learning resources exist.");
    }

    res.status(200).send(result);
  } catch (error) {
    console.error("error: ", error);
    res.status(500).send("Can't retrieve learning resources!");
  }
};

export const userResource = async (req, res) => {
  // TODO: Implement view resource logic
  try {
    const { id } = req.params;
    const User = await getUserDetails(req);
    const [result] = await conn.query(
          ` SELECT 
            r.id,
            r.title,
            r.resources,
            r.type,
            r.content,
            r.created_at, 
            u.full_name AS created_by
            FROM
            resources r
            JOIN
            users u ON r.created_by = u.id
            AND r.dept =? AND r.semester = ? AND r.id = ?;`, [User.dept, User.semester, id]);

    if (result.length === 0) {
      return res.status(404).send("Learning resource not found.");
    }

    res.status(200).send(result);
  } catch (error) {
    console.error("error: ", error);
    res.status(500).send("Can't retrieve learning resource!");
  }
};