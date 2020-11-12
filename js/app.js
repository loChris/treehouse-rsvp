document.addEventListener('DOMContentLoaded', (event) => {
	const form = document.getElementById('registrar');
	const input = form.querySelector('input'); //input inside registrar form
	const mainDiv = document.querySelector('.main');
	const ul = document.getElementById('invitedList');
	const div = document.createElement('div');
	const filterLabel = document.createElement('label');
	const filterCheckbox = document.createElement('input');

	filterLabel.textContent = `Hid those who haven't responded`;
	filterCheckbox.type = 'checkbox';
	div.appendChild(filterLabel);
	div.appendChild(filterCheckbox);
	mainDiv.insertBefore(div, ul);

	filterCheckbox.addEventListener('change', (event) => {
		const isChecked = event.target.checked;
		const lis = ul.children; //provides a reference to all the elements children

		if (isChecked) {
			for (let i = 0; i < lis.length; ++i) {
				let li = lis[i];
				if (li.className === 'responded') {
					li.style.display = '';
				} else {
					li.style.display = 'none';
				}
			}
		} else {
			for (let i = 0; i < lis.length; ++i) {
				let li = lis[i];
				li.style.display = '';
			}
		}
	});

	const createLI = (text) => {
		const createElement = (elementName, property, value) => {
			const element = document.createElement(elementName);
			element[property] = value;

			return element;
		};

		const appendToLi = (elementName, property, value) => {
			const element = createElement(elementName, property, value);
			li.appendChild(element);

			return element;
		};

		const li = document.createElement('li');

		appendToLi('span', 'textContent', text);

		appendToLi('label', 'textContent', 'Confirmed').appendChild(
			createElement('input', 'type', 'checkbox')
		);

		appendToLi('button', 'textContent', 'edit');

		appendToLi('button', 'textContent', 'remove');

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

		checked
			? (listItem.className = 'responded')
			: (listItem.className = '');
	});

	//delete, edit or save
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
});
