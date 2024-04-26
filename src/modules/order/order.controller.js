import bookModel from "../../../DB/Models/Book.model.js";
import orderModel from "../../../DB/Models/Order.model.js";


export const createOrder = async (req, res) => {
	try {
		const {books, location, status, userId} = req.body;
		const Books = await bookModel.find({
			_id: {
				$in: books
			}
		}).select("title");
		const bookPrices = await bookModel.find({
			_id: {
				$in: books
			}
		}).select("price");
		const totalPrice = bookPrices.reduce((sum, book) => sum + book.price, 0);
		console.log(Books)
		const newOrder = new orderModel({
			books: Books,
			location,
			totalPrice,
			status,
			userId
		});
		console.log(newOrder)
		const saveOrder = await newOrder.save();
		return res.json({message: "success", order: saveOrder});
	} catch (error) {
		return res.json({message: "Error", error: error.stack});
	}
}

export const destroy = async (req, res) => {
	try {
		const {_id} = req.params;
		const deleteOrder = await orderModel.findByIdAndDelete(_id);
		return res.json({message: "success", deletedOrder: deleteOrder});
	} catch (error) {
		return res.json({message: "Error", error: error.stack});
	}
}


/* Admin Side */
export const GetOrders = async (req, res) => {
	try {
		const orders = await orderModel.find();
		return res.json({message: "success", orders: orders})
	} catch (error) {
		return res.json({message: "Error", error: error.stack});
	}
}


/* Admin Side */
export const AcceptAllOrders = async (req, res) => {
	try {
		const AcceptedOrders = await orderModel.updateMany({status:{$eq:'Pending'}}, {$set: { status:'Accepted'}});
        return res.json({message: "success" });
	} catch (error) {
         return res.json({message: "Error", error: error.stack});
    }
}

/* Admin Side */
export const AcceptOrder =async (req,res) => {
    try {
        const {_id} = req.params;
        const AcceptOrder = await orderModel.findOneAndUpdate({_id:_id, status: 'Pending'}, {status:'Accepted'});
        if(AcceptOrder != null){
            return res.json({message:"success",AcceptOrder});
        } 
        return res.json({message:"can't accept the order"})
    } catch (error) {
        return res.json({message: "Error", error: error.stack});
    }
}

export const RejectOrder =async (req,res) => {
    try {
        const {_id} = req.params;
        const rejectedOrder = await orderModel.findOneAndUpdate({_id:_id, status: 'Pending'}, {status:'Rejected'});
        if(rejectedOrder !=null){

            return res.json({message:"success",rejectedOrder});
        }
        return res.json({message:"can't reject the order"})
    } catch (error) {
        return res.json({message: "Error", error: error.stack});
    }
}

export const AcceptedOrdersCount = async(req,res)=>{
	const AcceptedOrders = await orderModel.countDocuments({status:'Accepted'});
	return res.status(200).json({message:"success", AcceptedOrders:AcceptedOrders});
}

export const RejectedOrdersCount = async (req,res)=>{
	const RejectedOrders = await orderModel.countDocuments({status:'Rejected'});
	return res.status(200).json({message:"success", RejectedOrders:RejectedOrders});	
}