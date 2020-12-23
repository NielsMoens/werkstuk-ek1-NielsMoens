/**
 * My Products Components
 */

import 'regenerator-runtime/runtime';
import Component from '../lib/components';
import Elements from '../lib/Elements';
import Authentication from '../lib/Authentication';
import User from '../lib/UserRegisterData';

class ExtraData extends Component {
	constructor() {
		super({
			name: 'extraInfo',
			model: {},
			routerPath: '/registerPage/extraInfo/',
		});
	}

	// @TODO render in the right content for the right kind of users: business or visitor 
	render() {
		//  create a home container
		const extrainfoContainer = document.createElement('form');
		extrainfoContainer.setAttribute('method', 'POST');
		extrainfoContainer.appendChild(
			Elements.createHeader({
				textContent: 'HORECONA profileInfo',
			}),
		);

		extrainfoContainer.appendChild(
			Elements.generateInput({
				name: 'firstname',
				id: 'firstname',
				placeholder: 'firstname',
				type: 'text',
			}),
		);

		extrainfoContainer.appendChild(
			Elements.generateInput({
				// @important NAME IS IMPORTANT
				name: 'lastname',
				id: 'lastname',
				placeholder: 'lastname',
				type: 'text',
			}),
		);

		extrainfoContainer.appendChild(
			Elements.generateInput({
				// @important NAME IS IMPORTANT
				name: 'dateofbirth',
				id: 'dateofbirth',
				placeholder: 'lastname',
				type: 'text',
			}),
		);

		extrainfoContainer.appendChild(
			Elements.generateInput({
				// @important NAME IS IMPORTANT
				name: 'phonenum',
				id: 'phonenum',
				placeholder: 'phonenum',
				type: 'number',
			}),
		);

		// create & append button -> store all the data in firestore
		extrainfoContainer.appendChild(
			Elements.createButton({
				textContent: 'Save & Continue',
				onClick: async (event) => {
					event.preventDefault();
					const formData = new FormData(document.querySelector('form'));
					const email = formData.get('email');
					const password = formData.get('password');
					const registerChoice = formData.get('choice');
					const auth = new Authentication({
						email,
						password
					});
					const response = await auth.register(email, password);
					console.log(response)
					if (!response) {
						// @TODO Show error
						return;
					}
					const user = new User('userdata', response.user.uid);
					console.log(user.doc)
					const data = await user.savedata({
						email,
						registerChoice
					})
					console.log(data);

					this.router.navigate('/visitorDashboard/');
				},
			}),
		);
		return extrainfoContainer;
	}
}

export default ExtraData;