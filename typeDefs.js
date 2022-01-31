const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Item {
    id: ID
    title: String
    description: String
    category: String
    price: Int
    currency: String
    unit: String
    amount: Int
    totalItems: Int
  }

  type Order {
    id: ID
    items: [Item]
  }

  type ItemTotal {
    count: Int
    category: String
  }

  type Query {
    itemsAmount(category: String): ItemTotal
    items(category: String, limit: Int, index: Int): [Item]
    itemById(id: ID): Item
    itemsByCategory(category: String): [Item]
  }

  input ItemInput {
    title: String
    description: String
    category: String
    price: Int
    currency: String
    unit: String
    amount: Int
    totalItems: Int
  }

  input OrderInput {
    items: [String]
  }

  type Mutation {
    createItem(item: ItemInput): Item
    deleteItem(id: ID): String
    updateItem(id: ID, item: ItemInput): Item
    createOrder(order: OrderInput): Order
  }
`;

module.exports = typeDefs;
