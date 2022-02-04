const Portfolio = require('../models/Portfolio');


exports.getIndexPage = async (req,res)=>{
    const portfolios = await Portfolio.find({}).populate(["category","client"]);
  res.render('index', { portfolios: portfolios,layout: false });
}
