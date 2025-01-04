const { Pool } = require("pg");

const pool = new Pool({
  user: "development",
  password: "development",
  host: "localhost",
  database: "lightbnb",
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  return pool
    .query(
      `SELECT * FROM users WHERE email = $1;`, // SQL query to find user by email
      [email] // Parameterized query to prevent SQL injection
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return null; // No user found
      }
      return result.rows[0]; // Return the first (and only) user object
    })
    .catch((err) => {
      console.error("Error fetching user by email:", err.message);
      throw err; // Re-throw error
    });
};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  return pool
    .query(
      `SELECT * FROM users WHERE id = $1;`, // SQL query to find user by ID
      [id] // Parameterized query
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return null; // No user found
      }
      return result.rows[0]; // Return the user object
    })
    .catch((err) => {
      console.error("Error fetching user by ID:", err.message);
      throw err; // Re-throw error
    });
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  const { name, email, password } = user; // Destructure user object
  return pool
    .query(
      `INSERT INTO users (name, email, password) 
       VALUES ($1, $2, $3) 
       RETURNING *;`, // Insert user and return the inserted row
      [name, email, password] // Parameterized query
    )
    .then((result) => {
      return result.rows[0]; // Return the newly created user object
    })
    .catch((err) => {
      console.error("Error adding user:", err.message);
      throw err; // Re-throw error
    });
};

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  return getAllProperties(null, 2); // This should be updated to fetch reservations from the DB
};

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = (options, limit = 10) => {
  return pool
    .query(
      `SELECT * FROM properties LIMIT $1;`, 
      [limit] 
    )
    .then((result) => {
      return result.rows; 
    })
    .catch((err) => {
      console.error("Error fetching properties:", err.message);
      throw err; 
    });
};

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};

module.exports = {
  pool,
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};

