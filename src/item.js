import React from 'react';
import PropTypes from 'prop-types';
import {Color} from 'ink';

const Item = ({isHighlighted, label}) => (
	<Color blue={isHighlighted}>
		{label}
	</Color>
);

Item.propTypes = {
	isHighlighted: PropTypes.bool,
	label: PropTypes.string.isRequired
};

Item.defaultProps = {
	isHighlighted: false
};

export default Item;
