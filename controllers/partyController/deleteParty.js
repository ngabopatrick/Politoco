import executeQuery from '../../db/executeQuery';

const partyController={
    async deleteParty(req, res){
      const { isAdmin } = req.user;    

      if(!isAdmin){
        return res.status(401).send({
          status: res.statusCode,
          error: 'Unauthorized, Only Admin can access this end-point',
        });
      }
            const deleteQuery = 'DELETE FROM parties WHERE id=$1 returning *';
            try {
              const { rows } = await executeQuery.query(deleteQuery, [req.params.id]);
              if(!rows[0]) {
                return res.status(404).send({'message': 'party not found'});
              }
              return res.status(204).send({ 'message': 'party successfully deleted' });
            } catch(error) {
              return res.status(400).send(error);
            }
          }
        }

  export default partyController;