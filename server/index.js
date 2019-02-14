import express from 'express';
import bodyParser from 'body-parser';
import officeRoute from '../routes/officeRoute';
import partyRoute from '../routes/partyRoute';
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(officeRoute);
app.use(partyRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server index running on port ${PORT}...`);
});

module.exports = app;