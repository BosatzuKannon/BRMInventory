const Sequelize = require('sequelize')
const UniqueConstraintError = Sequelize.UniqueConstraintError

module.exports = {
    async getModel(id,model){
        if(id == 'public'){
            return model.schema(id).sync();
        }else{
            // let schema = await Cliente.findByPk(id)            
            // if(!schema) return null
            // if(schema.schema_name)
            //     return model.schema(schema.schema_name).sync();
            // else
                return null;
        }
    },
    async insert_data(data,model,pkField){
        let insertedData
            try{
                insertedData = await model.create(data)
            }catch(err){
                if(err instanceof UniqueConstraintError){
                    const id = await model.max(pkField) || 0
                    data[pkField] = id + 1;
                    insertedData = await model.create(data)
                }else throw err
            }
            return insertedData
    }
}