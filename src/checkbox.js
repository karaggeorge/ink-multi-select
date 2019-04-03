import React from 'react';
import PropTypes from 'prop-types';
import {Box, Color} from 'ink';
import figures from 'figures';

const CheckBox = ({isSelected}) => (
	<Box marginRight={1}>
		<Color green>{isSelected ? figures.circleFilled : figures.circle}</Color>
	</Box>
);

CheckBox.propTypes = {
	isSelected: PropTypes.bool
};

CheckBox.defaultProps = {
	isSelected: false
};

export default CheckBox;
