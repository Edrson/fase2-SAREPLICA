import { Request, Response } from "express";
import { resGen } from "../models/resGen";
//paquete de mongodb
const { MongoClient } = require("mongodb");
//uri de la BD, user, pass en mongodb
const uri = "mongodb+srv://admin:451432@cluster0.1fct6.mongodb.net/retryWrites=true&w=majority";
const client = new MongoClient(uri);

class Subasta {

  //^ Crear una subasta -----------------------------------------------------------------------------
  async FGRegistraSubasta(req: Request, res: Response) {
    try {
      let rg = new resGen();
      await client.connect();
      //console.log(req.body);
      rg = await this.FGRegistraSubastaBD(req);
      if (rg.valid == true) {
        res.json({
          statusCode: res.statusCode,
          message: "OPERATION_SUCCESFULL",
        });
      } else {
        res.statusCode = 500;
        res.json({
          statusCode: res.statusCode,
          message: rg.message,
        });
      }
    } catch (error) {
      console.log("Error en metodo FGRegistraSubasta");
      res.statusCode = 500;
      //res.json({ statusCode: res.statusCode, message: error.message });
    }
  }

  async FGRegistraSubastaBD(req: Request): Promise<any> {
    const rg = new resGen();
    try {
      const result = await client.db("SAProject").collection("Subasta").insertOne(req.body);
      rg.valid = true;
      rg.data = result;
      //rg.message = `Usuario agregado con el siguiente _id: ${result.insertedId}`;
    } catch (error) {
      rg.valid = false;
      rg.message = (error as Error).message;
    } finally {
      return rg;
    }
  }

  
  //^ Listado de subastas -----------------------------------------------------------------------------
  async FGConsultaSubastas(req: Request, res: Response) {
    try {
      let rg = new resGen();
      await client.connect();
      //console.log(req.body);
      rg = await this.FGConsultaSubastasBD(req);
      if (rg.valid == true) {
        res.json({
          statusCode: res.statusCode,
          message: "OPERATION_SUCCESFULL",
          data: rg.data,
        });
      } else {
        res.statusCode = 500;
        res.json({
          statusCode: res.statusCode,
          message: rg.message,
        });
      }
    } catch (error) {
      console.log("Error en metodo FGConsultaSubastas");
      res.statusCode = 500;
      //res.json({ statusCode: res.statusCode, message: error.message });
    }
  }

  async FGConsultaSubastasBD(req: Request): Promise<any> {
    const rg = new resGen();
    try {
      const cursor = await client.db("SAProject").collection("Subasta").find();
      const result = await cursor.toArray();
      rg.valid = true;
      rg.data = result;
      //rg.message = `Usuario agregado con el siguiente _id: ${result.insertedId}`;
    } catch (error) {
      rg.valid = false;
      rg.message = (error as Error).message;
    } finally {
      return rg;
    }
  }
}

export default Subasta;
