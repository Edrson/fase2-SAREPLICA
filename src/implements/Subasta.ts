import BSON, { ObjectId } from "bson";
import { Request, Response } from "express";
import { resGen } from "../models/resGen";
//paquete de mongodb
const { MongoClient, ObjectID } = require("mongodb");
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
      //const result = await client.db("SAProject").collection("Subasta").insertOne(req.body);
      const result = await client.db("SAProject").collection("Subasta").insertOne({producto: req.body.producto, valor_inicial: parseFloat(req.body.valor_inicial), fecha_hora_inicio: new Date(req.body.fecha_hora_inicio), fecha_hora_fin: new Date(req.body.fecha_hora_fin), pujas: [], estado: "C"});
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

  
  //^ Subasta por ID -----------------------------------------------------------------------------
  async FGConsultaSubastaID(req: Request, res: Response) {
    try {
      let rg = new resGen();
      await client.connect();
      //console.log("id:"+req.params.idsubasta);
      rg = await this.FGConsultaSubastaIDBD(req.params.idsubasta);
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
      console.log("Error en metodo FGConsultaSubastaID");
      res.statusCode = 500;
      //res.json({ statusCode: res.statusCode, message: error.message });
    }
  }

  async FGConsultaSubastaIDBD(id:string): Promise<any> {
    const rg = new resGen();
    try {
   // const cursor = await client.db("SAProject").collection("Subasta").find();
    // const result = await cursor.toArray();
  
  
      const result = await client.db("SAProject").collection("Subasta").findOne({"_id":new BSON.ObjectId(id)});
      
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


  //^ Puja ganadora ---------------------------------------------------------------------
  async FGPPujaGanadora(req: Request, res: Response) {
    try {
      let rg = new resGen();
      await client.connect();
      rg = await this.FGPPujaGanadoraBD(req.params.idsubasta);
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
      console.log("Error en metodo FGPujaGanadora");
      res.statusCode = 500;
      //res.json({ statusCode: res.statusCode, message: error.message });
    }
  }
  async FGPPujaGanadoraBD(puja: string): Promise<any> {
    const rg = new resGen();
    try {
      //TODO implementar consulta a la base de datos obtener todos los productos de un proveedor en específico

      const cursor = await client.db("SAProject").collection("Subasta").aggregate([
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
        }},
        {
          //$match: {_id: ObjectID(puja)}
          $match: {_id: new BSON.ObjectId(puja)}
        },
      ])
      
      const result = await cursor.toArray();
      console.log(result);
      
      rg.valid = true;
      rg.data = result;
      return rg;
    } catch (error) {
      rg.valid = false;
      //rg.message = error.message;
      return rg;
    }
  }


   //^ Subastas por proveedor -----------------------------------------------------------------------------
  async FGConsultaSubastaProv(req: Request, res: Response) {
    try {
      let rg = new resGen();
      await client.connect();
      rg = await this.FGConsultaSubastaProvBD(req.params.idproveedor);
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
      console.log("Error en metodo FGConsultaSubastaID");
      res.statusCode = 500;
      //res.json({ statusCode: res.statusCode, message: error.message });
    }
  }

  async FGConsultaSubastaProvBD(id:string): Promise<any> {
    const rg = new resGen();
    try {
   // const cursor = await client.db("SAProject").collection("Subasta").find();
    // const result = await cursor.toArray();
  
  
      const cursor = await client.db("SAProject").collection("Subasta").find({"producto.proveedor":id});
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
