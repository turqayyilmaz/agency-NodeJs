const Portfolio = require('../../models/Portfolio');
const Porfolio = require('../../models/Portfolio');
const utils = require('../admin/utils');

exports.getPortfolioPage = (req, res) => {
  res.locals.pageName = 'portfolio';
  res.locals.pageTitle = 'Portfolios';

  res.render('admin/portfolio');
};

exports.savePortfolio = async (req, res) => {
  let portfolio = req.body._id
    ? await Portfolio.findById(req.body._id)
    : new Porfolio();

  let image = await utils.uploadImage(req, 'image', 'portfolios');

  portfolio.projectName = req.body.projectName;
  portfolio.shortDescription = req.body.shortDescription;
  portfolio.description = req.body.description;
  portfolio.category = req.body.category;
  portfolio.client = req.body.client;
  if (image != '') portfolio.image = image;
  await portfolio.save((err, portfolio) => {
    if (err) {
      res.status(400).json({ status: 'error', portfolio });
    } else {
      res.status(200).json({ status: 'success', portfolio });
    }
  });
};
exports.getPortfoliosJson = (req, res) => {
  Portfolio.dataTables({
    total: 'recordsTotal',
    limit: req.query.length,

    formatter: function (portfolio) {
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
    search: {
      value: req.query.search.value,
      fields: ['projectName', 'client.clientName', 'category.categoryName'],
    },
    sort: {
      clientName: 1,
    },
    populate: ['category', 'client'],
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
  Portfolio.findOneAndRemove({ _id: id }, (err, doc) => {
    console.log('doc', doc);
    if (err) {
      console.log(error);
      res.status(400).json({ status: 'error', error: err });
    } else {
      res.status(200).json({ status: 'success', portfolio: doc });
    }
  });
};
