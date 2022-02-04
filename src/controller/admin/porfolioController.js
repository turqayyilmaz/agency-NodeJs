const Portfolio = require('../../models/Portfolio');
const { dirname, resolve } = require('path');
const { reject } = require('lodash');
const Porfolio = require('../../models/Portfolio');

const appDir = dirname(require.main.filename);
const uploadedUrl = '/uploads/portfolios';

exports.getPortfolioPage = (req, res) => {
  res.locals.pageName = 'portfolio';
  res.locals.pageTitle = 'Portfolios';

  res.render('admin/portfolio');
};

exports.savePortfolio = async (req, res) => {
  console.log('files:', req.files);
  console.log('body: ', req.body);

  let imageCheck = new Promise((resolve, reject) => {
    if (req.files) {
      const uploadImage = req.files.image;
      const imagePath =
        appDir + '\\public\\uploads\\portfolios\\' + uploadImage.name;
      const imageUrl = uploadedUrl + '\\' + uploadImage.name;

      uploadImage.mv(imagePath.toString(), async (err) => {
        if (err) {
          console.log('image Path: ', imagePath);
          console.log(err);
          reject('');
        } else {
          resolve(imageUrl);
        }
      });
    } else {
      reject('');
    }
  });

  if (req.body._id) {
    let portfolio = await Portfolio.findById(req.body._id);
    let image ="";
    
    await imageCheck.then((value)=>{
      this.image=value;
    });
    portfolio.projectName = req.body.projectName; 
    portfolio.shortDescription = req.body.shortDescription;
    portfolio.description = req.body.description;
    portfolio.category = req.body.category;
    portfolio.client = req.body.client;

    console.log('image: ', image, ' portfolio: ', portfolio);
    
    portfolio.save((err, client) => {
      if (err) {
        res.status(400).json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'success' });
      }
    });
  } else {
    let portfolio = new Portfolio();
    portfolio.projectName = req.body.projectName; //ejs de projectname olarak degistir
    portfolio.shortDescription = req.body.shortDescription;
    portfolio.description = req.body.description;
    portfolio.category = req.body.category;
    portfolio.client = req.body.client;
    let image = "";
    await imageCheck.then((val)=>{
      image=val;
    });
    console.log('logo: ', image, ' portfolio: ', portfolio);
    if (image != '') portfolio.image = image;
    await Portfolio.create(portfolio, (err, por) => {
      if (err) {
        console.log(err);
        res.status(400).json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'success', portfolio: por });
      }
    });
  }
};
exports.getPortfoliosJson = (req, res) => {
  Portfolio.dataTables({
    total: 'recordsTotal',
    limit: req.query.length,

    formatter: function (portfolio) {
      portfolio.populate("category");
      console.log(portfolio);
      return {
        _id: portfolio._id,
        projectName: portfolio.projectName,
        image: `<img src='${portfolio.image}' width='100px'>`,
        categoryName: portfolio.category.categoryName,
        clientName: portfolio.client.clientName,
        actions: `<a class="btn btn-success" href="javascript:portfolioEdit('${portfolio._id}');">Edit</a>
        <a class="btn btn-danger" href="javascript:portfolioDelete('${portfolio._id}');">Delete</a>`,
      };
    },
    skip: req.query.start,
    /* search: {
      value: req.query.search.value,
      fields: ['projectName', 'clientLogo', 'slug'],
    }, */
    sort: {
      clientName: 1,
    },
    populate:["category","client"],
  }).then(function (table) {
    res.json({
      data: table.data,
      recordsFiltered: table.total,
      recordsTotal: table.total,
    });
  });
};
exports.getPortfolio = async (req, res) => {
  const p = await Portfolio.findById(req.params._id);
  res.json(p);
};
exports.deletePortfolio = (req, res) => {
  let id = req.params._id;
  Portfolio.findOneAndRemove({_id:id},(err,doc)=>{
   console.log("doc",doc);
   if(err){
     console.log(error);
     res.status(400).json({status:"error",error:err});
   }
   else{
     res.status(200).json({status:"success",portfolio:doc}); 
   }
 });
};
exports.getAllPPortfolios = (req, res) => {
  res.send('getAllPortfolios');
};
