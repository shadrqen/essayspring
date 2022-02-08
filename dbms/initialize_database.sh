node database/drop_schemas.js
node database/create_schemas.js
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
