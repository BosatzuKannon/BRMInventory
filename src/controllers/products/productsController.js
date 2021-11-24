const Products = require('../../models/products').products;
const Utils = require('../commons/utils')

module.exports = {
    async createProduct(req,res){
        try{
            const productModel = await Utils.getModel('public',Products);
            const productData = {
                lot: req.body.product.lot,
                name: req.body.product.name,
                price: req.body.product.price,
                quantity: req.body.product.quantity
            }
            
            const product = await Utils.insert_data(productData,productModel,'id');
            res.status(200).send(product);
        }catch(err){
            res.status(400).send({'Server error':err.message});        
        }
    },
    async updateProduct(req,res){
        try{
            const productModel = await Utils.getModel('public',Products);
            
            let product = await productModel.update(req.body.product,{
                where: {id: req.params.id}
            }) || {};

            res.status(200).send(product);
        }catch(err){
            res.status(400).send({'Server error':err.message});        
        }
    },
    async deleteProduct(req,res){
        try{
            const productModel = await Utils.getModel('public',Products);
            
            await productModel.destroy({
                where: {id: req.params.id}
            }) || {};

            res.status(200).send({'message':'Product deleted'});
        }catch(err){
            res.status(400).send({'Server error':err.message});        
        }
    }
}