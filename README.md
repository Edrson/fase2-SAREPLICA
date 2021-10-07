# Proyecto SA - Fase 1

### GRUPO No. 1
```
Luis Eduardo Hernandez Amado - 200714432
Ederson Odir Ramirez Hernandez - 200915050
Rafael Alejandro Juarez Yantuche - 201021164
```

## Descripción
Debido al rápido crecimiento de los negocios electrónicos en el mercado, la tienda **“TangoCart”** ha decidido crear una app de e-commerce ya que ahora es indispensable para seguir creciendo y vendiendo y además para adaptarse a las necesidades y preferencias de los usuarios.

Dicha aplicación permitirá el registro de usuarios, ya sean clientes o proveedores, también contará con un catalogo de productos y toda la información de los mismos, dichos productos estarán organizados en categorías y serán agregados al catálogo por los proveedores. Los clientes en cambio podrán visualizar los productos y en caso de querer comprarlos se agregarán a un carrito de compras, donde estarán almacenados antes de confirmar la compra y pagar por ellos utilizando una tarjeta de crédito registrada previamente.

Debido a la naturaleza del proyecto se ha decidido para el desarrollo utilizar una arquitectura SOA además de DevOps para automatizar la integración y el despliegue.

## Solución propuesta

Según el análisis del requerimiento, se propone una solución basada en la arquitectura orientada a servicios SOA, con un backend compuesto por servicios desarrollados mediante typescript + nodejs, éstos dockerizados ,para la persistencia de datos se implementará una base de datos Mongo DB, una interfaz de usuario front end desarrollada con el framework Angular, autenticación mediante JWT, y como proveedor de nube Google cloud.

## Exposición de Solución

<a href="https://docs.google.com/presentation/d/1uXxaDp5tfvpXAuP_LIJGvVIsr0KOlp6rmB7mZNg-mrk/edit#slide=id.gc6f80d1ff_0_0">Link de presentación</a>

## Arquitectura propuesta (basada en SOA)
<img src="https://snz04pap002files.storage.live.com/y4mVFgx0GBaSv2YH6uFgSFhUqoZojwiEOgvl0IqLRi7yuBptmZ64oGI6wFJAwoH6T1Kj8DADzy3V0mrkt6v_s4pUZ7Hg-yGYcMsuq_qDzZ4C21_faW8S8iaxAsLNrTmp-snpXhjrduEfAwJucLRMMMGRhE4UA65g-_OmDKpVzx-H1n6D-VvwO2eE3EhEspBOusR?width=801&height=661&cropmode=none" alt="Arquitectura" />

## Descripción de la funcionalidad

<a href="https://docs.google.com/document/d/157z7me77FuGDuxJiueDiYWYunLp8-knbgp9CVu9Ig2E/edit?usp=sharing">Documento de funcionalidad</a>


## Contenedores y sistemas de Orquestación

<img src="https://snz04pap002files.storage.live.com/y4mZtPfuGeB9F2usen60JHKt21INQcfvpPHOMY4HzqT8NYl91djp0OQy_eMrN8VjCo37x68ETxFeEAOySi0N4qGR2YSQGLHHpMuCcJvwJtRT1zOIMxDzqwLXtNcFOxgxvuKOIcMlqGtq3u_8CNEElCa_ZAGt41aDSHBfccp-Wxfj9aQXS0cv_asXmWP0D0C5aSW?width=671&height=681&cropmode=none" alt="Contenedores y Orquestación" />





## Versionamiento
Para el control versiones se utilizará Azure Repos de tipo distribuido (Git), ya que éste brinda todas las herramientas y funciones de una herramienta de control de versiones y además se integra con la herramienta que se eligió para la automatización de pruebas, integración y despliegue (CI/CD) Azure Pipelines.

<img src="https://store-images.s-microsoft.com/image/apps.15528.17be854f-8759-4a10-a4fe-71ce8c683841.0d79e16f-d5ac-4292-b069-182fd1a7ece9.80361c18-6c60-4b81-a7be-049265f16f59.png" alt="Azure Repos" width="270"/>


## Lenguaje de Programacion
Como lenguaje de programación se seleccionó JavaScript + TypeScript + Nodejs debido a la gran cantidad de ventajas que posee sobre otros lenguajes de programación, como por ejemplo que utiliza Javascript, un lenguaje sencillo de aprender, además de la facilidad para la creación de APIs REST que utilizan JSON para peticiones y respuestas.

<img src="http://xurxodev.com/content/images/2015/12/Node-js-Logo.png" alt="NodeJS" width="650"/>
<br>
<img src="https://codersera.com/blog/wp-content/uploads/2021/06/TypeScript-VS-JavaScript-Difference-One-Should-Know-672x372.png" alt="NodeJS" width="650"/>

Además para la persistencia de datos se utiliza la base de datos NOSQL MongoDB que incluye escalabilidad y la flexibilidad. MongoDB también se integra bien con Node, ya que está diseñado para funcionar de forma asíncrona con objetos JSON.

<img src="https://i.blogs.es/ce4ab0/mongodb-logo/450_1000.jpg" alt="MongoDB" width="350"/>

## Herramientas de desarrollo a utilizar
- NodeJS + JavaScript: como lenguaje de programación backend
- Angular: framework para aplicaciones web para frontend
- MongoDB: base de datos NOSQL
- Azure Devops: conjunto de herramientas para DevOps de Microsoft
- Docker: herramienta para el despliegue de aplicaciones dentro de contenedores
- Google cloud: nube de Google en donde se crean las maquinas virtuales que utilizará el proyecto
- Mocha & Chai: paquetes de NodeJS para pruebas unitarias
- Postman: herramienta para probar endpoints, apis, etc.

## Herramientas de metodología a utilizar
Se implementa la metodología Scrum, para lo cual se utilizará la plataforma Azure Devops, la cual cuenta entre sus características con las siguientes herramientas:
-	Repositorio de código fuente.
-	Control de versiones
-	Creación de pipelines
-	Tablero de actividades
-	Backlog de tareas

<img src="https://www.itsitio.com/wp-content/uploads/2019/02/ITSitio_azure-devops_captura1.png" alt="Azure Devops" width="700"/>

## Herramienta de control de tiempo a utilizar
Para el control del tiempo se utilizará Azure Boards

<img src="https://snz04pap002files.storage.live.com/y4muiIF-z3rspycvDR2_TMPBCXMVlLUrhkmsWsC6isOUBY8lJZYVZtVikwdEZEb2PAMFH1LN6OSMIQW90gbab_N23ePpodOPANqwPyIHb3uPMYEyL5BOtM05BWj7KWLzoZ_8Z2QFCOpO3AXSrpb4asI1KTSDZPeqqqpcORbl-YHRosxj0wsVNtBwzZylqf3BPi_?width=986&height=523&cropmode=none" alt="Board 1"/>

<img src="https://snz04pap002files.storage.live.com/y4mVydYrb_GQIHxuazsDCWlMTGbCPgQrQXoaDTOCtL60Iiy-4eKdDFfUerIS089PebU-DSUiuifjmwBBWImtJO2P6SogzLEl0Oow8FrFKpMuqHGenl0OIl-P0o4kIUCU5IMnuhrrM3SCj-H4QXhtOJuQzQyOAg8Itbejnntc9Hhyu50U6HmsvidtKNMVl5lQvhi?width=954&height=228&cropmode=none" alt="Board 2"/>

## Pruebas a implementar
Se implementarán las siguientes pruebas funcionales
-	Registro de usuario
-	Login
-	Creación de producto
-	Consulta de productos
-	Modificación de productos
-	Eliminación de producto
-	Agregar producto al carrito
-	Realizar compra

Para el código se realizarán pruebas unitarias con apoyo de las librerías Mocha y Chai.

<img src="https://miro.medium.com/max/482/1*BmORsbtFaWw0lyyfMtYd0Q.png" alt="Pruebas" />

<hr/>

## Diagrama de casos de uso

<img src="https://snz04pap002files.storage.live.com/y4mRdVh_w4svmJQIprJ8FuIagoUoLiOLIbuXDYijQObbLW5O2CufjsVHyhzMxEO7999_pI89W86jZUpUHjcPxpgF2Vg_K1967sG01fv5Uh-WycK-s2mZdENwVVjBuqp2uFu-cglTb8BHXZy1SnF_hJaoo5RdnE6xGFI8kBwi0RuWgCnbGLhdzkTRCu-MunxAB1z?width=711&height=1051&cropmode=none" alt="Casos de uso" />

## Diagrama de flujo general

<img src="https://snz04pap002files.storage.live.com/y4mFrFEzhSuGc-wJPnPELK5yJJbDDWxPm4lefelZnDC7CFRbzDDY5MY7EtcUp_0TTX5D80kaqamiHcZz-2lyH5Sh1Qu-N7V_MLVBBja85RaVtpzhZy2qTfK7XNpREHgPAsd1Yqs8TR2KWF5-P7eJyOMuFeLOcfLy3ToVGGBnVTvRYZ66WcdveAKMLq27UnYKlNp?width=812&height=1151&cropmode=none" alt="Diagrama de flujo" />

## Microservicios identificados

<a href="https://docs.google.com/document/d/1qqyG-uOsvFvR060i1oSbtIyMUq9gaV-I/edit#">Link de Microservicios</a>

## JWT

JWT
Para asegurar la comunicación de las APIs de nuestros servicios utilizaremos tokens generados por JWT, se utilizará para la autenticación de cada ruta de las APIs, además de se utilizará para el intercambio de información entre los servicios de otros grupos. Todos nuestros servicios tienen el header que incluye el detalle de JWT.

```
{
  "alg": "HS256",
  "typ": "JWT"
}

```

<img src="https://snz04pap002files.storage.live.com/y4mUzmDFBwKk8JcafBt_3zM4qFKC5AfMHfBU2cEp8ScLXkniRyLvW55hYWtHrVBWrgswCWNmAvwIn820RijBl6heJwVFNuClRns1r-ryZNnSGGq79_3LbrJCptKugfYVhRQ9El1KPCuckdHCpsrdaPDUkFj_dPeRloFz4ltuXhWaisMsm5oEZDDHlEmbWVFg3oz?width=602&height=240&cropmode=none" alt="Azure Devops" width="700"/>

