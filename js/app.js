const form = document.getElementById('registrar');
const input = form.querySelector('input'); //input inside registrar form
const ul = document.getElementById('invitedList');

const createLI = (text) => {
	const li = document.createElement('li');
	li.textContent = text;

	const label = document.createElement('label');
	label.textContent = 'Confirmed';

	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';

	label.appendChild(checkbox);
	li.appendChild(label);

	const button = document.createElement('button');
	button.textContent = 'remove';
	li.appendChild(button);

	return li;
};

form.addEventListener('submit', (event) => {
	event.preventDefault(); // prevent page from reloading

	const text = input.value;
	input.value = '';

	const li = createLI(text);

	ul.appendChild(li);
});

ul.addEventListener('change', (event) => {
	const checkbox = event.target;
	const checked = checkbox.checked;
	const listItem = checkbox.parentNode.parentNode; //traverse up the dom twice in order to access the li

	checked ? (listItem.className = 'responded') : (listItem.className = '');
});

ul.addEventListener('click', (event) => {
	if (event.target.tagName === 'BUTTON') {
		const li = event.target.parentNode;
		const ul = li.parentNode;
		ul.removeChild(li);
	}
});
