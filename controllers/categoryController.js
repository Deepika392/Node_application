const Category = require('./../models/Category');
const Product = require('./../models/Product');
const User = require('./../models/User');

exports.createCategory = async (req, res) => {

  const { categoryName } = req.body;
  try {
    // Create a new category
    const newCategory = await Category.create({
        categoryName
    });
    res.status(201).json(newCategory);
  } catch (err) {
    console.error('Error creating category:', err);
    res.status(500).json({ error: 'Error creating category' });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const categories = await Category.findAll({order: [
         ['createdAt', 'DESC']
    ]});
    res.json(categories);
  } catch (err) {
    console.error('Error fetching categories', err);
    res.status(500).json({ error: 'Error fetching categories' });
  }
}

exports.deleteCategory = async (req, res) => {
  const catId = req.params.id;
  try {
    const category = await Category.findByPk(catId);

    if (!category) {
      return res.status(404).json({ error: 'category not found' });
    }
    await category.destroy();
    res.json({ message: 'category deleted successfully' });
  } catch (err) {
    console.error('Error deleting category', err);
    res.status(500).json({ error: 'Error deleting user' });
  }
}


exports.updateCategory = async (req, res) => {
  const catId = req.params.id;
  const { categoryName } = req.body;

  try {
    const category = await Category.findByPk(catId);

    if (!category) {
      return res.status(404).json({ error: 'category not found' });
    }

    // Update Category data
    category.categoryName = categoryName;
    
    await category.save();

    res.json(category);
  } catch (err) {
    console.error('Error updating category', err);
    res.status(500).json({ error: 'Error updating category' });
  }
};


exports.getcategoryById = async (req, res) => {
  const catId = req.params.id;
  try {
    const cat = await Category.findByPk(catId);

    if (!cat) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(cat);
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.recordCount = async (req, res) => {
  try {
    const categoryCount = await Category.count();
    const productCount = await Product.count();
    const userCount = await User.count();
    
    res.status(200).json({
      userCount,
      productCount,
      categoryCount,
  });
   
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};