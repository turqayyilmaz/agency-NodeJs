const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');
const Category = require('./Category');
const Client = require('./Client');
const mongoosePaginate = require('mongoose-paginate-v2');
const dataTable = require('mongoose-datatables');

const PortfolioSchema = new Schema(
  {
    projectName: {
      type: String,
      unique: true,
      required: true,
    },
    shorDescription: String,
    description: String,
    client: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Client',
    },
    image: String,
    
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Category',
    },
    slug: { type: String, unique: true, slug: 'projectName' },
  },
  

  { timestamps: {} }
);
PortfolioSchema.plugin(mongoosePaginate);
PortfolioSchema.plugin(dataTable);
PortfolioSchema.pre('validate', function (next) {
  this.slug = slugify(this.projectName, {
    lower: true,
    strict: true,
  });
  next();
});
const Porfolio = mongoose.model('Portfolio', PortfolioSchema);
module.exports = Porfolio;
