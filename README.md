# Copper Bites

![unit: Departamento de Ingeniería de Sistemas y Computación](https://img.shields.io/badge/course-Departamento%20de%20Ingenier%C3%ADa%20de%20Sistemas%20y%20Computaci%C3%B3n-blue?logo=coursera)
![institution: Universidad Católica del Norte](https://img.shields.io/badge/institution-Universidad%20Cat%C3%B3lica%20del%20Norte-blue?logo=google-scholar)

## Descripción

Proyecto en clases para mostrar el menu y realizar pedidos en un Restaurant.

## Comandos a realizar

* Inicializar NodeJs:

```
    npm init -y
```

* Dependencias a instalar:

```
    npm install express express-validator cors sequelize sequelize-cli sqlite3 bcryptjs jsonwebtoken
```

* Dependencia de desarrollo:

```
    npm install --save-dev morgan
```

* Crear carpeta routes e integrar las rutas para acceder a la información

* Crear dentro del proyecto un archivo .sequelizerc

* Correr el comando para crear config, models, migrations and seeders a modo de ORM.

```
    npx sequelize init 
```

* Correr el comando para crear las migraciones:
```
    npx sequelize-cli migration:generate --name <nombre creacion de tabla ej: create-user>
```

* Para correr el proyecto

```
    npm run dev
```

## Credits

- [José Benítez Rojas](https://github.com/zeosjb), [Departamento de Ingeniería de Sistemas y Computación](http://www.disc.ucn.cl), [Universidad Católica del Norte](http://wwww.ucn.cl),
  Antofagasta, Chile.

## License

 <p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/zeosjb/CopperBitesSqlite">Copper Bites</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/zeosjb">José Benítez</a> is licensed under <a href="https://creativecommons.org/licenses/by-nc/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC BY-NC 4.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1" alt=""></a></p> 
