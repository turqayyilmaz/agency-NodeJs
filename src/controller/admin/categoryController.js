const Category = require('../../models/Category');
exports.getCategoryPage = async (req, res) => {
  res.locals.pageName = 'category';
  res.locals.pageTitle = 'Category';
  res.render('admin/category');
}; 
exports.saveCategory = async (req, res) => {
  //res.status(400).json({ status: 'error', body:req.body });
  if (req.body._id) {
    let category = await Category.findById(req.body._id);
    category.categoryName = req.body.categoryName;
    category.save((err, category) => {
      if (err) {
        res.status(400).json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'success' });
      }
    });
  } else {
    console.log('body:', req.body);
    let category = new Category();
    category.categoryName = req.body.categoryName;
    await Category.create(category, (err, category) => {
      if (err) {
        res.status(400).json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'success' });
      }
    });
  }
};
exports.getCategoriesJson = (req, res) => {
  Category.dataTables({
    total: 'recordsTotal',
    limit: req.query.length,
    formatter: function (category) {
      return {
        _id: category._id,
        categoryName: category.categoryName,
        slug: category.slug,
        actions: `<a class="btn btn-success" href="javascript:categoryEdit('${category._id}');">Edit</a>
            <a class="btn btn-danger" href="javascript:categoryDelete('${category._id}');">Delete</a>`,
      };
    },
    skip: req.query.start,
    search: {
      value: req.query.search.value,
      fields: ['categoryName', 'slug'],
    },
    sort: {
      categoryName: 1,
    },
  }).then(function (table) {
    res.json({
      data: table.data,
      recordsFiltered: table.total,
      recordsTotal: table.total,
    });
  });
};
exports.deletecategory = (req, res) => {
  let id = req.params._id;
  Category.findOneAndRemove({ _id: id }, (err, doc) => {
    console.log('doc', doc);
    if (err) {
      console.log(error);
      res.status(400).json({ status: 'error', error: err });
    } else {
      res.status(200).json({ status: 'success', client: doc });
    }
  });
};
exports.getcategory = async (req, res) => {
  const category = await Category.findById(req.params._id);
  res.json(category);
};

exports.getAllCategories = async (req,res)=>{
  const categories = await Category.find({},"_id categoryName").sort('categoryName');
  res.json(categories);
}
