import partiesData from '../db/partyData';

class PartyController {
  static async createParty(req, res) {
    const partyName = req.body.partyName;
    const hqAddress = req.body.hqAddress;
    if (!partyName || !hqAddress) {
      return res.status(400).send({
        status: '400',
        message: 'Provide required values'
      })
    }
    const party = partiesData.push(req.body);
    return res.status(201).send({
      status: 201,
      data: [partiesData]
    });
  };
  //GET ALL THE PARTIES
  static async getAllParties(req, res) {
    return res.status(200).send({
      status: 200,
      data: partiesData
    })
  }
  //update function 
  static async updateParty(req, res) {
    const id = parseInt(req.params.id, 10);
    const index = partiesData.findIndex((item) => {
      return item.id === parseInt(id, 10)
    });
    if (index > -1) {
      partiesData[index].partyName = req.body.partyName;
      res.status(200).send({
        status: 200,
        data: [partiesData[index]],
      });
    } else {
      res.status(404).send({
        status: 404,
        message: 'item not found'
      });
    }
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