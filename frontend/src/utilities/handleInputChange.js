export function handleInputChange(e, key, setState)
{
	const { type, value, checked } = e.target;
	let updatedValue = type === 'checkbox' ? checked : value;

	setState(prevState => ({
		...prevState,
		[key]: updatedValue
	}));
}
