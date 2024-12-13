import express, { json, urlencoded } from "express";
import morgan from "morgan";
import { authRouter } from "@/routes/auth";
import { productRouter } from "@/routes/products";
import { categoryRouter } from "@/routes/categories";
import path from "path";
import expressLayouts from "express-ejs-layouts";
import { authenticatedUser } from "./utils/middleware/verifyToken";
import { userInfoRouter } from "./routes/userInfo";
import cookieParser from "cookie-parser";
import { _404Router } from "./routes/404";
import "dotenv/config";

const app = express();
const PORT = 3000;

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(expressLayouts);
app.set("layout", "layouts/layout");
app.use(cookieParser());

// static files
app.use(express.static(path.resolve(__dirname, "..", "public")));

// view engine setup
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

// auth routes
app.use("/auth", authRouter);

// authenticated middleware
app.use(authenticatedUser);
app.use("/products", categoryRouter);
app.use("/products", productRouter);
app.use("/users", userInfoRouter);

// handle 404
app.use("*", _404Router);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
