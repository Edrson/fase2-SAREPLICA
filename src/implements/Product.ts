import { Request, Response } from "express";
import { resGen } from "../models/resGen";
//paquete de mongodb
const {MongoClient} = require("mongodb");
//uri de la BD, user, pass en mongodb
const uri = "mongodb+srv://admin:451432@cluster0.1fct6.mongodb.net/retryWrites=true&w=majority";
const client = new MongoClient(uri);
const axios = require('axios')
var ObjectID = require('mongodb').ObjectId;

class Product {

  //^ Agregar producto ---------------------------------------------------------------------------------
  async FGProductAdd(req: Request, res: Response) {
    try {
      let rg = new resGen();
      await client.connect();
      rg = await this.FGProductAddBD(req);
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
      console.log("Erro en metodo FGProductAdd");
      res.statusCode = 500;
      //res.json({ statusCode: res.statusCode, message: error.message });
    }
  }

  async FGProductAddBD(req: Request): Promise<any> {
    const rg = new resGen();
    try {
      //TODO implementar consulta a la base de datos para insertar producto
      const result = await client
        .db("SAProject")
        .collection("Categoria")
        .updateOne(
          { _id: req.body.categoria },
          {
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
          }
        );
      rg.valid = true;
      rg.data = result;
    } catch (error) {
      rg.valid = false;
      //rg.message = error.message;
    } finally {
      return rg;
    }
  }


  //^ Actualizar producto ---------------------------------------------------------------------------------
  async FGProductUpdate(req: Request, res: Response) {
    try {
      let rg = new resGen();
      await client.connect();
      rg = await this.FGProductUpdateBD(req);
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
      console.log("Error en metodo FGProductUpdate");
      res.statusCode = 500;
      //res.json({ statusCode: res.statusCode, message: error.message });
    }
  }

  async FGProductUpdateBD(req: Request): Promise<any> {
    const rg = new resGen();
    try {
      //TODO implementar consulta a la base de datos para modificar producto
      //console.log(req.body);
      const result = await client
        .db("SAProject")
        .collection("Categoria")
        .updateOne(
          { _id: req.body.categoria, "productos.nombre": req.body.nombre },
          {
            $set: {"productos.$.precio": req.body.precio, "productos.$.stock": req.body.stock, "productos.$.descripcion": req.body.descripcion, "productos.$.proveedor": req.body.proveedor, "productos.$.foto": req.body.foto}
          }
        );

      rg.valid = true;
      return rg;
    } catch (error) {
      rg.valid = false;
      //rg.message = error.message;
      return rg;
    }
  }


  //^ Eliminar producto ------------------------------------------------------------
  async FGProductDelete(req: Request, res: Response) {
    try {
      let rg = new resGen();
      await client.connect();
      rg = await this.FGProductDeleteBD(req);
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
      console.log("Erro en metodo FGProductUpdate");
      res.statusCode = 500;
      //res.json({ statusCode: res.statusCode, message: error.message });
    }
  }

  async FGProductDeleteBD(req: Request): Promise<any> {
    const rg = new resGen();
    try {
      //TODO implementar consumo a la base de datos para eliminar producto
      const result = await client
        .db("SAProject")
        .collection("Categoria")
        .update(
          { _id: req.body.categoria },
          {
            $pull: {
              productos: {
                nombre: req.body.nombre
              },
            },
          },{multi:true}
        );

      rg.valid = true;
      return rg;
    } catch (error) {
      rg.valid = false;
      //rg.message = error.message;
      return rg;
    }
  }


  //^ Catalogo de todos los productos---------------------------------------------------------------------
  async FGCatalogue(req: Request, res: Response) {
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

      let rg = new resGen();
      await client.connect();
      rg = await this.FGCatalogueBD(req);

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
      console.log("Error en metodo FGCatalogue");
      res.statusCode = 500;
      res.json({ statusCode: res.statusCode, message: (error as Error).message });
    }
  }

  async FGCatalogueBD(req: Request): Promise<any> {
    const rg = new resGen();
    try {
      const cursor = await client.db("SAProject").collection("Categoria").find();
      //console.log(result);

      const result = await cursor.toArray();

      rg.valid = true;
      rg.data = result;
    } catch (error) {
      rg.valid = false;
      rg.message = (error as Error).message;
    } finally {
      return rg;
    }
  }
  

  //^ Catalogo de productos de un proveedor en específico ---------------------------------------------------------------------
  async FGProductSupplier(req: Request, res: Response) {
    try {
      let rg = new resGen();
      await client.connect();
      rg = await this.FGProductSupplierBD(req.params.iduser);
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
      console.log("Error en metodo FGCatalogue");
      res.statusCode = 500;
      //res.json({ statusCode: res.statusCode, message: error.message });
    }
  }
  
  async FGProductSupplierBD(user: string): Promise<any> {
    const rg = new resGen();
    try {
      //TODO implementar consulta a la base de datos obtener todos los productos de un proveedor en específico
      //const cursor = await client.db("SAProject").collection("Categoria").find({ "productos.proveedor": user });
      const cursor = await client.db("SAProject").collection("Categoria").aggregate([
        {
          $unwind: "$productos"
        },
        {
          $match: {"productos.proveedor": user}
        },
        { 
          $project: {"producto": "$productos"}
        }
      ])

      const result = await cursor.toArray();
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
    } catch (error) {
      rg.valid = false;
      //rg.message = error.message;
      return rg;
    }
  }


  //^ Favoritos (lista de deseos) ------------------------------------------------------------
  async FGProductFavorito(req: Request, res: Response) {
    try {
      let rg = new resGen();
      await client.connect();
      rg = await this.FGProductFavoritoBD(req);
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
      console.log("Error en metodo FGProductFavorito");
      res.statusCode = 500;
      //res.json({ statusCode: res.statusCode, message: error.message });
    }
  }

  async FGProductFavoritoBD(req: Request): Promise<any> {
    const rg = new resGen();
    try {
      //TODO implementar consumo a la base de datos para eliminar producto
      console.log(req.body);
      const result = await client.db("SAProject").collection("Favorito").insertOne(req.body);

      rg.valid = true;
      rg.data = result;
      return rg;
    } catch (error) {
      rg.valid = false;
      //rg.message = error.message;
      return rg;
    }
  }

  async FGConsultaFavoritosUsuario(req: Request, res: Response) {
    try {
      let rg = new resGen();
      await client.connect();
      rg = await this.FGConsultaFavoritosUsuarioBD(req.params.idusuario);
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

  async FGConsultaFavoritosUsuarioBD(id:string): Promise<any> {
    const rg = new resGen();
    try {
   // const cursor = await client.db("SAProject").collection("Subasta").find();
    // const result = await cursor.toArray();
  
  
      const cursor = await client.db("SAProject").collection("Favorito").find({"usuario":id});
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

  


export default Product;
