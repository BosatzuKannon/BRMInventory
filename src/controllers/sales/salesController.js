const Sale = require('../../models/sales').sales
const SaleDetail = require('../../models/sales').saleDetail
const Products = require('../../models/products').products;
const Utils = require('../commons/utils')

module.exports = {
    async saveSale(req,res){
        try{
            if(!req.body.sale.id_user || !req.body.sale.amount || !req.body.sale.products)
                res.status(406).send({'Error': 'Información incompleta'})

            const saleModel = await Utils.getModel('public',Sale)
            const saleData = {
                id_user: req.body.sale.id_user,
                amount: req.body.sale.amount,
                observation: req.body.sale.observation
            }
            
            const stock = await validateStock(req.body.sale.products)
            if(!stock){
                res.status(400).send({'message': 'No hay existencias suficientes en bodega para realizar la venta'});
            }

            const update = await updateStock(req.body.sale.products)
            if(!update){
                res.status(400).send({'message': update});
            }
            
            const sale = await Utils.insert_data(saleData,saleModel,'id')
            const detail = await saveSaleDetail(req.body.sale.products, sale.id)
            
            if(detail === 'ok'){
                res.status(200).send({'message': 'Compra registrada'});
            }else{
                res.status(400).send({'message': detail});
            }
            res.status(200).send({'message': 'Compra registrada'});

        }catch(err){
            res.status(400).send({'Server error': err.message})      
        }
    }
}

async function saveSaleDetail(products, idSale){
    try {
        const saleDetailModel = await Utils.getModel('public',SaleDetail)
        let data = {}
        for (product in products) {        
            products[product].id_sale = idSale                  
            data = products[product]
            await Utils.insert_data(data, saleDetailModel, 'id');
        }

        return 'ok'
    } catch (error) {
        return error.message
    }
}

async function validateStock(products){
    try {
        const productModel = await Utils.getModel('public',Products);
        let sig = true
        for (product in products) {
            const stock = await productModel.findOne({
                where: {id: products[product].idProduct},
                attributes: ['quantity']
            },{raw: true})            
            
            if(products[product].quantity > parseInt(stock.quantity))
                sig = false
        }

        return sig
    } catch (error) {
        return error.message
    }
}

async function updateStock(products){
    try {
        const productModel = await Utils.getModel('public',Products);
        let sig = true
        let value = 0
        for (product in products) {
            let stock = await productModel.findOne({
                where: {id: products[product].idProduct},
                attributes: ['quantity']
            },{raw: true})

            value = parseInt(stock.quantity) - products[product].quantity

            await productModel.update({ quantity: value}, {where: {id: products[product].idProduct},raw: true})
        }

        return sig
    } catch (error) {
        return error.message
    }
}