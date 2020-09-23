import React from 'react';
import PropTypes from 'prop-types';
import {Text} from 'ink';

const Item = ({isHighlighted, label}) => (
	<Text color={isHighlighted ? 'blue' : undefined}>
		{label}
	</Text>
);

Item.propTypes = {
	isHighlighted: PropTypes.bool,
	label: PropTypes.string.isRequired
};

Item.defaultProps = {
	isHighlighted: false
};

export default Item;
