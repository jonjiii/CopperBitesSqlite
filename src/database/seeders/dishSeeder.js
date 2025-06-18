module.exports = async function seedDishes(Dish) {
  const dishes = [
    {
      name: 'Pizza Margherita',
      description: 'Pizza con salsa de tomate, mozzarella y albahaca',
      image: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Cheese_pizza.jpg',
      price: 8.99,
      category: 'main course',
      aviable: true,
      ingredients: 'Tomate, mozzarella, albahaca',
      isActive: true
    },
    {
      name: 'Tiramisú',
      description: 'Postre italiano con café y mascarpone',
      image: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Tiramisu.jpg',
      price: 5.5,
      category: 'dessert',
      aviable: true,
      ingredients: 'Queso mascarpone, café, cacao',
      isActive: true
    }
  ];

  try {
    await Dish.bulkCreate(dishes);
    console.log('Dishes seeded successfully');
  } catch (err) {
    console.error('Error seeding dishes:', err);
  }
};

