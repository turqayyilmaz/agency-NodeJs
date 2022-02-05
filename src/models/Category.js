const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify-mongoose');
const dataTable = require('mongoose-datatables');

const CategorySchema = new Schema(
  {
    categoryName: {
      type: String,
      unique: true,
      required: true,
    },
    slug: { type: String, unique: true, slug: 'categoryName' },
  },
  { timestamps: {} }
);

CategorySchema.pre('validate', function (next) {
  this.slug = slugify(this.categoryName, {
    lower: true,
    strict: true,
  });
  next();
});
CategorySchema.plugin(dataTable);

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
