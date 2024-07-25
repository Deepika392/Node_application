const Product = require('./../models/Product');
const Category = require('./../models/Category');
const upload = require('./../utils/multerConfig');
const path = require('path');
const fs = require('fs');

// const { promisify } = require('util');
// const unlinkAsync = promisify(fs.unlink);


exports.createProduct = async (req, res) => {
 
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err });
    }

    const { productName, description, price, categoryId } = req.body;
    const image = req.file ? req.file.filename : null;

    try {
      // Create a new product
      const newProduct = await Product.create({
        productName,
        description,
        price,
        categoryId,
        image,
      });
      res.status(201).json(newProduct);
    } catch (err) {
      console.error('Error creating product:', err);
      res.status(500).json({ error: 'Error creating product' });
    }
  });
};


exports.getProduct = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{
        model: Category,
        attributes: ['categoryName']
      }],
      attributes: ['id', 'productName', 'description','price','image'],
      order: [['createdAt', 'DESC']],
      
    }
  );
    res.json(products);
  } catch (err) {
    console.error('Error fetching products', err);
    res.status(500).json({ error: 'Error fetching products' });
  }
}

exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: 'product not found' });
    }
    await product.destroy();
    res.json({ message: 'product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product', err);
    res.status(500).json({ error: 'Error deleting product' });
  }
}


// exports.updateProduct = async (req, res) => {
//   // console.log('req.body',req); return false
//   const productId = req.params.id;
//   const { productName,description,price,categoryId } = req.body;

//   try {
//     const product = await Product.findByPk(productId);

//     if (!product) {
//       return res.status(404).json({ error: 'product not found' });
//     }

//     // Update Category data
//     product.productName = productName;
//     product.description = description;
//     product.price = price;
//     product.categoryId = categoryId;
    
//     await product.save();

//     res.json(product);
//   } catch (err) {
//     console.error('Error updating product', err);
//     res.status(500).json({ error: 'Error updating product' });
//   }
// };



exports.updateProduct = async (req, res) => {
 
  const productId = req.params.id;

 
  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Middleware for handling the file upload
    upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const { productName, description, price, categoryId } = req.body;
      

      // Update product details
      product.productName = productName;
      product.description = description;
      product.price = price;
      product.categoryId = categoryId;

      // Check if a new file is uploaded and update the product's image field
      if (req.file) {
        // Delete previous image if exists
        if (product.image) {
          const imagePath = path.join(__dirname, '..', 'uploads', product.image);
          try {
            // Assuming unlinkAsync is a promisified version of fs.unlink
            // await unlinkAsync(imagePath);
          } catch (unlinkError) {
            console.error('Error deleting previous image:', unlinkError);
          }
        }

        product.image = req.file.filename;
      }

      await product.save();

      res.json(product);
    });
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: 'Error updating product' });
  }
};

exports.getproductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getproductByCatId = async(req,res)=>{

  const { categoryId } = req.params; 
  try {
    const products = await Product.findAll({
      where: {
        categoryId: categoryId,
      },
    });
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Error fetching products' });
  }
}

