import React from 'react';
import PropTypes from 'prop-types';
import {Box, Text} from 'ink';
import figures from 'figures';

const Indicator = ({isSelected, isHighlighted}) => (
	<Box marginRight={1}>
		<Text color={isSelected ? 'green' : isHighlighted ? 'blue' : undefined}>
			{isHighlighted ? figures.pointer : ' '}
		</Text>
	</Box>
);

Indicator.propTypes = {
	isHighlighted: PropTypes.bool
	isSelected: PropTypes.bool
};

Indicator.defaultProps = {
	isHighlighted: false,
	isSelected: false
};

export default Indicator;
