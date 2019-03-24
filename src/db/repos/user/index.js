import pool from '../../pool';

class UserRepo {

  createUser(user) {
    return new Promise((resolve, reject) => {
      const handleError = err => {
        if (err) {
          reject(err);
        }
      };

      pool.connect((err, client, done) => {
        handleError(err);

        client.query('begin', err => {
          handleError(err);

          const sql = `
            insert into usuario (nm_pessoa, ds_email, ds_senha, cn_tipo_usuario)
            values ($1, $2, $3, $4)
          `;
  
          client.query(sql, [user.name, user.email, user.password, user.userType], err => {
            handleError(err);

            client.query('commit', err => {
              handleError(err);

              done();
              resolve();
            })
          })
        })
      });
    });
  }

  getUserLogin(email, password) {
    const sql = 'select * from usuario where ds_email = $1 and ds_senha = $2';

    return new Promise((resolve, reject) => {
      pool.query(sql, [email, password]).then(result => {
        if (result.rowCount == 0) {
          reject();
        } else {
          resolve(result.rows[0]);
        }
      });
    });
  }
}

export const userRepo = new UserRepo();
