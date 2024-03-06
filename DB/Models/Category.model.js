import mongoose, {Schema, model} from "mongoose";

const categorySchema = new Schema({
    // categoryId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
    categoryName: { type: String, required: true },
  });


  const categoryModel = model('Category', categorySchema);
export default categoryModel;