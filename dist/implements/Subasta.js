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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bson_1 = __importDefault(require("bson"));
const resGen_1 = require("../models/resGen");
//paquete de mongodb
const { MongoClient, ObjectID } = require("mongodb");
//uri de la BD, user, pass en mongodb
const uri = "mongodb+srv://admin:451432@cluster0.1fct6.mongodb.net/retryWrites=true&w=majority";
const client = new MongoClient(uri);
class Subasta {
    //^ Crear una subasta -----------------------------------------------------------------------------
    FGRegistraSubasta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let rg = new resGen_1.resGen();
                yield client.connect();
                //console.log(req.body);
                rg = yield this.FGRegistraSubastaBD(req);
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
                console.log("Error en metodo FGRegistraSubasta");
                res.statusCode = 500;
                //res.json({ statusCode: res.statusCode, message: error.message });
            }
        });
    }
    FGRegistraSubastaBD(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const rg = new resGen_1.resGen();
            try {
                //const result = await client.db("SAProject").collection("Subasta").insertOne(req.body);
                const result = yield client.db("SAProject").collection("Subasta").insertOne({ producto: req.body.producto, valor_inicial: parseFloat(req.body.valor_inicial), fecha_hora_inicio: new Date(req.body.fecha_hora_inicio), fecha_hora_fin: new Date(req.body.fecha_hora_fin), pujas: [], estado: "C" });
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
    //^ Listado de subastas -----------------------------------------------------------------------------
    FGConsultaSubastas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let rg = new resGen_1.resGen();
                yield client.connect();
                //console.log(req.body);
                rg = yield this.FGConsultaSubastasBD(req);
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
                console.log("Error en metodo FGConsultaSubastas");
                res.statusCode = 500;
                //res.json({ statusCode: res.statusCode, message: error.message });
            }
        });
    }
    FGConsultaSubastasBD(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const rg = new resGen_1.resGen();
            try {
                const cursor = yield client.db("SAProject").collection("Subasta").find();
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
    //^ Subasta por ID -----------------------------------------------------------------------------
    FGConsultaSubastaID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let rg = new resGen_1.resGen();
                yield client.connect();
                //console.log("id:"+req.params.idsubasta);
                rg = yield this.FGConsultaSubastaIDBD(req.params.idsubasta);
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
    FGConsultaSubastaIDBD(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const rg = new resGen_1.resGen();
            try {
                // const cursor = await client.db("SAProject").collection("Subasta").find();
                // const result = await cursor.toArray();
                const result = yield client.db("SAProject").collection("Subasta").findOne({ "_id": new bson_1.default.ObjectId(id) });
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
    //^ Puja ganadora ---------------------------------------------------------------------
    FGPPujaGanadora(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let rg = new resGen_1.resGen();
                yield client.connect();
                rg = yield this.FGPPujaGanadoraBD(req.params.idsubasta);
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
                console.log("Error en metodo FGPujaGanadora");
                res.statusCode = 500;
                //res.json({ statusCode: res.statusCode, message: error.message });
            }
        });
    }
    FGPPujaGanadoraBD(puja) {
        return __awaiter(this, void 0, void 0, function* () {
            const rg = new resGen_1.resGen();
            try {
                //TODO implementar consulta a la base de datos obtener todos los productos de un proveedor en específico
                const cursor = yield client.db("SAProject").collection("Subasta").aggregate([
                    { "$project": {
                            "max": {
                                "$arrayElemAt": [
                                    "$pujas",
                                    {
                                        "$indexOfArray": [
                                            "$pujas.puja",
                                            { "$max": "$pujas.puja" }
                                        ]
                                    }
                                ]
                            }
                        } },
                    {
                        //$match: {_id: ObjectID(puja)}
                        $match: { _id: new bson_1.default.ObjectId(puja) }
                    },
                ]);
                const result = yield cursor.toArray();
                console.log(result);
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
    //^ Subastas por proveedor -----------------------------------------------------------------------------
    FGConsultaSubastaProv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let rg = new resGen_1.resGen();
                yield client.connect();
                rg = yield this.FGConsultaSubastaProvBD(req.params.idproveedor);
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
    FGConsultaSubastaProvBD(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const rg = new resGen_1.resGen();
            try {
                // const cursor = await client.db("SAProject").collection("Subasta").find();
                // const result = await cursor.toArray();
                const cursor = yield client.db("SAProject").collection("Subasta").find({ "producto.proveedor": id });
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
exports.default = Subasta;
//# sourceMappingURL=Subasta.js.map