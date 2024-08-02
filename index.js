require("dotenv").config();
const express = require('express');
const app = express();
const dbConnect = require("./Database/database.js");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const UserRoutes = require("./Routes/authRoute.js");
const SaleRoutes = require("./Routes/saleRoute.js");
const ExpenseRoutes = require("./Routes/expenseRoute.js");
const RbmRoutes = require("./Routes/rbmRoute.js");
const UsersRoutes = require("./Routes/UsersRoute.js");
const userDetailsRoutes = require("./Routes/userDetailRoutes.js");
const TeleCallerRoute = require("./Routes/TeleCallerRouter.js");


const PORT = process.env.PORT || 5000;


// middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: true,
        credentials: true,
    })
)

// Routes
app.use("/api/v1/auth",UserRoutes);
app.use('/api/v1/sale',SaleRoutes);
app.use('/api/v1/expense',ExpenseRoutes);
app.use('/api/v1/rbm',RbmRoutes);
app.use('/api/v1/upload',UsersRoutes);
app.use('/api/v1/user',userDetailsRoutes);
app.use('/api/v1/telecaller',TeleCallerRoute);

app.get('/', (req,res)=>{
    res.send('Hey, I am Backend Server Route');
})

app.listen(PORT, ()=>{
    dbConnect();
    console.log(`Server Started at Port ${PORT}`);
})