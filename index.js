const mongoose = require('mongoose');
const express = require('express');
const bycrypt = require('bcrypt');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const expressLayouts = require('express-ejs-layouts');
var cors = require('cors');

const adminRoutes = require('./src/routes/adminRoutes');
const authMiddleware = require('./src/middlewares/authmiddleware');

// parse application/x-www-form-urlencoded
const loginController = require('./src/controller/admin/loginController');
const app = express();
const port = 3000;
const dbUrl = 'mongodb://localhost/agency-db';

app.use(
  session({
    secret: 'asdfewrğpkisaşlsşlfkai', // Buradaki texti değiştireceğiz.
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: dbUrl }),
  })
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout extractScripts', true);
app.set('layout', './admin/layouts/adminlayout.ejs');

app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));
app.use(fileUpload());

app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

global.userIN = null;
//Routes
app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
});
let locals = {
  page_name: 'index',
};

app.get('/', (req, res) => {
  res.render('index', { layout: false });
});
app.get('/login', (req, res) => {
  res.locals.pagename = 'login';
  res.locals.pageTitle = 'Giriş Yap';
  res.render('admin/login.ejs', { layout: false });
});
app.post('/login', loginController.loginUser);
app.get('/logout', loginController.logoutUser);

//app.use('/admin',  adminRoutes);
app.use('/admin', authMiddleware, adminRoutes);

const uploadDir = 'public/uploads';

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

//CONNECT DB
mongoose.connect(dbUrl,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
}).then(() => {
  console.log('DB Connected Successfully');
});

app.listen(port, () => console.info(`Agency App listening on port ${port}`));

//console.log("routes: ",app._router.stack);
