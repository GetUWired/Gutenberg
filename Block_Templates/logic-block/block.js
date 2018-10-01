//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType, query } = wp.blocks;

function TestLogic({ category }) {
	if (category === 'option 1') {
		return <p>Option 1 Selected</p>;
	}
	if (category === 'option 2') {
		return <p>Option 2 Selected</p>;
	}
	if (category === 'option 3') {
		return <p>Option 3 Selected</p>;
	}
	if (category === 'option 4') {
		return <p>Option 4 Selected</p>;
	}
	if (category === 'option 5') {
		return <p>Option 5 Selected</p>;
	}
}

registerBlockType('cgb/logic-test', {
	title: __('Logic Test'),
	icon: 'format-image',
	category: 'common',
	keywords: [__('Logic'), __('Test')],
	attributes: {
		category: {
			type: 'string',
			default: 'option 1',
		},
	},
	edit(props) {
		const {
			attributes: { category },
			setAttributes,
		} = props;
		function setCategory(event) {
			const selected = event.target.querySelector('option:checked');
			setAttributes({ category: selected.value });
			event.preventDefault();
		}

		return (
			<div className={props.className}>
				<TestLogic category={category} />
				<form onSubmit={setCategory}>
					<select value={category} onChange={setCategory}>
						<option value="option 1">option 1</option>
						<option value="option 2">option 2</option>
						<option value="option 3">option 3</option>
						<option value="option 4">option 4</option>
						<option value="option 5">option 5</option>
					</select>
				</form>
			</div>
		);
	},
	save(props) {
		const {
			attributes: { category },
		} = props;
		return (
			<div>
				<TestLogic category={category} />
			</div>
		);
	},
});
