/**
 * BLOCK: guw-blocks
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const classnames = require( 'classnames' );
const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

const {
	InspectorControls,
	ColorPalette,
	MediaUpload,
	InnerBlocks,
} = wp.editor;

const {
	PanelBody,
	PanelColor,
	RangeControl,
	SelectControl,
	IconButton,
} = wp.components;

import {backgroundRepeatOptions, backgroundSizeOptions, backgroundAttachmentOptions, backgroundVerticalOptions, backgroundHorizontalOptions } from '../helpers/background-styles';

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
registerBlockType( 'guw-blocks/container', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: 'Container', // Block title.
	icon: 'layout', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'layout', // Block category — Group blocks together based on common traits E.g. common, formatting, layout, widgets, embed.
	keywords: [ __( 'guw-blocks — Container' ), __( 'Container' ), __( 'GUW' ) ],
	attributes: {
		containerPaddingTop: {
			type: 'number',
			default: 0,
		},
		containerPaddingRight: {
			type: 'number',
			default: 0,
		},
		containerPaddingBottom: {
			type: 'number',
			default: 0,
		},
		containerPaddingLeft: {
			type: 'number',
			default: 0,
		},
		containerMarginTop: {
			type: 'number',
			default: 0,
		},
		containerMarginBottom: {
			type: 'number',
			default: 0,
		},
		containerWidth: {
			type: 'string',
			default: 'center',
		},
		containerMaxWidth: {
			type: 'number',
			default: 100,
		},
		containerBackgroundColor: {
			type: 'string',
			default: '#fff',
		},
		containerImgURL: {
			type: 'string',
			default: '',
		},
		containerImgID: {
			type: 'number',
		},
		containerImgAlt: {
			type: 'string',
			default: '',
		},
		containerBackgroundRepeat: {
			type: 'string',
			default: 'repeat',
		},
		containerBackgroundSize: {
			type: 'string',
			default: 'auto',
		},
		containerBackgroundAttachment: {
			type: 'string',
			default: 'scroll',
		},
		containerBackgroundVertical: {
			type: 'string',
			default: 'center',
		},
		containerBackgroundHorizontal: {
			type: 'string',
			default: 'center',
		},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {object} props The properties for the block
	 * @returns {object} The html element for the block
	 */
	edit: function( props ) {
		// Creates a <p class='wp-block-cgb-block-guw-blocks'></p>.
		const { containerPaddingTop, containerPaddingRight, containerPaddingBottom, containerPaddingLeft, containerMarginTop, containerMarginBottom, containerMaxWidth, containerBackgroundColor, containerImgURL, containerImgID, containerBackgroundRepeat, containerBackgroundSize, containerBackgroundVertical, containerBackgroundHorizontal, containerBackgroundAttachment } = props.attributes;

		const onSelectImage = img => {
			props.setAttributes( {
				containerImgID: img.id,
				containerImgURL: img.url,
				containerImgAlt: img.alt,
			} );
		};

		const onRemoveImage = () => {
			props.setAttributes( {
				containerImgID: null,
				containerImgURL: null,
				containerImgAlt: null,
			} );
		};
		/*eslint-disable*/
		return ( [
			<InspectorControls key="inspector">
				<PanelBody title={ __( 'Container Options' ) } initialOpen={ true }>
					<RangeControl
						label={ __( 'Padding Top (%)' ) }
						value={ containerPaddingTop }
						onChange={ ( value ) => props.setAttributes( { containerPaddingTop: value } ) }
						min={ 0 }
						max={ 20 }
						step={ .5 }
					/>

					<RangeControl
						label={ __( 'Padding Bottom (%)' ) }
						value={ containerPaddingBottom }
						onChange={ ( value ) => props.setAttributes( { containerPaddingBottom: value } ) }
						min={ 0 }
						max={ 20 }
						step={ .5 }
					/>

					<RangeControl
						label={ __( 'Padding Left (%)' ) }
						value={ containerPaddingLeft }
						onChange={ ( value ) => props.setAttributes( { containerPaddingLeft: value } ) }
						min={ 0 }
						max={ 20 }
						step={ .5 }
					/>

					<RangeControl
						label={ __( 'Padding Right (%)' ) }
						value={ containerPaddingRight }
						onChange={ ( value ) => props.setAttributes( { containerPaddingRight: value } ) }
						min={ 0 }
						max={ 20 }
						step={ .5 }
					/>

					<RangeControl
						label={ __( 'Margin Top (%)' ) }
						value={ containerMarginTop }
						onChange={ ( value ) => props.setAttributes( { containerMarginTop: value } ) }
						min={ 0 }
						max={ 20 }
						step={ 1 }
					/>

					<RangeControl
						label={ __( 'Margin Bottom (%)' ) }
						value={ containerMarginBottom }
						onChange={ ( value ) => props.setAttributes( { containerMarginBottom: value } ) }
						min={ 0 }
						max={ 20 }
						step={ .5 }
					/>

					<RangeControl
						label={ __( 'Inside Container Max Width (px)' ) }
						value={ containerMaxWidth }
						onChange={ ( value ) => props.setAttributes( { containerMaxWidth: value } ) }
						min={ 10 }
						max={ 100 }
						step={ 1 }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Background Options' ) } initialOpen={ false }>
					<p>{ __( 'Select a background image:' ) }</p>
					<MediaUpload
						onSelect={ onSelectImage }
						type="image"
						value={ containerImgID }
						render={ ( { open } ) => (
							<div>
								<IconButton
									className="ab-container-inspector-media"
									label={ __( 'Edit image' ) }
									icon="format-image"
									onClick={ open }
								>
									{ __( 'Select Image' ) }
								</IconButton>

								{ containerImgURL && !! containerImgURL.length && (
									<IconButton
										className="ab-container-inspector-media"
										label={ __( 'Remove Image' ) }
										icon="dismiss"
										onClick={ onRemoveImage }
									>
										{ __( 'Remove' ) }
									</IconButton>
								) }
							</div>
						) }
					>
					</MediaUpload>

					{ containerImgURL && !! containerImgURL.length && (
					    <div>
						    <SelectControl
								label={ __( 'Background Repeat' ) }
								value={ containerBackgroundRepeat }
								options={ backgroundRepeatOptions.map( ( { value, label } ) => ( {
									value: value,
									label: label,
								} ) ) }
								onChange={ ( value ) => {
									props.setAttributes( { containerBackgroundRepeat: value } );
								} }
							/>
							<SelectControl
							label={ __( 'Background Size' ) }
							value={ containerBackgroundSize }
							options={ backgroundSizeOptions.map( ( { value, label } ) => ( {
									value: value,
									label: label,
								} ) ) }
							onChange={ ( value ) => {
									props.setAttributes( { containerBackgroundSize: value } );
								} }
							/>
							<SelectControl
							label={ __( 'Background Attachment' ) }
							value={ containerBackgroundAttachment }
							options={ backgroundAttachmentOptions.map( ( { value, label } ) => ( {
									value: value,
									label: label,
								} ) ) }
							onChange={ ( value ) => {
									props.setAttributes( { containerBackgroundAttachment: value } );
								} }
							/>
							<SelectControl
							label={ __( 'Background Horizontal Position' ) }
							value={ containerBackgroundHorizontal }
							options={ backgroundHorizontalOptions.map( ( { value, label } ) => ( {
									value: value,
									label: label,
								} ) ) }
							onChange={ ( value ) => {
									props.setAttributes( { containerBackgroundHorizontal: value } );
								} }
							/>

						    <SelectControl
								label={ __( 'Background Vertical Position' ) }
								value={ containerBackgroundVertical }
								options={ backgroundVerticalOptions.map( ( { value, label } ) => ( {
									value: value,
									label: label,
								} ) ) }
								onChange={ ( value ) => {
									props.setAttributes( { containerBackgroundVertical: value } );
								} }
							/>
						</div>
					) }

					<PanelColor
						title={ __( 'Background Color' ) }
						colorValue={ containerBackgroundColor }
						initialOpen={ false }
					>
						<ColorPalette
							label={ __( 'Background Color' ) }
							value={ containerBackgroundColor }
							onChange={ ( value ) => props.setAttributes( { containerBackgroundColor: value } ) }
						/>
					</PanelColor>
				</PanelBody>
			</InspectorControls>,
			<div style={ {
				backgroundColor: containerBackgroundColor,
				paddingLeft: `${ containerPaddingLeft }%`,
				paddingRight: `${ containerPaddingRight }%`,
				paddingBottom: `${ containerPaddingBottom }%`,
				paddingTop: `${ containerPaddingTop }%`,
				marginTop: `${ containerMarginTop }%`,
				marginBottom: `${ containerMarginBottom }%`,
				maxWidth: `${ containerMaxWidth }%`,
				width: '100%',
				backgroundImage: `url('${ containerImgURL }')`,
				backgroundRepeat: `${ containerBackgroundRepeat }`,
				backgroundSize: `${ containerBackgroundSize }`,
				backgroundAttachment: `${ containerBackgroundAttachment }`,
				backgroundPosition: `${ containerBackgroundHorizontal }, ${ containerBackgroundVertical }`,
			} }
				className={ classnames(
				props.className,
				'guw-block-container',
			) }>
				<InnerBlocks />
			</div>,
		]
        /*eslint-enable*/
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {object} props The properties for the block
     * @returns {object} The html element for the block
	 */
	save: function( props ) {
		const { containerPaddingTop, containerPaddingRight, containerPaddingBottom, containerPaddingLeft, containerMarginTop, containerMarginBottom, containerMaxWidth, containerBackgroundColor, containerImgURL, containerBackgroundRepeat, containerBackgroundSize, containerBackgroundHorizontal, containerBackgroundVertical, containerBackgroundAttachment } = props.attributes;
		/*eslint-disable*/
		return (
			<div style={ {
				backgroundColor: containerBackgroundColor,
				paddingLeft: `${ containerPaddingLeft }%`,
				paddingRight: `${ containerPaddingRight }%`,
				paddingBottom: `${ containerPaddingBottom }%`,
				paddingTop: `${ containerPaddingTop }%`,
				marginTop: `${ containerMarginTop }%`,
				marginBottom: `${ containerMarginBottom }%`,
				maxWidth: `${ containerMaxWidth }%`,
				width: '100%',
				backgroundImage: `url('${ containerImgURL }')`,
				backgroundRepeat: `${ containerBackgroundRepeat }`,
				backgroundSize: `${ containerBackgroundSize }`,
				backgroundAttachment: `${ containerBackgroundAttachment }`,
				backgroundPosition: `${ containerBackgroundHorizontal }, ${ containerBackgroundVertical }`,
			} }
				className={ classnames(
				props.className,
				'guw-block-container',
			) }>
				<InnerBlocks.Content />
			</div>
		);
        /*eslint-enable*/
	},
} );
