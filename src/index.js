const express = require('express') 
const connectToDb  = require('./database')
const companiesRouter = require('./routes/companies')
const cors  = require('cors')
const app = express()


app.use(cors({origin: 'https://main--mellifluous-choux-0b1e2a.netlify.app/',optionsSuccessStatus: 200 }))
app.use((req, res, next) => {
    // res.setHeader('Access-Control-Allow-Origin','https://main--mellifluous-choux-0b1e2a.netlify.app/');
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type");
    next();
    });

app.use(express.json())
app.use(
    express.urlencoded({
      extended: true,
    }),
  );

app.use(companiesRouter);

app.use((err,req,res,next) => {
    res.status(500).send(err.stack)
})
app.listen(3001, () => console.info(`server running on port 3001`))