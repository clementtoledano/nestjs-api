import { getConnection } from 'typeorm';
import * as bcrypt from 'bcrypt';

export const getDbConnection = async (connectionName = 'default') => {
    return await getConnection(connectionName);
};

export const runDbMigrations = async (connectionName = 'default') => {
    const conn = await getDbConnection(connectionName);
    await conn.runMigrations();
};



export const comparePasswords = async (currentPassword, userPassword) => {
    return await bcrypt.compare(currentPassword, userPassword);
};