exports.getCategoryPage = async (req, res) => {
    res.locals.pageName = 'category';
    res.locals.pageTitle = 'Category';
    res.render('admin/category');
  };
exports.saveCategory = (req, res) => {};
exports.getCategoriesJson = (req, res) => {};
exports.deletecategory = (req, res) => {};
exports.getcategory = (req, res) => {};
