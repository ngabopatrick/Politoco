import officesData from '../db/officeData';
import Joi from 'joi';

class OfficeController {
  static async createOffice(req, res) {

    const schema = {
      officeName: Joi.string().regex(/^[a-zA-Z] |[a-zA-Z] ?[a-zA-Z]+$/).min(4).required().trim(),
      officeType: Joi.string().min(3).max(20).valid(['Federal', 'Legislative', 'State', 'Local government']).required().trim(),
    };
    const {error} = Joi.validate(req.body, schema);
    if (error) {
      return res.status(400).send({
        status: 400,
        error: error.details[0].message
      });
    }
    const newOffice = {
      id: officesData.length + 1,
      officeName: req.body.officeName,
      officeType: req.body.officeType,
    }
    const offName = officesData.find(c => c.officeName === req.body.officeName);
    if (!offName){
      officesData.push(newOffice);
      return res.status(200).send({
        status: 200,
        message: 'Office succesfully created',
        data: newOffice
      }); 
    } else{
      return res.status(404).send('office with given id already exist');
    }
   



    // const officeName = req.body.officeName;
    // const officeType = req.body.officeType;
    // if (!officeName || !officeType) {
    //   return res.status(400).send({
    //     status: 400,
    //     message: 'Provide required values'
    //   })
    // }
    // const office = officesData.push(req.body);
    // console.log(office);
    // return res.status(201).send({
    //   status: 201,
    //   data: [officesData]
    // });
  }
  
  static async getAllOffices(req, res) {
    return res.status(200).send({
      status: 200,
      data: officesData
    })
  }
  //Update function 
  static async updateOffice(req, res) {
    const id = parseInt(req.params.id, 10);
    const index = officesData.findIndex((item) => {
      return item.id === parseInt(id, 10)
    });
    if (index > -1) {
      officesData[index].officeName = req.body.officeName;
      res.status(200).send({
        status: 200,
        data: [officesData[index]],
      });
    } else {
      res.status(404).send({
        status: 404,
        message: 'item not found'
      });
    }
  }

  //DELETE FUNCTION
  static async deleteOffice(req, res) {
    const id = parseInt(req.params.id, 10);
    const index = officesData.findIndex((item) => {
      return item.id === parseInt(id, 10)
    });
    console.log(index);
    if (index > -1) {
      officesData.splice(index, 1);
      return res.status(200).send({
        status: 200,
        message: 'office deleted successfully',
      });
    } else {
      res.status(404).send({
        status: 404,
        message: 'item not found'
      });
    }
  }
  //get One office
  static async getOffice(req, res) {
    const id = parseInt(req.params.id);
    const result = [];
    for (let i = 0; i < officesData.length; i++) {
      if (officesData[i].id == id) {
        result.push(officesData[i]);
      }
    }
    if (result.length == 0) return res.status(404).send({
      status: 404,
      error: "political office not found"
    });
    res.status(200).send({
      status: 200,
      data: result
    })
  }
}
export default OfficeController;