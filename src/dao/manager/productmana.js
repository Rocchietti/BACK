import { productsModel } from "../models/products.model.js";

class ProductManager {
        async findAll() {
            const response = await productsModel.find().lean()
            return response 
        }
        async findById(id) {
            const response = await productsModel.findById(id).explain('executionStats');
            return response
        }
        async findByCode(code){
            const response = await productsModel.findOne({code}).explain('executionStats');
            return response
        }
        async createOne(obj) {
            const response = await productsModel.create(obj)
            return response
        }
        async updateOne(id, obj) {
            const response = await productsModel.updateOne({_id:id}, obj)   
            return response
        }

        async deleteOne(id){
            const response = await productsModel.findOneAndDelete({_id:id})
            return response
        }

}



export const ProduManager = new ProductManager()