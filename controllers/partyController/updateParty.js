import executeQuery from '../../db/executeQuery';
// import Joi from 'joi';

const PartyController = {
    async updateParty(req, res) {
        const { isAdmin } = req.user;    

        if(!isAdmin){
          return res.status(401).send({
            status: res.statusCode,
            error: 'Unauthorized, Only Admin can access this end-point',
          });
        }
        const partyQuery = `UPDATE parties SET partyname=$2, WHERE id=$1 RETURNING *`;
        const findOneQuery = `SELECT * FROM parties WHERE id =$1`;
       
        try {
            const {rows} = await executeQuery.query(findOneQuery,[req.params.id]);
            if(!rows[0]){
                return res.status(404).send({'message':'Party not found'});
            }
            const values=[
                req.body.partyname || rows[0].partyname,
                req.params.id
            ];
            const response = await executeQuery.query(partyQuery,values);
            return res.status(200).send(response.rows[0]);
           
        } catch (error) {
            return res.status(400).send(error);
        }
    },
}
export default PartyController;