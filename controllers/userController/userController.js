import joi from 'joi';
import moment from 'moment';
import Helper from '../../helpers/helper';
import executeQuery from '../../db/executeQuery';

const userController = {

  async userLogin(req, res) {
    const { emailaddress, password } = req.body;

    const schema = joi.object().keys({
      emailaddress: joi.string().email().min(3).required(),
      password: joi.string().min(6).required()
    });

    const validation = joi.validate(req.body, schema, ({
      abortEarly: false
    }));

    if (validation.error != null) {
      const errors = [];
      for (let index = 0; index < validation.error.details.length; index++) {
        errors.push(validation.error.details[index].message.split('"').join(''));
      }

      return res.status(400).send({
        status: res.statusCode,
        error: errors,
      });
    }
    try {
      const loginQuery = `SELECT * FROM users WHERE emailaddress=$1`;
      const { rowCount, rows } = await executeQuery.query(loginQuery, [emailaddress]);
      if (rowCount === 0) {
        return res.status(404).send({
          status: res.statusCode,
          error: 'No user found',
        });
      }

      if (Helper.comparePassword(rows[0].password, password)) {
        const user_token = Helper.generateToken(rows[0].id, rows[0].isadmin);
        const user_data = rows[0];
        delete user_data.password;
        return res.status(200).send({
          status: res.statusCode,
          data: [{
            token: user_token,
            user: user_data
          }],
        });
      } else {
        return res.status(400).send({
          status: res.statusCode,
          error: 'Incorrect password'
        });
      }
    } catch (error) {
      return res.status(400).send({
        status: res.statusCode,
        error: error
      });
    }
  },

  async createAccount(req, res) {
    const {
      firstname,
      lastname,
      othername,
      emailaddress,
      phonenumber,
      passporturl,
      password,
      isAdmin,
    } = req.body;

    const schema = joi.object().keys({
      firstname: joi.string().trim().required(),
      lastname: joi.string().trim().required(),
      othername: joi.string().trim().required(),
      emailaddress: joi.string().email().trim().required(),
      phonenumber: joi.string().trim().required(),
      passporturl: joi.string().trim().required(),
      password: joi.string().min(6).required(),
      isAdmin: joi.boolean().required(),
    });

    const validation = joi.validate(req.body, schema, {
      abortEarly: false
    });

    if (validation.error != null) {
      const errors = [];
      for (let index = 0; index < validation.error.details.length; index++) {
        errors.push(validation.error.details[index].message.split('"').join(''));
      }

      return res.status(400).send({
        status: res.statusCode,
        error: errors,
      });
    }
    const logQuery = `SELECT * FROM users WHERE emailaddress=$1`;
    const { rowCount } = await executeQuery.query(logQuery, [emailaddress]);

    if (rowCount !== 0) {
      return res.status(400).send({
        status: res.statusCode,
        error: 'This email is used by another user try onother',
      });
    }

    const pswd = Helper.hashPasword(password);
    const user = [
      firstname,
      lastname,
      othername,
      emailaddress,
      phonenumber,
      passporturl,
      pswd,
      isAdmin,
      moment(new Date()),
    ];

    try {
      const accountQuery = `INSERT INTO users (firstname, lastname, othername, emailaddress, phonenumber, passporturl, password, isAdmin, createdOn)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                        RETURNING id, firstname, lastname, othername, emailaddress, phonenumber, passporturl, isAdmin, createdOn`;
      const result = await executeQuery.query(accountQuery, user);
      if (result.rowCount > 0) {
        const user_token = Helper.generateToken(result.rows[0].id, result.rows[0].isadmin);
        const user_data = result.rows[0];
        delete user_data.password;
        return res.status(201).send({
          status: res.statusCode,
          data: [{
            token: user_token,
            user: user_data
          }],
        });
      }
    } catch (error) {
      return res.status(400).send({
        status: res.statusCode,
        error: error
      });
    }
  },
};

export default userController;