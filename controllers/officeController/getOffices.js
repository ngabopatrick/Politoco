import executeQuery from '../../db/executeQuery';

const OfficeController={
 
  async getOffices(req,res){
    const findAll = 'SELECT * FROM offices';
    try {
      const {rows,rowCount} = await executeQuery.query(findAll);
      return res.status(200).send({rows, rowCount});
    } catch (error) {
      return res.status(400).send(error);
    }
  },
}
export default OfficeController;