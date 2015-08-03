var path = require('path'),
	config = {
		development: {
			env: 'development',
			port		: 5000,
			session : {
				secret	: 'v3ber4geSh4r3D',
			},
			db: {
				server	: 'alacer.cl0h6qpughas.ap-southeast-1.rds.amazonaws.com',
				database: 'alacer',
				user	: 'alacer',
				password: 'pwdalacer33'
			}
		},
		staging: {
			env: 'staging',
			port		: 5000,
			session : {
				secret	: 'v3ber4geSh4r3D',
			},
			db: {
				server	: 'alacer.cl0h6qpughas.ap-southeast-1.rds.amazonaws.com',
				database: 'alacer',
				user	: 'alacer',
				password: 'pwdalacer33'
			}
		},
		production: {
			env: 'production',
			port		: 5000,
			session : {
				secret	: 'v3ber4geSh4r3D',
			},
			db: {
				server	: 'alacer.cl0h6qpughas.ap-southeast-1.rds.amazonaws.com',
				database: 'alacer',
				user	: 'alacer',
				password: 'pwdalacer33'
			}
		}
	};


// set development as default environment
!process.env['NODE_ENV'] && (process.env['NODE_ENV'] = 'development');
config = config[process.env['NODE_ENV']];

module.exports = config;