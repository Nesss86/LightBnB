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
 * @param {number} limit The number of results to return (default is 10).
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  return pool
    .query(
      `SELECT 
          reservations.id AS id,
          properties.title AS title,
          properties.cost_per_night,
          reservations.start_date,
          AVG(property_reviews.rating) AS average_rating
       FROM reservations
       JOIN properties ON reservations.property_id = properties.id
       LEFT JOIN property_reviews ON properties.id = property_reviews.property_id
       WHERE reservations.guest_id = $1
       GROUP BY reservations.id, properties.title, reservations.start_date, properties.cost_per_night
       ORDER BY reservations.start_date ASC
       LIMIT $2;`, // SQL query
      [guest_id, limit] // Parameterized query
    )
    .then((result) => {
      return result.rows; // Return the fetched rows
    })
    .catch((err) => {
      console.error("Error fetching reservations:", err.message);
      throw err; // Re-throw error
    });
};

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {number} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = (options, limit = 10) => {
  const queryParams = [];
  let queryString = `
    SELECT properties.*, 
           AVG(property_reviews.rating) as average_rating
    FROM properties
    LEFT JOIN property_reviews ON properties.id = property_reviews.property_id
  `;

  const conditions = [];

  // Filter by owner_id
  if (options.owner_id) {
    queryParams.push(options.owner_id);
    conditions.push(`owner_id = $${queryParams.length}`);
  }

  // Filter by price range
  if (options.minimum_price_per_night) {
    queryParams.push(Number(options.minimum_price_per_night) * 100);
    conditions.push(`cost_per_night >= $${queryParams.length}`);
  }

  if (options.maximum_price_per_night) {
    queryParams.push(Number(options.maximum_price_per_night) * 100);
    conditions.push(`cost_per_night <= $${queryParams.length}`);
  }

  // Add WHERE clause if there are conditions
  if (conditions.length > 0) {
    queryString += ` WHERE ${conditions.join(' AND ')}`;
  }

  // Group by properties.id
  queryString += ` GROUP BY properties.id`;

  // Filter by minimum rating
  if (options.minimum_rating) {
    queryParams.push(Number(options.minimum_rating));
    queryString += ` HAVING AVG(property_reviews.rating) >= $${queryParams.length}`;
  }

  // Add ORDER BY and LIMIT
  queryString += `
    ORDER BY cost_per_night
    LIMIT $${queryParams.length + 1};
  `;
  queryParams.push(limit);

  console.log(queryString, queryParams);

  return pool
    .query(queryString, queryParams)
    .then((result) => result.rows)
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
  const { title, description, number_of_bedrooms, number_of_bathrooms, parking_spaces, cost_per_night, thumbnail_photo_url, cover_photo_url, street, city, province, post_code, country, owner_id } = property;

  return pool
    .query(
      `INSERT INTO properties (title, description, number_of_bedrooms, number_of_bathrooms, parking_spaces, cost_per_night, thumbnail_photo_url, cover_photo_url, street, city, province, post_code, country, owner_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
       RETURNING *;`, // Insert property and return the inserted row
      [title, description, number_of_bedrooms, number_of_bathrooms, parking_spaces, cost_per_night, thumbnail_photo_url, cover_photo_url, street, city, province, post_code, country, owner_id]
    )
    .then((result) => {
      return result.rows[0]; // Return the newly created property object
    })
    .catch((err) => {
      console.error("Error adding property:", err.message);
      throw err; // Re-throw error
    });
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


