import pool from '../../pool';

class UserRepo {

  createUser(user) {
    return new Promise(resolve => {
      pool.connect((err, client, done) => {
        client.query('begin', () => {
          const sql = `
            insert into usuario (nm_pessoa, ds_email, ds_senha, cn_tipo_usuario)
            values ($1, $2, $3, $4)
          `;
  
          client.query(sql, [user.name, user.email, user.password, user.userType], (err) => {
            client.query('commit', () => {
              done();
              resolve();
            })
          })
        })
      });
    });
  }

  getUserByEmail(email) {
    return pool.query('select * from usuario where email = $1', [email]).finally(() => {
      pool.end();
    });
  }
}

export const userRepo = new UserRepo();
