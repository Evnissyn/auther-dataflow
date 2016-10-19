
// ***** action ****

const SUCCESSFUL_LOGIN = 'SUCCESSFUL_LOGIN'
// const FAILED_LOGIN = 'FAILED_LOGIN'
const LOGOUT = 'LOGOUT'

const SIGNUP = 'SIGNUP'

// **** action creator ****

const successfulLogin = function (user) {
	return {
		type: SUCCESSFUL_LOGIN,
		user: user
	}
}

const logout = function () {
	return {
		type: LOGOUT
	}
}

const signup = function(user) {
	return {
		type: SIGNUP,
		user
	}
}

// ***** reducer ***********

export default function loginReducer (state = null, action) {
	switch(action.type) {
		case SIGNUP:
			return action.user;
		case SUCCESSFUL_LOGIN:
			return action.user;
		case LOGOUT:
			return null;
		default: return state;
	}
}

// ******* dispatcher ************

export const loginUser = function (loginThing) {
	return function(dispatch, getState) {
		const body = JSON.stringify(loginThing),
		method = 'POST',
		headers = new window.Headers({
			'Content-Type': 'application/json'
		})

		return fetch('/login', {method, body, headers})
			.then(res => res.json())
			.then(user => {
				console.log('USER:',user);
				dispatch(successfulLogin(user))
			})
	}
}

export const signupUser = function (signupThing) {
	return function(dispatch, getState) {
		const body = JSON.stringify(signupThing),
		method = 'POST',
		headers = new window.Headers({
			'Content-Type': 'application/json'
		})

		return fetch('/api/users/', {method, body, headers})
			.then(res => res.json())
			.then(user => {
				console.log('USER:',user);
				dispatch(signup(user))
			})
	}
}