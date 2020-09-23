import React from 'react';
import PropTypes from 'prop-types';
import {Box, Text} from 'ink';
import figures from 'figures';

const CheckBox = ({isSelected}) => (
	<Box marginRight={1}>
		<Text color="green">{isSelected ? figures.circleFilled : figures.circle}</Text>
	</Box>
);

CheckBox.propTypes = {
	isSelected: PropTypes.bool
};

CheckBox.defaultProps = {
	isSelected: false
};

export default CheckBox;
