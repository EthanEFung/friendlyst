import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Nav from './Nav.jsx';
import Auth from '../Auth/Auth';
import { Link, withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const path = require('path');
const envPath = path.resolve(__dirname, '../../.env');
const auth = new Auth();

class LandingPage extends Component {

	authlogin(email, password, callback) {
		var conString = "postgres://worejegx:sg-68kIGZY0dCwlgu4qBE7WUi8zHusrK@babar.elephantsql.com:5432/worejegx";
		postgres(conString, function (err, client, done) {
			if (err) {
				console.log('could not connect to postgres db', err);
				return callback(err);
			}

			var query = 'SELECT id, nickname, email, password ' +
				'FROM users WHERE email = $1';

			client.query(query, [email], function (err, result) {
				// NOTE: always call `done()` here to close
				// the connection to the database
				done();

				if (err) {
					console.log('error executing query', err);
					return callback(err);
				}

				if (result.rows.length === 0) {
					return callback(new WrongUsernameOrPasswordError(email));
				}

				var user = result.rows[0];

				bcrypt.compare(password, user.password, function (err, isValid) {
					if (err) {
						callback(err);
					} else if (!isValid) {
						callback(new WrongUsernameOrPasswordError(email));
					} else {
						callback(null, {
							id: user.id,
							nickname: user.nickname,
							email: user.email
						});
					}
				});
			});
		});
	}

	authcreate(user, callback) {
		var conString = 'postgres://worejegx:sg-68kIGZY0dCwlgu4qBE7WUi8zHusrK@babar.elephantsql.com:5432/worejegx';
		postgres(conString, function (err, client, done) {
			if (err) {
				console.log('could not connect to postgres db', err);
				return callback(err);
			}
			bcrypt.hash(user.password, 10, function (err, hashedPassword) {
				var query = 'INSERT INTO users(email, password) VALUES ($1, $2)';
				client.query(query, [user.email, hashedPassword], function (err, result) {
					// NOTE: always call `done()` here to close
					// the connection to the database
					done();
					if (err) {
						console.log('error executing query', err);
						return callback(err);
					}
					if (result.rows.length === 0) {
						return callback();
					}
					callback(null);
				});
			});
		});
	}

	login() {
		auth.login()
	}

	render() {
		return (
			<div className="landing-page-container">
				<div className="background-image"></div>
				<div className="content">
					<img className="resize" src="friendlystlogo.jpg" />
					<div className="login-button-container">
						<Button bsStyle="link" onClick={this.login}>Login / Sign Up</Button>
					</div>
				</div>
			</div>
		)
	}
}

export default LandingPage