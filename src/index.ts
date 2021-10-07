import UserDB from "./implements/UserDB";
import UserImp from "./implements/UserImp";
import UserLogin from "./implements/UserLogin";
import UserGetInfo from "./implements/UserGetInfo";
import Product from "./implements/Product";
import Compra from "./implements/Compra";
import Subasta from "./implements/Subasta";
import Puja from "./implements/Puja";

const express = require("express");
const app = express();
import { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import { isNoSubstitutionTemplateLiteral } from "typescript";

const PORT = 3000;

var cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(morgan("dev"));

//^Instanciar los objetos-----------
const userDB = new UserDB();
const user = new UserImp(userDB);
const userLogin = new UserLogin();
const userGetInfo = new UserGetInfo();
const product = new Product();
const compra = new Compra();
const subasta = new Subasta();
const puja = new Puja();
//^Finaliza instanciar objetos------

//*test
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Servicios Grupo 1 - SA");
});

//*Agregar usuario
app.post("/sa/user/add", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await user.FGUserAdd(req, res);
  } catch (e) {
    next(e);
  }
});
//*login
app.post("/sa/user/login", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userLogin.FGLogin(req, res);
  } catch (e) {
    next(e);
  }
});
//*Mostrar todos los datos de un usuario, cliente o proveedor
app.get("/sa/user/data/:iduser", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userGetInfo.FGGetInfo(req, res);
  } catch (e) {
    next(e);
  }
});
//*Agregar producto a la tienda
app.post("/sa/product/add", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await product.FGProductAdd(req, res);
  } catch (e) {
    next(e);
  }
});
//*Actualizar producto
app.post("/sa/product/update", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await product.FGProductUpdate(req, res);
  } catch (e) {
    next(e);
  }
});
//*eliminar producto
app.post("/sa/product/delete", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await product.FGProductDelete(req, res);
  } catch (e) {
    next(e);
  }
});
//*Catalogo general de productos
app.get("/sa/catalogue", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await product.FGCatalogue(req, res);
  } catch (e) {
    next(e);
  }
});
//*Mostrar todos los productos de un proveedor
app.get("/sa/product/proveedor/:iduser", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await product.FGProductSupplier(req, res);
  } catch (e) {
    next(e);
  }
});
//*Registrar compra:
app.post("/sa/product/regcompra", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await compra.FGRegistraCompra(req, res);
  } catch (e) {
    next(e);
  }
});
//*Registrar subasta:
app.post("/sa/product/regsubasta", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await subasta.FGRegistraSubasta(req, res);
  } catch (e) {
    next(e);
  }
});
//*Registrar puja:
app.post("/sa/product/regpuja", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await puja.FGRegistraPuja(req, res);
  } catch (e) {
    next(e);
  }
});
//*Consultar subastas:
app.get("/sa/product/con/subastas", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await subasta.FGConsultaSubastas(req, res);
  } catch (e) {
    next(e);
  }
});

app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
