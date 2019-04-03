import React from 'react';
import PropTypes from 'prop-types';
import {Box, Color} from 'ink';
import figures from 'figures';

const Indicator = ({isHighlighted}) => (
	<Box marginRight={1}>
		{isHighlighted ? (
			<Color blue>
				{figures.pointer}
			</Color>
		) : ' '}
	</Box>
);

Indicator.propTypes = {
	isHighlighted: PropTypes.bool
};

Indicator.defaultProps = {
	isHighlighted: false
};

export default Indicator;
