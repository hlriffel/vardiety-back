import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import router from './router';

const app = express();
const port = process.env.PORT || 8090;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cors());

app.use('/api', router);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
