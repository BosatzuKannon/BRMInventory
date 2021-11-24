const User = require('../../models/users').users;
const Sale = require('../../models/sales').sales
const SaleDetail = require('../../models/sales').saleDetail
const Products = require('../../models/products').products;
const Utils = require('../commons/utils')
const pgsql = require('../commons/postgresql/connection');
const { QueryTypes } = require('sequelize');

module.exports = {
    async getSales(req,res){
        try{
            const saleModel = await Utils.getModel('public',Sale)
            let salesReport = {}
            let query = ''
            if(req.params.id == -1){
                query = `select a.id,  a.created, concat(b.name, ' ', b.lastname) as client, a.amount,a.observation 
                from public.sales a left join public.users b on a.id_user = b.id`
            }

            const sales = await pgsql.query(query, { type: QueryTypes.SELECT });
            salesReport.sale = sales

            for(let sale of sales){
                console.log(`entra carajo ______ ${sale.id}`);
                sale.products = await getProduct(sale.id)
            }

            console.log(`resultado _______________ ${JSON.stringify(sales)}`);
            
            res.status(200).send(salesReport);

        }catch(err){
            res.status(400).send({'Server error': err.message})      
        }
    }
}

async function getProduct(sale){
    try {
        let productReport = {}        
        const query = `select p.id,p.lot, p.name, sd.quantity , p.price 
                from public."saleDetail" sd left join public.products p on sd.id_product = p.id
                where sd.id_sale = ${sale}`
        console.log(`query _____ ${query}`);
        const products = await pgsql.query(query, { type: QueryTypes.SELECT });
        console.log(`products ___________________ ${JSON.stringify(products)}`);
        return products
    } catch (error) {
        return error.message
    }
}