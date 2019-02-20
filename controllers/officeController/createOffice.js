import moment from 'moment';
import executeQuery from '../../db/executeQuery';
import Joi from 'joi';

const OfficeController={
  async createOffice(req,res){
    const offQuery = `INSERT INTO offices(officename,officetype,createdOn) 
    VALUES($1,$2,$3)
    returning *`;

    const officeExist = 'SELECT * FROM offices WHERE officename = $1';
    const schema = {
      officename: Joi.string().min(4).max(20).required().trim(),
      officetype: Joi.string().min(4).max(20).required().trim(),
    };
    const result = Joi.validate(req.body, schema);
    if(result.error){
     return res.status(400).send(result.error);
    }
    const {
      officetype, officename,}=req.body;

    const values=[
      req.body.officename, req.body.officetype,moment(new Date()),
    ];
    const { rowCount } = await executeQuery.query(officeExist, [officename]);
    if (rowCount !== 0) {
      return res.status(400).send({
        status: res.statusCode,
        error: 'This office is already exists',
      });
    }
    try {
      const resul = await executeQuery.query(offQuery,values);
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
 
}
export default OfficeController;