// database.js

//-- DB ACCESS --//
const pool = require('./index.js');

// -- USERS -- //
// Get a single user from the database given their email.
const getUserWithEmail = function (email) {
  return pool.query(`
  SELECT * FROM users
  WHERE email = $1
  `, [email])
    .then(res => res.rows[0])
    .catch((error) => {
      console.log(error);
    });
}
exports.getUserWithEmail = getUserWithEmail;


// Get a single user from the database given their id.
const getUserWithId = function (id) {
  return pool.query(`
  SELECT * FROM users
  WHERE id = $1
  `, [id])
    .then(res => res.rows[0])
    .catch((error) => {
      console.log(error);
    });
}
exports.getUserWithId = getUserWithId;


// Add a new user to the database.
const addUser = function (user) {
  return pool.query(`
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `, [user.name, user.email, user.password])
    .then(res => res.rows[0])
    .catch((error) => {
      console.log(error);
    });
}
exports.addUser = addUser;


//-- RESERVATIONS --//
// Get all reservations for a single user.
const getAllReservations = function (guest_id, limit = 10) {
  return pool.query(`
  SELECT (reservations.*), (properties.*)
  FROM reservations
  JOIN properties ON properties.id = property_id
  WHERE guest_id = $1 AND reservations.end_date < Now()::date
  GROUP BY reservations.id, properties.id
  LIMIT $3 
  `, [guest_id, limit])
    .then(res => res.rows)
    .catch((error) => {
      console.log(error);
    });
}
exports.getAllReservations = getAllReservations;


//-- Properties --//
// Get all properties.
const getAllProperties = function (options, limit = 10) {
  const queryParams = [];
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  };

  if (options.owner_id) {
    queryParams.push(`%${options.city}%`);
    if (queryParams.length === 1) {
      queryString += `WHERE owner_id = $${queryParams.length} `;
    } else {
      queryString += `AND owner_id = $${queryParams.length}`;
    }
  };

  if (options.min_price_per_night || options.maximum_price_per_night) {
    if (options.min_price_per_night && options.maximum_price_per_night) {
      queryParams.push(options.min_price_per_night * 100, options.maximum_price_per_night * 100);
      if (queryParams.length === 2) {
        queryString += `WHERE cost_per_night BETWEEN $1 AND $2`; // HERE
      } else {
        queryString += `AND cost_per_night BETWEEN $${queryParams.length-1} AND $${queryParams.length}`;
      }
    } else if (options.min_price_per_night) {
      queryParams.push(options.min_price_per_night * 100);
      if (queryParams.length === 1) {
        queryString += `WHERE cost_per_night >= $${queryParams.length}`;
      } else {
        queryString += `AND cost_per_night >= $${queryParams.length}`;
      }
    } else {
      queryParams.push(options.maximum_price_per_night * 100);
      if (queryParams.length === 1) {
        queryString += `WHERE cost_per_night <= $${queryParams.length}`;
      } else {
        queryString += `AND cost_per_night <= $${queryParams.length}`;
      }
    }
  };

  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    if (queryParams.length === 1) {
      queryString += `WHERE rating >= $${queryParams.length} `;
    } else {
      queryString += `AND rating >= $${queryParams.length}`;
    }
  };

  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  return pool.query(queryString, queryParams)
    .then(res => res.rows);
}
exports.getAllProperties = getAllProperties;


// Add a property to the database
const addProperty = function (property) {
  const queryParams = [];
  Object.keys(property).map(key => queryParams.push(property[key]));
  const keys = Object.keys(property).join(',');

  return pool
    .query(`
  INSERT INTO properties (${keys})
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *;`, queryParams)
    .then(res => res.rows)
    .catch((error) => {
      console.log(error);
    });
};

exports.addProperty = addProperty;
