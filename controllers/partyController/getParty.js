import executeQuery from '../../db/executeQuery';
import moment from 'moment';
import Joi from 'joi';

const PartyController = {

    async getParty(req, res) {
        const getpartyQuery = 'SELECT * FROM parties WHERE id = $1';
        const id = req.params.id;
        if (!parseInt(id)) {
            return res.status(400).send({
                status: statusCode,
                error: 'ID has to be an integer',
            });
        }
        try {
            const {
                rows,
                rowCount
            } = await executeQuery.query(getpartyQuery, [id]);
            if (rowCount === 0) {
                return res.status(404).send({
                    status: res.statusCode,
                    error: 'Party with this id has not been found',
                });
            }
            return res.status(200).send({
                status: res.statusCode,
                data: rows,
            });
        } catch (error) {
            return res.status(404).send(error);
        }
    },
}
export default PartyController;