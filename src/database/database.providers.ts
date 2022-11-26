import { Sequelize } from 'sequelize-typescript';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'admin',
        database: 'twitter',
        modelPaths: [__dirname + '/../**/*.entity.js'],
        modelMatch: (filename, member) => {
          return (
            filename.substring(0, filename.indexOf('.entity')) ===
            member.toLowerCase()
          );
        }
      });
      await sequelize.sync();
      return sequelize;
    },
  }
];