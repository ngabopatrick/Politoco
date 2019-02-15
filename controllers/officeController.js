import officesData from '../db/officeData';
import Joi from 'joi';

class OfficeController {
  static async createOffice(req, res) {
    const schema = {
      officeName: Joi.string().min(4).max(20).required().trim(),
      officeType: Joi.string().min(3).max(20).valid(['Federal', 'Legislative', 'State', 'Local government']).required().trim(),
    };
    const result = Joi.validate(req.body, schema);
    if(result.error){
     return res.status(400).send(result.error);
    }
    const office = {
      id:officesData.length +1,
      officeName:req.body.officeName,
      officeType:req.body.officeType,
    };
    officesData.push(office);
      return res.status(200).send({
        status: 200,
        data:[officesData]
      });
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