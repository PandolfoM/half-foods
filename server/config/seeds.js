const db = require('./connection');
const { User, Product, Category, Diet } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();
  await Diet.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Grocery' }, // 0
    { name: 'Produce' }, // 1
    { name: 'Meat' }, // 2
    { name: 'Seafood' }, // 3
    { name: 'Dairy' }, // 4
    { name: 'Frozen Food' }, // 5
    { name: 'Beverages' }, // 6
    { name: 'Bakery' }, // 7
  ]);

  const diets = await Diet.insertMany([
    { name: 'Vegan' }, // 0
    { name: 'Gluten-Free' }, // 1
    { name: 'Keto-Friendly' }, // 2
    { name: 'Vegetarian' }, // 3
    { name: 'Organic' }, // 4
    { name: 'Dairy-Free' }, // 5
    { name: 'Sugar-Conscious' }, // 6
    { name: 'Paleo-Friendly' }, // 7
    { name: 'Low-Sodium' }, // 8
    { name: 'Kosher' }, // 9
    { name: 'Low-Fat' }, // 10
    { name: 'Engine 2' }, // 11
  ]);

  await Product.deleteMany();

  const products = await Product.insertMany([
    // Vegan
    {
      name: 'Apple',
      image: 'apple.jpg',
      category: categories[1]._id,
      diet: diets[0]._id,
      aisle: 4,
      price: 1.99,
      quantity: 500
    },
    {
      name: 'Avocado',
      image: 'avocado.jpg',
      category: categories[1]._id,
      diet: diets[0]._id,
      aisle: 4,
      price: 4.99,
      quantity: 500
    },
    {
      name: 'Broccoli',
      image: 'broccoli.jpg',
      category: categories[1]._id,
      diet: diets[0]._id,
      aisle: 4,
      price: 0.99,
      quantity: 500
    },
    // GF
    {
      name: 'Almond Milk',
      image: 'almondMilk.jpg',
      category: categories[4]._id,
      diet: diets[1]._id,
      aisle: 4,
      price: 0.99,
      quantity: 500
    },
    {
      name: 'Greek Yogurt',
      image: 'greekYog.jpg',
      category: categories[4]._id,
      diet: diets[1]._id,
      aisle: 4,
      price: 0.99,
      quantity: 500
    },
    {
      name: 'Le Gruyère',
      image: 'gruyere.jpg',
      category: categories[4]._id,
      diet: diets[1]._id,
      aisle: 4,
      price: 0.99,
      quantity: 500
    },
    // Keto-Friendly
    {
      name: 'Salmon',
      image: 'salmon.jpg',
      category: categories[3]._id,
      diet: diets[2]._id,
      aisle: 4,
      price: 23.99,
      quantity: 500
    },
    {
      name: 'New York Strip',
      image: 'nystrip.jpg',
      category: categories[2]._id,
      diet: diets[2]._id,
      aisle: 4,
      price: 39.99,
      quantity: 500
    },
    {
      name: 'Raspberries',
      image: 'raspberries.jpg',
      category: categories[1]._id,
      diet: diets[2]._id,
      aisle: 4,
      price: 2.99,
      quantity: 500
    },
    // Vegetarian
    {
      name: 'Eggs',
      image: 'eggs.jpg',
      category: categories[0]._id,
      diet: diets[3]._id,
      aisle: 4,
      price: 6.99,
      quantity: 500
    },
    {
      name: 'Green Squash',
      image: 'greenSquash.jpg',
      category: categories[1]._id,
      diet: diets[1]._id,
      aisle: 4,
      price: 1.99,
      quantity: 500
    },
    {
      name: 'Tomato',
      image: 'tomato.jpg',
      category: categories[1]._id,
      diet: diets[1]._id,
      aisle: 4,
      price: 1.99,
      quantity: 500
    },
  ]);

  await User.deleteMany();

  await User.create({
    firstName: 'Matt',
    lastName: 'Matt',
    email: 'matt@mail.com',
    password: 'pass123',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Ryan',
    lastName: 'Joe',
    email: 'ryan@mail.com',
    password: 'pass123'
  });

  console.log('Seeding done! YAY');
  process.exit();
});
