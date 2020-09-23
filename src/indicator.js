import React from 'react';
import PropTypes from 'prop-types';
import {Box, Text} from 'ink';
import figures from 'figures';

const Indicator = ({isHighlighted}) => (
	<Box marginRight={1}>
		<Text color={isHighlighted ? 'blue' : undefined}>
			{isHighlighted ? figures.pointer : ' '}
		</Text>
	</Box>
);

Indicator.propTypes = {
	isHighlighted: PropTypes.bool
};

Indicator.defaultProps = {
	isHighlighted: false
};

export default Indicator;
