import bookModel from "../../../DB/Models/Book.model.js";
import categoryModel from "../../../DB/Models/Category.model.js";

export const createBook = async (req, res) => {
	try {
		const {
			title,
			price,
			description,
			publishingHouse,
			categoryName
		} = req.body;

		const category = await categoryModel.findOne({categoryName});
		const newBook = new bookModel({
			title,
			price,
			description,
			publishingHouse,
			categoryId:category._id
		});
		const savedBook = await newBook.save();
		return res.json({message: "success", AddedBook: savedBook});
	} catch (error) {
		console.log(error)
		return res.json({message: "Error", error: error.stack});
	}
};


export const GetBooks = async (req, res) => {
	try {
		const books = await bookModel.find();
		return res.json({message: "success", books})
	} catch (error) {
		return res.json({message: "Error", error: error.stack});

	}
}


export const GetBooksCategory = async (req, res) => {
	try {

		const {categoryId} = req.params;
		const books = await bookModel.find({categoryId});
		return res.json({message: "success", books: books})
	} catch (error) {
		console.log(error)
		return res.json({message: "Error", error: error.stack});
	}

}


export const destroy = async (req, res) => {
	try {
		const {_id} = req.params;
		const book = await bookModel.findByIdAndDelete(_id);
		return res.json({message: 'success', Book: book})
	} catch (error) {
		return res.json({message: "Error", error: error.stack});
	}
}

export const update = async (req, res) => {
	try {
		const {_id} = req.params;
		const {
			title,
			price,
			description,
			publishingHouse,
			categoryId
		} = req.body;
		console.log(_id);
		const updatedBook = await bookModel.findByIdAndUpdate(_id, {
			title,
			price,
			description,
			publishingHouse,
			categoryId
		}, {new: true});
		return res.json({message: "success", updatedBook})
	} catch (error) {
		return res.json({message: "Error", error: error.stack});
	}
}
