const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./config/database");
const User = require("./models/users");
const Dish = require("./models/dishes");
const Order = require("./models/orders");
const DishOrder = require("./models/dishOrder");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.server = require("http").createServer(this.app);

        // Paths
        this.paths = {
            users: "/api/users",
            dishes: "/api/dishes",
            orders: "/api/orders"
        };

        // Database connection
        this.connectDB();

        // Json
        this.app.use(express.json());

        // Middlewares
        this.middlewares();

        // Application routes
        this.routes();
    }

    async connectDB() {
        await db.authenticate()
            .then(() => {
                console.log("Database connected successfully");
            })
            .catch((err) => {
                console.error("Unable to connect to the database:", err);
            });

        // Add models to the database
        await User.sync({ force: false });
        await Dish.sync({ force: false });
        await Order.sync({ force: false });
        await DishOrder.sync({ force: false });
        console.log("Models synchronized with the database");
        const seedDishes = require("./database/seeders/dishSeeder");
        await seedDishes(Dish);

    }

    middlewares() {
        // Logger
        this.app.use(morgan("dev"));

        // Body parser
        this.app.use(express.json());

        // CORS
        this.app.use(cors());
    }

    routes() {
        const dishRoutes = require('./routes/dishRoutes');
        console.log('dishRoutes loaded:', typeof dishRoutes);
        this.app.use(this.paths.dishes, dishRoutes);


        this.app.use(this.paths.orders, require("./routes/orderRoutes"));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port: http://localhost:${this.port}`);
        });
    }
}

module.exports = Server;