
import executeQuery from '../../db/executeQuery';
import moment from 'moment';
import Joi from 'joi';

const PartyController ={
  async createParty(req, res) {
    const partyQuery = `INSERT INTO parties(partyname,hqaddress,logourl,createdOn) 
    VALUES($1,$2,$3,$4)
    returning *`;

    const partyExist = 'SELECT * FROM parties WHERE partyname = $1';

    const schema = {
      partyname: Joi.string().min(3).max(20).required().trim(),
      hqaddress: Joi.string().min(4).max(20).required().trim(),
      logourl:Joi.string().min(4).max(128).required().trim(),
    };
    const result = Joi.validate(req.body, schema);
    if(result.error){
     return res.status(400).send(result.error);
    }
    const {
      partyname,hqaddress,logourl,
    }=req.body;

    const values=[
      req.body.partyname, req.body.hqaddress, req.body.logourl,
      moment(new Date()),
    ];
    const { rowCount } = await executeQuery.query(partyExist, [partyname]);
    if (rowCount !== 0) {
      return res.status(400).send({
        status: res.statusCode,
        error: 'This party already exists',
      });
    }
    try {
      const resul = await executeQuery.query(partyQuery,values);
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
export default PartyController;