import { getConnection } from 'typeorm';

export const getDbConnection = async (connectionName = 'default') => {
    return await getConnection(connectionName);
};

export const runDbMigrations = async (connectionName = 'default') => {
    const conn = await getDbConnection(connectionName);
    await conn.runMigrations();
};

// deux premiers chiffres du code naf
export const DIVISION_NAF_ACCEPTED = [52, 56];
