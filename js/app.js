const form = document.getElementById('registrar');
const input = form.querySelector('input'); //input inside registrar form
const ul = document.getElementById('invitedList');

const createLI = (text) => {
	const li = document.createElement('li');
	const span = document.createElement('span');
	span.textContent = text;
	li.appendChild(span);

	const label = document.createElement('label');
	label.textContent = 'Confirmed';

	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';

	label.appendChild(checkbox);
	li.appendChild(label);

	const editButton = document.createElement('button');
	editButton.textContent = 'edit';
	li.appendChild(editButton);

	const removeButton = document.createElement('button');
	removeButton.textContent = 'remove';
	li.appendChild(removeButton);

	return li;
};

form.addEventListener('submit', (event) => {
	event.preventDefault(); // prevent page from reloading

	const text = input.value;
	input.value = '';

	const li = createLI(text);

	ul.appendChild(li);
});

//checkbox change style
ul.addEventListener('change', (event) => {
	const checkbox = event.target;
	const checked = checkbox.checked;
	const listItem = checkbox.parentNode.parentNode; //traverse up the dom twice in order to access the li

	checked ? (listItem.className = 'responded') : (listItem.className = '');
});

//delete or edit
ul.addEventListener('click', (event) => {
	if (event.target.tagName === 'BUTTON') {
		const button = event.target;
		const li = button.parentNode;
		const ul = li.parentNode;

		if (button.textContent === 'remove') {
			ul.removeChild(li);
		} else if (button.textContent === 'edit') {
			const span = li.firstElementChild;
			const input = document.createElement('input');

			input.type = 'text';
			input.value = span.textContent;
			li.insertBefore(input, span);
			li.removeChild(span);
			button.textContent = 'save';
		} else if (button.textContent === 'save') {
			const input = li.firstElementChild;
			const span = document.createElement('span');

			span.textContent = input.value;
			li.insertBefore(span, input);
			li.removeChild(input);
			button.textContent = 'edit';
		}
	}
});
