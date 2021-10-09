"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const resGen_1 = require("../models/resGen");
//paquete de mongodb
const { MongoClient } = require("mongodb");
//uri de la BD, user, pass en mongodb
const uri = "mongodb+srv://admin:451432@cluster0.1fct6.mongodb.net/retryWrites=true&w=majority";
const client = new MongoClient(uri);
const axios = require('axios');
var ObjectID = require('mongodb').ObjectId;
class Product {
    //^ Agregar producto ---------------------------------------------------------------------------------
    FGProductAdd(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let rg = new resGen_1.resGen();
                yield client.connect();
                rg = yield this.FGProductAddBD(req);
                if (rg.valid == true) {
                    res.json({
                        statusCode: res.statusCode,
                        message: "OPERATION_SUCCESFULL",
                    });
                }
                else {
                    res.statusCode = 500;
                    res.json({
                        statusCode: res.statusCode,
                        message: rg.message,
                    });
                }
            }
            catch (error) {
                console.log("Erro en metodo FGProductAdd");
                res.statusCode = 500;
                //res.json({ statusCode: res.statusCode, message: error.message });
            }
        });
    }
    FGProductAddBD(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const rg = new resGen_1.resGen();
            try {
                //TODO implementar consulta a la base de datos para insertar producto
                const result = yield client
                    .db("SAProject")
                    .collection("Categoria")
                    .updateOne({ _id: req.body.categoria }, {
                    $push: {
                        productos: {
                            precio: req.body.precio,
                            stock: req.body.stock,
                            nombre: req.body.nombre,
                            descripcion: req.body.descripcion,
                            foto: req.body.foto,
                            proveedor: req.body.proveedor,
                        },
                    },
                });
                rg.valid = true;
                rg.data = result;
            }
            catch (error) {
                rg.valid = false;
                //rg.message = error.message;
            }
            finally {
                return rg;
            }
        });
    }
    //^ Actualizar producto ---------------------------------------------------------------------------------
    FGProductUpdate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let rg = new resGen_1.resGen();
                yield client.connect();
                rg = yield this.FGProductUpdateBD(req);
                if (rg.valid == true) {
                    res.json({
                        statusCode: res.statusCode,
                        message: "OPERATION_SUCCESFULL",
                    });
                }
                else {
                    res.statusCode = 500;
                    res.json({
                        statusCode: res.statusCode,
                        message: rg.message,
                    });
                }
            }
            catch (error) {
                console.log("Error en metodo FGProductUpdate");
                res.statusCode = 500;
                //res.json({ statusCode: res.statusCode, message: error.message });
            }
        });
    }
    FGProductUpdateBD(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const rg = new resGen_1.resGen();
            try {
                //TODO implementar consulta a la base de datos para modificar producto
                //console.log(req.body);
                const result = yield client
                    .db("SAProject")
                    .collection("Categoria")
                    .updateOne({ _id: req.body.categoria, "productos.nombre": req.body.nombre }, {
                    $set: { "productos.$.precio": req.body.precio, "productos.$.stock": req.body.stock, "productos.$.descripcion": req.body.descripcion, "productos.$.proveedor": req.body.proveedor, "productos.$.foto": req.body.foto }
                });
                rg.valid = true;
                return rg;
            }
            catch (error) {
                rg.valid = false;
                //rg.message = error.message;
                return rg;
            }
        });
    }
    //^ Eliminar producto ------------------------------------------------------------
    FGProductDelete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let rg = new resGen_1.resGen();
                yield client.connect();
                rg = yield this.FGProductDeleteBD(req);
                if (rg.valid == true) {
                    res.json({
                        statusCode: res.statusCode,
                        message: "OPERATION_SUCCESFULL",
                    });
                }
                else {
                    res.statusCode = 500;
                    res.json({
                        statusCode: res.statusCode,
                        message: rg.message,
                    });
                }
            }
            catch (error) {
                console.log("Erro en metodo FGProductUpdate");
                res.statusCode = 500;
                //res.json({ statusCode: res.statusCode, message: error.message });
            }
        });
    }
    FGProductDeleteBD(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const rg = new resGen_1.resGen();
            try {
                //TODO implementar consumo a la base de datos para eliminar producto
                const result = yield client
                    .db("SAProject")
                    .collection("Categoria")
                    .update({ _id: req.body.categoria }, {
                    $pull: {
                        productos: {
                            nombre: req.body.nombre
                        },
                    },
                }, { multi: true });
                rg.valid = true;
                return rg;
            }
            catch (error) {
                rg.valid = false;
                //rg.message = error.message;
                return rg;
            }
        });
    }
    //^ Catalogo de todos los productos---------------------------------------------------------------------
    FGCatalogue(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //console.log(req.body);
                //console.log(req.headers.authorization);
                // const headers = { 
                //    'Authorization': req.headers.authorization
                // };
                // axios.post('http://localhost:3001/jwt/secure', {}, {headers})
                //   .then((resp: any) => {
                //     //console.log(`statusCode: ${resp.status}`)
                //     console.log(resp.data)
                //     if (resp.data.name){
                //       return res.status(401).send({
                //         error: "Token JWT no válido."
                //       })    
                //     }
                //   });
                let rg = new resGen_1.resGen();
                yield client.connect();
                rg = yield this.FGCatalogueBD(req);
                if (rg.valid == true) {
                    res.json({
                        statusCode: res.statusCode,
                        message: "OPERATION_SUCCESFULL",
                        data: rg.data,
                    });
                }
                else {
                    res.statusCode = 500;
                    res.json({
                        statusCode: res.statusCode,
                        message: rg.message,
                    });
                }
            }
            catch (error) {
                console.log("Error en metodo FGCatalogue");
                res.statusCode = 500;
                res.json({ statusCode: res.statusCode, message: error.message });
            }
        });
    }
    FGCatalogueBD(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const rg = new resGen_1.resGen();
            try {
                const cursor = yield client.db("SAProject").collection("Categoria").find();
                //console.log(result);
                const result = yield cursor.toArray();
                rg.valid = true;
                rg.data = result;
            }
            catch (error) {
                rg.valid = false;
                rg.message = error.message;
            }
            finally {
                return rg;
            }
        });
    }
    //^ Catalogo de productos de un proveedor en específico ---------------------------------------------------------------------
    FGProductSupplier(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let rg = new resGen_1.resGen();
                yield client.connect();
                rg = yield this.FGProductSupplierBD(req.params.iduser);
                if (rg.valid == true) {
                    res.json({
                        statusCode: res.statusCode,
                        message: "OPERATION_SUCCESFULL",
                        data: rg.data,
                    });
                }
                else {
                    res.statusCode = 500;
                    res.json({
                        statusCode: res.statusCode,
                        message: rg.message,
                    });
                }
            }
            catch (error) {
                console.log("Error en metodo FGCatalogue");
                res.statusCode = 500;
                //res.json({ statusCode: res.statusCode, message: error.message });
            }
        });
    }
    FGProductSupplierBD(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const rg = new resGen_1.resGen();
            try {
                //TODO implementar consulta a la base de datos obtener todos los productos de un proveedor en específico
                //const cursor = await client.db("SAProject").collection("Categoria").find({ "productos.proveedor": user });
                const cursor = yield client.db("SAProject").collection("Categoria").aggregate([
                    {
                        $unwind: "$productos"
                    },
                    {
                        $match: { "productos.proveedor": user }
                    },
                    {
                        $project: { "producto": "$productos" }
                    }
                ]);
                const result = yield cursor.toArray();
                //console.log(result);
                rg.valid = true;
                /*
                rg.data = [
                  {
                    categoria: "ropa",
                    precio: 100,
                    stock: 20,
                    nombre: "pantalon",
                    descripcion: "de caballero",
                    foto: "N/A",
                    proveedor: "cristian.ramirez@gmail.com",
                  },
                  {
                    categoria: "zapatos",
                    precio: 200,
                    stock: 10,
                    nombre: "zapatos nike",
                    descripcion: "tenis de caballero",
                    foto: "N/A",
                    proveedor: "cristian.ramirez@gmail.com",
                  },
                ];
                */
                rg.data = result;
                return rg;
            }
            catch (error) {
                rg.valid = false;
                //rg.message = error.message;
                return rg;
            }
        });
    }
    //^ Favoritos (lista de deseos) ------------------------------------------------------------
    FGProductFavorito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let rg = new resGen_1.resGen();
                yield client.connect();
                rg = yield this.FGProductFavoritoBD(req);
                if (rg.valid == true) {
                    res.json({
                        statusCode: res.statusCode,
                        message: "OPERATION_SUCCESFULL",
                    });
                }
                else {
                    res.statusCode = 500;
                    res.json({
                        statusCode: res.statusCode,
                        message: rg.message,
                    });
                }
            }
            catch (error) {
                console.log("Error en metodo FGProductFavorito");
                res.statusCode = 500;
                //res.json({ statusCode: res.statusCode, message: error.message });
            }
        });
    }
    FGProductFavoritoBD(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const rg = new resGen_1.resGen();
            try {
                //TODO implementar consumo a la base de datos para eliminar producto
                console.log(req.body);
                const result = yield client.db("SAProject").collection("Favorito").insertOne(req.body);
                rg.valid = true;
                rg.data = result;
                return rg;
            }
            catch (error) {
                rg.valid = false;
                //rg.message = error.message;
                return rg;
            }
        });
    }
    FGConsultaFavoritosUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let rg = new resGen_1.resGen();
                yield client.connect();
                rg = yield this.FGConsultaFavoritosUsuarioBD(req.params.idusuario);
                if (rg.valid == true) {
                    res.json({
                        statusCode: res.statusCode,
                        message: "OPERATION_SUCCESFULL",
                        data: rg.data,
                    });
                }
                else {
                    res.statusCode = 500;
                    res.json({
                        statusCode: res.statusCode,
                        message: rg.message,
                    });
                }
            }
            catch (error) {
                console.log("Error en metodo FGConsultaSubastaID");
                res.statusCode = 500;
                //res.json({ statusCode: res.statusCode, message: error.message });
            }
        });
    }
    FGConsultaFavoritosUsuarioBD(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const rg = new resGen_1.resGen();
            try {
                // const cursor = await client.db("SAProject").collection("Subasta").find();
                // const result = await cursor.toArray();
                const cursor = yield client.db("SAProject").collection("Favorito").find({ "usuario": id });
                const result = yield cursor.toArray();
                rg.valid = true;
                rg.data = result;
                //rg.message = `Usuario agregado con el siguiente _id: ${result.insertedId}`;
            }
            catch (error) {
                rg.valid = false;
                rg.message = error.message;
            }
            finally {
                return rg;
            }
        });
    }
}
exports.default = Product;
//# sourceMappingURL=Product.js.map