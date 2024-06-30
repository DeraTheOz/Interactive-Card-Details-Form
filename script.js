'use strict';

// Elements
const form = document.querySelector('.form');
const cardName = document.querySelector('.card__name');
const cardNumber = document.querySelector('.card__number');
const cardExpiryDate = document.querySelector('.card__expiry--date');
const cardCvc = document.querySelector('.card__cvc');
const formButton = document.querySelector('.button');
const btnHidden = document.querySelector('.btn-hidden');

// success modal
const hiddenModal = document.querySelector('.hidden');

// Input fields
const cardNameInput = document.getElementById('cardholder-name');
const cardNumberInput = document.getElementById('card-number-input');
const cardExpiryMonthInput = document.getElementById('card-expiry-month');
const cardExpiryYearInput = document.getElementById('card-expiry-year');
const cardCvcInput = document.getElementById('cvc-number');

// Error classes
const cardNameError = document.querySelector('.cardholder-error');
const cardNumberError = document.querySelector('.cardnumber-error');
const cardExpiryMonthError = document.querySelector('.month-error');
const cardExpiryYearError = document.querySelector('.year-error');
const cardCvcError = document.querySelector('.cvc-error');

/////////////////////////////////////////////
const regex = {
	name: /^[a-z ,.'-]+$/i,
	nonDigit: /\D/,
	emptySpace: /\s/g,
	formattedValue: /.{1,4}/g,
	hasThreeDigits: /^\d{3}$/
};

/////////////////////////////////////////////
// FUNCTIONS
/////////////////////////////////////////////
// Check if name contains number
const checkForNumber = function () {
	for (let input of cardNameInput.value.trim()) {
		if (input.charCodeAt(0) >= 48 && input.charCodeAt(0) <= 57) {
			if (cardNameInput) {
				cardNameError.textContent = 'Name cannot contain numbers';
				return;
			}
		}
	}
};

////////////////////////////////////////////
// Validate credit card name
const validateCardName = function () {
	const name = cardNameInput.value.trim();
	const fullName = name.split(' ');

	if (!name.match(regex.name)) {
		cardNameInput.classList.add('form__input-error');
		cardNameInput.classList.add('placeholder-color');
		cardNameError.classList.add('error');
		checkForNumber();
		return false;
	} else if (name.length < 2) {
		cardNameInput.classList.add('form__input-error');
		cardNameInput.classList.add('placeholder-color');
		cardNameError.classList.add('error');
		cardNameError.textContent = 'Enter at least 2 characters';
		checkForNumber();
	} else if (
		fullName.length !== 2 ||
		!fullName[0].match(regex.name) ||
		!fullName[1].match(regex.name)
	) {
		cardNameInput.classList.add('form__input-error');
		cardNameInput.classList.add('placeholder-color');
		cardNameError.classList.add('error');
		cardNameError.textContent = 'First and lastname is required';
		checkForNumber();
	} else {
		cardNameInput.classList.remove('form__input-error');
		cardNameInput.classList.remove('placeholder-color');
		cardNameError.classList.remove('error');
	}

	cardName.textContent = name;
	return;
};

//////////////////////////////////////////
// Validate credit card number
const defaultCardNumber = '0000 0000 0000 0000';
const validateCardNumber = function () {
	let inputValue = cardNumberInput.value;

	// Remove all empty spaces
	let digitsOnly = inputValue.replace(regex.emptySpace, '');

	// check if card number contains non digits
	if (regex.nonDigit.test(digitsOnly)) {
		cardNumberInput.classList.add('form__input-error');
		cardNumberError.classList.add('error');
		cardNumberError.textContent = 'Wrong format, numbers only';
		return false;
	}

	// Add space every 4 digits
	const newInputValue =
		digitsOnly.match(regex.formattedValue)?.join(' ') || '';

	// Update the input field with the formatted value
	cardNumber.value = newInputValue;

	// Update the card number display
	cardNumber.textContent = newInputValue || defaultCardNumber;

	//////////////////////////////////
	// check if length is exactly 16 digits
	if (digitsOnly.length === 16) {
		cardNumberInput.classList.remove('form__input-error');
		cardNumberError.classList.remove('error');
		return true;
	} else if (digitsOnly === '') {
		cardNumber.textContent = defaultCardNumber;
		cardNumberInput.classList.add('form__input-error');
		cardNumberError.classList.add('error');
		cardNumberError.textContent = 'Card number cannot be empty';
	} else {
		cardNumberInput.classList.add('form__input-error');
		cardNumberError.classList.add('error');
		cardNumberError.textContent = 'Card number must be 16 digits';
		return false;
	}

	return true;
};

/////////////////////////////////////////////
// Validate credit card cvc
const validateCardCvc = function () {
	const cvc = cardCvcInput.value.replace(regex.emptySpace, '');
	if (!/^\d{3}$/.test(cvc)) {
		cardCvcInput.classList.add('form__input-error');
		cardCvcInput.classList.add('placeholder-color');
		cardCvcError.classList.add('error');
		return false;
	} else {
		cardCvcInput.classList.remove('form__input-error');
		cardCvcInput.classList.remove('placeholder-color');
		cardCvcError.classList.remove('error');
	}

	cardCvc.textContent = cvc;
};

//////////////////////////////////////////////
// Validate credit card expiry date
const validateCardExpiryDate = function () {
	const month = cardExpiryMonthInput.value.trim();
	const year = cardExpiryYearInput.value.trim();

	// get current month
	const currentMonth = new Date().getMonth() + 1;

	// get last two digits of current year
	const currentYear = new Date().getYear() % 100;

	// check if month is two digits and between 1 & 12
	if (!/^\d{2}$/.test(month) || parseInt(month) < 1 || parseInt(month) > 12) {
		cardExpiryMonthInput.classList.add('form__input-error');
		cardExpiryMonthError.classList.add('error');
	} else {
		cardExpiryMonthInput.classList.remove('form__input-error');
		cardExpiryMonthError.classList.remove('error');
	}

	// check if year is two digits and not in the past
	if (!/^\d{2}$/.test(year) || parseInt(year) < currentYear) {
		cardExpiryYearInput.classList.add('form__input-error');
		cardExpiryYearError.classList.add('error');
		return false;
	} else if (
		parseInt(year) === currentYear &&
		parseInt(month) < currentMonth
	) {
		cardExpiryYearInput.classList.add('form__input-error');
		cardExpiryYearError.classList.add('error');
		return false;
	} else {
		cardExpiryYearInput.classList.remove('form__input-error');
		cardExpiryYearError.classList.remove('error');
	}

	cardExpiryDate.textContent = `${month}/${year}`;
	return;
};

////////////////////////////////////////////
// EVENT LISTENERS
////////////////////////////////////////////

// validateCardName
cardNameInput.addEventListener('input', validateCardName);

// validateCardNumber
cardNumberInput.addEventListener('input', validateCardNumber);

// validateCardCvc
cardCvcInput.addEventListener('input', validateCardCvc);

// validateCardExpiryDate
cardExpiryMonthInput.addEventListener('input', validateCardExpiryDate);

cardExpiryYearInput.addEventListener('input', validateCardExpiryDate);

///////////////////////////////////////////
formButton.addEventListener('click', function (e) {
	e.preventDefault();

	const isNameValid = validateCardName();
	const isCardNumberValid = validateCardNumber();
	const isCardExpiryDateValid = validateCardExpiryDate();
	const isCardCvcValid = validateCardCvc();

	const allValid = [
		isNameValid,
		isCardNumberValid,
		isCardExpiryDateValid,
		isCardCvcValid
	].some(input => input === false);

	console.log(allValid);

	if (!allValid) {
		form.reset();
		form.classList.add('form--hidden');
		hiddenModal.classList.add('success');
	}
});

btnHidden.addEventListener('click', function (e) {
	e.preventDefault();
	hiddenModal.classList.remove('success');
	form.classList.remove('form--hidden');
	cardNumber.textContent = defaultCardNumber;
	cardName.textContent = 'Jane Appleseed';
	cardExpiryDate.textContent = '00/00';
	cardCvc.textContent = '000';
});
