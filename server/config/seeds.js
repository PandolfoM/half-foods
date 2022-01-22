const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Grocery' },
    { name: 'Produce' },
    { name: 'Meat' },
    { name: 'Dairy' },
    { name: 'Frozen' }
  ]);

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Oreo',
      image: 'oreo.png',
      category: categories[0]._id,
      aisle: 4,
      price: 2.99,
      quantity: 100
    },
    {
      name: 'Snapple',
      image: 'snapple.png',
      category: categories[0]._id,
      aisle: 2,
      price: 1.99,
      quantity: 100
    },
    {
      name: 'Leeks',
      category: categories[1]._id,
      image: 'leeks.png',
      price: 7.99,
      quantity: 50
    },
    {
      name: 'Brocoli',
      category: categories[1]._id,
      image: 'brocoli.png',
      price: 3.99,
      quantity: 50
    },
    {
      name: 'Filet Mignon',
      category: categories[2]._id,
      image: 'filetmignon.png',
      price: 50.00,
      quantity: 20
    },
    {
      name: 'Ground Beef',
      category: categories[2]._id,
      image: 'groundBeef.png',
      price: 24.99,
      quantity: 40
    },
    {
      name: 'Milk',
      category: categories[3]._id,
      image: 'milk.png',
      price: 4.99,
      quantity: 230
    },
    {
      name: 'Butter',
      category: categories[3]._id,
      image: 'butter.png',
      price: 1.99,
      quantity: 355
    },
    {
      name: 'Ice Cream',
      category: categories[4]._id,
      image: 'iceCream.png',
      price: 6.99,
      quantity: 500
    },
    {
      name: 'Ice Pop',
      category: categories[4]._id,
      image: 'icePop.png',
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
