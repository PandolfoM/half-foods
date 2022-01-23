const db = require('./connection');
const { User, Product, Category, Diet } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();
  await Diet.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Grocery' },
    { name: 'Produce' },
    { name: 'Meat' },
    { name: 'Dairy' },
    { name: 'Frozen Food' },
    { name: 'Beverages' },
    { name: 'Bakery' },
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
    {
      name: 'Oreo',
      image: 'oreo.png',
      category: categories[0]._id,
      diet: diets[0]._id,
      aisle: 4,
      price: 2.99,
      quantity: 100
    },
    {
      name: 'Snapple',
      image: 'snapple.png',
      category: categories[0]._id,
      diet: diets[2]._id,
      aisle: 2,
      price: 1.99,
      quantity: 100
    },
    {
      name: 'Leeks',
      category: categories[0]._id,
      diet: diets[0,1,2]._id,
      image: 'leeks.png',
      price: 7.99,
      quantity: 50
    },
    {
      name: 'Brocoli',
      category: categories[1]._id,
      diet: diets[0,1,2]._id,
      image: 'brocoli.png',
      price: 3.99,
      quantity: 50
    },
    {
      name: 'Filet Mignon',
      category: categories[2]._id,
      diet: diets[5]._id,
      image: 'filetmignon.png',
      price: 50.00,
      quantity: 20
    },
    {
      name: 'Ground Beef',
      category: categories[2]._id,
      diet: diets[5,8]._id,
      image: 'groundBeef.png',
      price: 24.99,
      quantity: 40
    },
    {
      name: 'Milk',
      category: categories[3]._id,
      diet: diets[9]._id,
      image: 'milk.png',
      price: 4.99,
      quantity: 230
    },
    {
      name: 'Butter',
      category: categories[3]._id,
      image: 'butter.png',
      diet: diets[9]._id,
      price: 1.99,
      quantity: 355
    },
    {
      name: 'Ice Cream',
      category: categories[4]._id,
      image: 'iceCream.png',
      diet: diets[3]._id,
      price: 6.99,
      quantity: 500
    },
    {
      name: 'Ice Pop',
      category: categories[4]._id,
      image: 'icePop.png',
      diet: diets[1]._id,
      price: 3.99,
      quantity: 500
    }
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
