/**
 * BLOCK: lasik-lp
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const {PlainText, MediaUpload} = wp.editor;
const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks


/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/block-lasik-lp-button-row', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'LASIK LP Button Row' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'lasik-lp' ),
	],
	attributes: {
		button_1_Text: {
			source: 'text',
			selector: '.button1'
		},
		button_1_URL: {
			attribute: 'href',
			selector: '.button1'
		},
		button_2_Text: {
			source: 'text',
			selector: '.button2'
		},
		button_2_URL: {
			attribute: 'href',
			selector: '.button2'
		},
		button_3_Text: {
			source: 'text',
			selector: '.button3'
		},
		button_3_URL: {
			attribute: 'href',
			selector: '.button3'
		},
		

	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit({attributes, setAttributes}) {
		return (
			
			<div>
				<PlainText onChange={ content => setAttributes({button_1_Text: content})} value={attributes.button_1_Text} placeholder="Button 1 Text" className="button1" />
				<PlainText onChange={ content => setAttributes({button_1_URL: content})} value={attributes.button_1_URL} placeholder="Button 1 URL" className="button1" />
				<PlainText onChange={ content => setAttributes({button_2_Text: content})} value={attributes.button_2_Text} placeholder="Button 2 Text" className="button2" />
				<PlainText onChange={ content => setAttributes({button_2_URL: content})} value={attributes.button_2_URL} placeholder="Button 2 URL" className="button2" />
				<PlainText onChange={ content => setAttributes({button_3_Text: content})} value={attributes.button_3_Text} placeholder="Button 3 Text" className="button3" />
				<PlainText onChange={ content => setAttributes({button_3_URL: content})} value={attributes.button_3_URL} placeholder="Button 3 URL" className="button3" />
						
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save( {attributes} ) {
		return (
                <div class="sak-content-buttons">
                        <a class="sak-button button1" href={attributes.button_1_URL}>{attributes.button_1_Text}</a>
                        <a class="sak-button button2" href={attributes.button_2_URL}>{attributes.button_2_Text}</a>
                        <a class="sak-button button3" href={attributes.button_3_URL}>{attributes.button_3_Text}</a>
                </div>
		);
	},
} );
