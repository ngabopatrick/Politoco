import partiesData from '../db/partyData';
import Joi from 'joi';

class PartyController {
  static async createParty(req, res) {
    const schema = {
      partyName: Joi.string().min(4).max(20).required().trim(),
      hqAddress: Joi.string().min(4).max(20).required().trim(),
    };
    const result = Joi.validate(req.body, schema);
    if(result.error){
     return res.status(400).send(result.error);
    }
    const party = {
      id:partiesData.length + 1,
      partyName:req.body.partyName,
      hqAddress:req.body.hqAddress,
    };
    partiesData.push(party);
      return res.status(200).send({
        status: 200,
        data:[partiesData]
      });
  }
  //GET ALL THE PARTIES
  static async getAllParties(req, res) {
    return res.status(200).send({
      status: 200,
      data: partiesData
    })
  }
  //update function 
  static async updateParty(req, res) {
    const schema = {
      partyName: Joi.string().min(4).required().trim(),
      hqAddress: Joi.string().min(3).max(20).required().trim(),
    };
    const result = Joi.validate(req.body, schema);
    if(result.error){
     return res.status(400).send(result.error);
    }

    const party = partiesData.find(c => c.id === parseInt(req.params.id));
    if (!party) res.status(404).send('party with given id was not found');
    
    party.partyName = req.body.partyName;
    res.status(200).send({
      status: 200,
      party
    });
  }
  //delete office
  static async deleteParty(req, res) {
    const id = parseInt(req.params.id, 10);
    const index = partiesData.findIndex((item) => {
      return item.id === parseInt(id, 10)
    });
    console.log(index);
    if (index > -1) {
      partiesData.splice(index, 1);
      return res.status(200).send({
        status: 200,
        message: 'party deleted successfully',
      });
    } else {
      res.status(404).send({
        status: 404,
        message: 'party not found'
      });
    }
  }
  //getOne office
  static async getParty(req, res) {
    const id = parseInt(req.params.id);
    const result = [];
    for (let i = 0; i < partiesData.length; i++) {
      if (partiesData[i].id == id) {
        result.push(partiesData[i]);
      }
    }
    if (result.length == 0) return res.status(404).send({
      status: 404,
      error: "political party not found"
    });
    res.status(200).send({
      status: 200,
      data: result
    })
  }
}
export default PartyController;