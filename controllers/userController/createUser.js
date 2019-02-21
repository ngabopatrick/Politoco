import executeQuery from '../../db/executeQuery';
import moment from 'moment';
import Joi from 'joi';


const UserController={
   async createUser(req,res){
    const userQuery = `INSERT INTO users(firstname,lastname,othername,emailaddress,phonenumber,passporturl,isAdmin,password,createdOn) 
    VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)
    returning *`;

    const userExist = 'SELECT * FROM users WHERE emailaddress = $1';

    const schema = {
      firstname: Joi.string().min(3).max(20).required().trim(),
      lastname: Joi.string().min(4).max(20).required().trim(),
      othername: Joi.string().min(4).max(20).required().trim(),
      emailaddress: Joi.string().email().min(4).max(128).required().trim(),
      phonenumber: Joi.string().min(4).max(20).required().trim(),
      passporturl: Joi.string().min(4).max(20).required().trim(),
      isadmin: Joi.boolean().required(),
      password: Joi.string().min(4).max(20).required().trim(),
      
    };
    const result = Joi.validate(req.body, schema);
    if(result.error){
     return res.status(400).send(result.error);
    }
    const {
      firstname,lastname,othername,emailaddress,phonenumber,passporturl,isadmin,password,
    }=req.body;

    const values=[
      req.body.firstname,req.body.lastname,req.body.othername,req.body.emailaddress,req.body.phonenumber,req.body.passporturl,
      req.body.isadmin,
      req.body.password,
      moment(new Date()),
    ];
    const { rowCount } = await executeQuery.query(userExist, [emailaddress]);
    if (rowCount !== 0) {
      return res.status(400).send({
        status: res.statusCode,
        error: 'This user already exists',
      });
    }
    try {
      const resul = await executeQuery.query(userQuery,values);
      if(resul.rowCount===1){
        return res.status(201).send({
          status: res.statusCode,
          data: resul.rows,
        });
      }
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async userLogin(req,res){
    
  },
}
export default UserController;