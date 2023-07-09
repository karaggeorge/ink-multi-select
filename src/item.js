import React from 'react';
import PropTypes from 'prop-types';
import {Text} from 'ink';

const Item = ({isHighlighted, isSelected, label}) => (
	<Text color={isSelected ? 'green' : isHighlighted ? 'blue' : undefined}>
		{label}
	</Text>
);

Item.propTypes = {
	isHighlighted: PropTypes.bool,
	isSelected: PropTypes.bool,
	label: PropTypes.string.isRequired
};

Item.defaultProps = {
	isHighlighted: false,
	isSelected: false
};

export default Item;
