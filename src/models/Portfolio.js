const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');
const mongoosePaginate = require('mongoose-paginate-v2');

const PorfolioSchema = new Schema(
  {
    projectName: {
      type: String,
      unique: true,
      required: true,
    },
    shorDescription:String,
    description: String,
    client:String,
    category:String,
    image: String,
    slug: { type: String, unique: true },
  },
  { timestamps: {} }
);
PorfolioSchema.plugin(mongoosePaginate);

PorfolioSchema.pre('validate', function (next) {
  this.slug = slugify(this.title, {
    lower: true,
    strict: true,
  });
  next();
});
const Porfolio = mongoose.model('Porfolio', PorfolioSchema);
module.exports = Porfolio;
