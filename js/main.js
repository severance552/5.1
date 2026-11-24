'use strict';

const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');

const STORAGE_KEY = 'gloDelivery';
let login = localStorage.getItem(STORAGE_KEY);

function clearLoginError() {
	loginInput.style.borderColor = '';
	loginInput.classList.remove('input-error');
}

function toggleModalAuth() {
	clearLoginError();
	modalAuth.classList.toggle('is-open');
}

function authorized() {
	function logOut() {
		login = null;
		localStorage.removeItem(STORAGE_KEY);

		buttonAuth.style.display = '';
		userName.style.display = '';
		userName.textContent = '';
		buttonOut.style.display = '';

		buttonOut.removeEventListener('click', logOut);
		logInForm.reset();
		checkAuth();
	}

	userName.textContent = login;
	buttonAuth.style.display = 'none';
	userName.style.display = 'inline';
	buttonOut.style.display = 'flex';

	buttonOut.addEventListener('click', logOut);
}

function notAuthorized() {
	function logIn(event) {
		event.preventDefault();

		if (loginInput.value.trim()) {
			login = loginInput.value.trim();
			localStorage.setItem(STORAGE_KEY, login);

			toggleModalAuth();

			buttonAuth.removeEventListener('click', toggleModalAuth);
			closeAuth.removeEventListener('click', toggleModalAuth);
			logInForm.removeEventListener('submit', logIn);
			loginInput.removeEventListener('input', clearLoginError);

			logInForm.reset();
			checkAuth();
		} else {
			loginInput.style.borderColor = '#ff0000';
			loginInput.classList.add('input-error');
			loginInput.focus();
		}
	}

	buttonAuth.addEventListener('click', toggleModalAuth);
	closeAuth.addEventListener('click', toggleModalAuth);
	logInForm.addEventListener('submit', logIn);
	loginInput.addEventListener('input', clearLoginError);
}

function checkAuth() {
	if (login) {
		authorized();
	} else {
		notAuthorized();
	}
}

checkAuth();
