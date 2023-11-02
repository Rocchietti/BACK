import { productsModel } from "../models/products.model.js";

class ProductManager {
        async findAll({limit = 10, page= 1, sort = {}, query= {}} = {}) {
            const sortOpt = {
                "asc" : { price: 1 },
                "desc" : {price: -1},
                "default" : { createdAt: -1}
            }
            const sortOrden = sortOpt[sort] || sortOpt[sortOpt.default];
            const options = {
                page: page, 
                limit : limit,
                sort : sortOrden,
                lean: true,
            }
            const response = await productsModel.paginate(query, options);
            if(!response.docs.length){
                console.log('Not products avaible');
            }
            const info = {
                status: response.status,
                payload: response.docs,
                totalPages: response.totalPages,
                nextPage: response.hasNextPage,
                prevPage: response.hasPrevPage,
                prevLink: response.hasPrevPage ? `http://localhost:8080/api/productos?page=${response.prevPage} ` : null,
                nextLink: response.hasNextPage ? `http://localhost:8080/api/productos?page=${response.nextPage} ` : null
            }
            return {response, info}

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