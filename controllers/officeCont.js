import Joi from 'joi';
import officesData from '../db/officeData';


class officeCont {
    
  //CREATE OFFICE
  static async createOffice(req, res) {
    const schema = {
      officeName: Joi.string().regex(/^[a-zA-Z] |[a-zA-Z] ?[a-zA-Z]+$/).min(4).required().trim(),
      officeType: Joi.string().min(3).max(20).valid(['Federal', 'Legislative', 'State', 'Local government']).required().trim(),
    };
    const result = Joi.validate(req.body, schema);
    if(result.error){
     return res.status(400).send(result.error);
    }
    const office = {
      id: officesData.length + 1,
      officeName: req.body.officeName,
      officeType: req.body.officeType
    }
    officesData.push(office);
    res.status(200).send({
      status: 200,
      office
    });
  }
  //UPDATE OFFICE
  static async updateOffice(req, res) {
    const schema = {
      officeName: Joi.string().regex(/^[a-zA-Z] |[a-zA-Z] ?[a-zA-Z]+$/).min(4).required().trim(),
      officeType: Joi.string().min(3).max(20).valid(['Federal', 'Legislative', 'State', 'Local government']).required().trim(),
    };
    const result = Joi.validate(req.body, schema);
    if(result.error){
     return res.status(400).send(result.error);
    }

    const office = officesData.find(c => c.id === parseInt(req.params.id));
    if (!office) res.status(404).send('office with given id was not found');
    
    office.officeName = req.body.officeName;
    res.status(200).send({
      status: 200,
      office
    });
  }
  //getOFFICE
  static async getOffice(req, res) {
    const office = officesData.find(c => c.id === parseInt(req.params.id));
    if (!office) res.status(404).send({
      status: 404,
      message: 'The office with that id was not found'
    });
    res.status(200).send({
      status: 200,
      office
    });
  }
  static async getAllOffices(req, res) {
    return res.status(200).send({
      status: 200,
      data: officesData
    });
  }

  static async deleteOffice(req, res) {
    const office = officesData.find(c => c.id === parseInt(req.params.id));
    if (!office) res.status(404).send('office with given id was not found');
    const index = officesData.indexOf(office);
    officesData.splice(index, 1);
    res.status.send({
      status: 200,
      office
    });
  }
}
export default officeCont;