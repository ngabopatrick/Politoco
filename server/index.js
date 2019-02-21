import express from 'express';
import bodyParser from 'body-parser';
import officeRoute from '../routes/officeRoute';
import partyRoute from '../routes/partyRoute';
import userRoute from '../routes/userRoute';
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(officeRoute);
app.use(partyRoute);
app.use(userRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server index running on port ${PORT}...`);
});

export default app;