db.createUser({ user: 'esfiddle', pwd: process.env.MONGO_PASSWORD, roles: [{ role: 'readWrite', db: 'fiddles' }] })
