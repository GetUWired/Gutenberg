/**
 * BLOCK: guw-blocks
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */
const { RichText, MediaUpload, PlainText } = wp.editor;


//  Import CSS.
import './style.scss';
import './editor.scss';

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
registerBlockType( 'guw-blocks/testimonial', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Testimonial' ), // Block title.
	icon: 'format-quote', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'formatting', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Testimonial' ),
		__( 'Quote' ),
		__( 'GUW' ),
	],
	attributes: {
        body: {
            type: 'array',
            source: 'children',
            selector: '.testimonial__body',
        },
        imageAlt: {
            attribute: 'alt',
            selector: '.testimonial__image',
        },
        imageUrl: {
            attribute: 'src',
            selector: '.testimonial__imageUrl',
        },
        imageClass: {
            attribute: 'class',
            selector: '.testimonail__image',
        },
        testimonialName: {
            source: 'text',
            selector: '.testimonial__name',
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
	edit: function( props ) {
		// Creates a <p class='wp-block-cgb-block-guw-blocks'></p>.
        const getImageButton = openEvent => {
            if ( props.attributes.imageUrl ) {
                return <img src={ props.attributes.imageUrl } onClick={ openEvent } className="image" />;
            }
            return (
                <div className="button-container">
					<Button onClick={ openEvent } className="button button-large">
						Pick an image
					</Button>
				</div>
        	);
        };
		return (
			<div className={ props.className }>
                <div class="image-wrapper">
                    <MediaUpload
                        onSelect={ media => {
                            props.setAttributes( { imageAlt: media.alt, imageUrl: media.url } );
                        } }
                        type="image"
                        value={ props.attributes.imageID }
                        render={ ( { open } ) => getImageButton( open ) }
                    />
                </div>
                <div class="testimonial-content">
                    <RichText
                        onChange={ content => props.setAttributes( { body: content } ) }
                        value={ props.attributes.body }
                        multiline="p"
                        placeholder="Testimonial Content"
                        // formattingControls={ [ 'bold', 'italic', 'underline' ] }
                        isSelected={ props.attributes.isSelected }
                    />
                    <PlainText
                        onChange={ content => props.setAttributes( { testimonialName: content } ) }
                        value={ props.attributes.testimonialName }
                        placeholder="Name"
                        className="testimonial-name"
                    />
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
	save: function( props ) {
        const testimonialImage = ( src, alt ) => {
            if ( ! src ) {
                return null;
            }

            if ( alt ) {
                return <img className="image" src={ src } alt={ alt } />;
            }

            // No alt set, so let's hide it from screen readers
            return <img className="image" src={ src } alt="" aria-hidden="true" />;
        };

        return (
            <div className={ props.className }>
                <div className="image-wrapper">
                    { testimonialImage( props.attributes.imageUrl, props.attributes.imageAlt ) }
                </div>
                <div className="testimonial-content">
                    <div className="testimonial__body">{ props.attributes.body }</div>
                    <div className="testimonial__name">{ props.attributes.testimonialName }</div>
                </div>
			</div>
		);
	},
} );
