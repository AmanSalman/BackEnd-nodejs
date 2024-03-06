import categoryModel from "../../../DB/Models/Category.model.js";

export const createCategory = async (req, res) => {
    try {
      const { categoryName } = req.body;
    //   const existingCategory = await categoryModel.findOne({ categoryId, categoryName });
  
    //   if (existingCategory) {
    //     return res.json({ error: 'Category already exists' });
    //   }
  
      const newCategory = new categoryModel({ categoryName });
      const savedCategory = await newCategory.save();
  
      return res.json({savedCategory});
    } catch (error) {
      console.error(error);
      return res.json({ error: 'Internal server error' });
    }
  };