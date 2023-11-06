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
            return {
                status:"success",
                payload: response,
                totalPages: response.totalPages,
                prevPage: response.prevPage,
                nextPage: response.nextPage,
                page: page,
                hasPrevPage: response.hasPrevPage,
                hasNextPage: response.hasNextPage,
                prevLink: response.hasPrevPage? `http://localhost:8080/api/products?page=${response.prevPage}` : null,
                nextLink: response.hasNextPage? `http://localhost:8080/api/products?page=${response.nextPage}` : null
              };
        }
        async findById(id) {
            const response = await productsModel.findById(id);
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