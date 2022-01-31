const Item = require("./models/Item.model");
const Order = require("./models/Order.model");

const resolvers = {
  Query: {
    items: async (_, { limit, index, category }) => {
      return await Item.find({ category, amount: { $gt: 0 } })
        .populate()
        .count()
        .find()
        .limit(parseInt(limit))
        .skip(parseInt(index));
    },

    itemsAmount: async (_, args) => {
      const { category } = args;
      const count = await Item.find({ category, amount: { $gt: 0 } })
        .populate()
        .count();
      return { count, category };
    },

    itemById: async (_parent, { id }) => {
      return await Item.findById(id);
    },

    itemsByCategory: async (_, args) => {
      const { category } = args;
      return await Item.find({ category }).populate();
    },
  },

  Mutation: {
    createItem: async (_, args) => {
      const { title, category, description, price, amount, currency, unit } =
        args.item;
      const item = new Item({
        title,
        category,
        price,
        description,
        amount,
        currency,
        unit,
      });
      await item.save();
      return item;
    },

    createOrder: async (_, args) => {
      const items = JSON.parse(JSON.stringify(args.order)).items;
      const order = new Order({ items });
      await order.save();
      return order;
    },

    deleteItem: async (_, args) => {
      const { id } = args;
      await Item.findByIdAndDelete(id);
      return "Item deleted with success.";
    },

    updateItem: async (_, args) => {
      const { id } = args;
      const { amount } = args.item;
      const item = await Item.findByIdAndUpdate(
        id,
        {
          amount,
        },
        { new: true }
      );
      return item;
    },
  },
};

module.exports = resolvers;
