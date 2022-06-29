const db = require('./db');

const statusCodes = {
  BAD_PARAMETERS: 400,
  CREATED: 201,
  SUCCESS: 200,
  DELETED: 204,
}

// global variable, do not mutate
const headers = {
  'Content-Type': 'application/json'
}

const createOrUpdate = async (event) => {
  let body;
  let statusCode = statusCodes.CREATED;

  try {
    const item = JSON.parse(event.body);
    body = await db.store(item);
    console.log('create/new item stored', body);
  } catch (err) {
    console.error('create/error', err);
    statusCode = statusCodes.BAD_PARAMETERS;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers
  };
};

const getAll = async () => {
  let body;
  let statusCode = statusCodes.SUCCESS;

  try {
    body = await db.list();
    console.log('getAll/items', body);
  } catch (err) {
    console.error('create/error', err);
    statusCode = statusCodes.BAD_PARAMETERS;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers
  };
};

const getById = async (event) => {
  const itemId = event.pathParameters.id;
  let body;
  let statusCode = statusCodes.SUCCESS;

  try {
    body = await db.getById(itemId);
    console.log('getById/result', itemId, body);
  } catch (err) {
    console.error('getById/error', itemId, err);
    statusCode = statusCodes.BAD_PARAMETERS;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers
  };
};

const deleteById = async (event) => {
  const itemId = event.pathParameters.id;
  let body;
  let statusCode = statusCodes.DELETED;

  try {
    body = await db.deleteById(itemId);
    console.log('deleteById/result', itemId, body);
  } catch (err) {
    console.error('deleteById/error', itemId, err);
    statusCode = statusCodes.BAD_PARAMETERS;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers
  };
};

module.exports = {
  createOrUpdate,
  getAll,
  getById,
  deleteById
}