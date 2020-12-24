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
const { Button } = wp.components;

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
registerBlockType( 'cgb/block-lasik-lp-header', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'LASIK LP Header' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'lasik-lp' ),
	],
	attributes: {
		siteURL: {
			attribute: 'href',
			selector: '.home_link'
		},
		logoURL: {
			attribute: "src",
			selector: ".home_logo"
		},
		logoAlt: {
			attribute: "alt",
			selector: ".home_logo"
		},
		phoneNumberText:{
			source: "text",
			selector: ".sak-header-call .sak-button"
		},
		phoneNumberLink:{
			attribute: "href",
			selector: ".sak-header-call .sak-button"
		}
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
		const getImageButton = openEvent => {
			if (attributes.logoURL) {
				return <img src={attributes.logoURL} onClick={openEvent} className="" />;
			}
			return (
				<div className="button-container">
					<Button onClick={openEvent} className="button button-large">
						Pick an image
					</Button>
				</div>
			);
		};

		return (
			
			<div className="sak-header">
				<div className="sak-header-logo">
					<PlainText onChange={ content => setAttributes({siteURL: content})} value={attributes.siteURL} placeholder="Home URL" className="sak home_link" />
						<MediaUpload
							onSelect={media => {
								setAttributes({ logoAlt: media.alt, logoURL: media.url });
							}}
							allowedTypes= {["image"]}
							value={attributes.imageID}
							render={({ open }) => getImageButton(open)}
							className="sak home_logo"
						/>
				</div>
				<div className="sak-header-call">
					<PlainText onChange={ content => setAttributes({phoneNumberText: content})} value={attributes.phoneNumberText} placeholder="Phone Text" />	
					<PlainText onChange={ content => setAttributes({phoneNumberLink: content})} value={attributes.phoneNumberLink} placeholder="Phone Link" />	
				</div>
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
			<div className="sak-header">
				<div className="sak-header-logo">
					<a className="sak home_link" href={attributes.siteURL}>
						<img className="sak home_logo" src={attributes.logoURL} alt={attributes.logoAlt} />
					</a>
				</div>
				<div className="sak-header-call">
                    <a className="sak-button" href={attributes.phoneNumberLink}>{attributes.phoneNumberText}<i></i></a>
                </div>
			</div>	
		);
	},
} );
