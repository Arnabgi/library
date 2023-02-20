# Library Server
A Node JS server for the library management system

## Version
Node JS 18LTS<br/>
MySQL 8.0

## Package
<ul>
    <li>
        Express JS 4.18.2
    </li>
    <li>
        Bcrypt 5.1.0
    </li>
    <li>
        cors 2.8.5
    </li>
    <li>
        dotenv 16.0.3
    </li>
    <li>
        jsonwebtoken 9.0.0
    </li>
    <li>
        mysql2 3.1.2
    </li>
    <li>
        sequelize 6.28.0
    </li>
    <li>Dev Dependencies</li>
    <li>sequelize-cli 6.6.0</li>
</ul>

### Scripts
Run the following scripts to initialize and start the server
```bash
npm install
```

```bash
sequelize-cli db:migrate
```

```bash
npm start
```

### ENV Variables
```bash
#Define port number
PORT=
#Database Details
DB_HOST=
DB_USER=
DB_PWD=
DB_NAME=
DB_DIALECT=
#JWT Secret Key
JWT_SECRET_KEY=YOUR_SECRET_KEY
```

