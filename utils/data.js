import bcrypt from 'bcryptjs';

const dataStore = {
  users: [
    {
      name: 'James',
      email: 'jbond@jbond.com',
      password: bcrypt.hashSync('licenseToKill'),
      isAdmin: true,
    },
    {
      name: 'Vesper',
      email: 'vesper@vesper.com',
      password: bcrypt.hashSync('manageYourMoneyWell'),
      isAdmin: false,
    },
  ],
  products: [
    {
      slug: 'free-shirt',
      name: 'Free Shirt',
      category: 'Shirts',
      image: '/images/shirt1.jpg',
      price: 70,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 10,
      countInStock: 20,
      description: 'A popular shirt',
    },
    {
      slug: 'fit-shirt',
      name: 'Fit Shirt',
      category: 'Shirts',
      image: '/images/shirt2.jpg',
      price: 80,
      brand: 'Adidas',
      rating: 4.2,
      numReviews: 10,
      countInStock: 20,
      description: 'A popular shirt',
    },
    {
      slug: 'slim-shirt',
      name: 'Slim Shirt',
      category: 'Shirts',
      image: '/images/shirt3.jpg',
      price: 90,
      brand: 'Raymond',
      rating: 4.5,
      numReviews: 10,
      countInStock: 20,
      description: 'A popular shirt',
    },
    {
      slug: 'golf-pants',
      name: 'Golf Pants',
      category: 'Pants',
      image: '/images/pants1.jpg',
      price: 90,
      brand: 'Oliver',
      rating: 4.5,
      numReviews: 10,
      countInStock: 20,
      description: 'Smart looking pants',
    },
    {
      slug: 'fit-pants',
      name: 'Fit pants',
      category: 'Pants',
      image: '/images/pants2.jpg',
      price: 95,
      brand: 'Zara',
      rating: 4.5,
      numReviews: 10,
      countInStock: 20,
      description: 'Popular pants',
    },
    {
      slug: 'classic-pants',
      name: 'Classic pants',
      category: 'Pants',
      image: '/images/pants3.jpg',
      price: 75,
      brand: 'Casely',
      rating: 4.5,
      numReviews: 10,
      countInStock: 20,
      description: 'Sleek pants',
    },
  ],
};

export default dataStore;
