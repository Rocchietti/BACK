import { chatModel } from "../models/chat.model.js";


class MessagesManager {
    async findAll() {
      const result = await chatModel.find().lean();
      return result;
    }
    async createOne(message) {
      const result = await chatModel.create(message);
      return result;
    }
  }
  
  export const messagesManager = new MessagesManager();
