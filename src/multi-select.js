import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';
import arrRotate from 'arr-rotate';
import {Box, StdinContext} from 'ink';
import Indicator from './indicator';
import Item from './item';
import CheckBox from './checkbox';

const ARROW_UP = '\u001B[A';
const ARROW_DOWN = '\u001B[B';
const ENTER = '\r';
const SPACE = ' ';

class MultiSelect extends PureComponent {
	static propTypes = {
		items: PropTypes.array,
		focus: PropTypes.bool,
		initialIndex: PropTypes.number,
		indicatorComponent: PropTypes.func,
		checkboxComponent: PropTypes.func,
		itemComponent: PropTypes.func,
		limit: PropTypes.number,
		onSelect: PropTypes.func,
		onUnselect: PropTypes.func,
		onSubmit: PropTypes.func,
		onHighlight: PropTypes.func
	}

	static defaultProps = {
		items: [],
		focus: true,
		initialIndex: 0,
		indicatorComponent: Indicator,
		checkboxComponent: CheckBox,
		itemComponent: Item,
		limit: null,
		onSelect() {},
		onUnselect() {},
		onSubmit() {},
		onHighlight() {}
	}

	state = {
		rotateIndex: 0,
		highlightedIndex: this.props.initialIndex,
		selected: {}
	}

	render() {
		const {items, indicatorComponent, itemComponent, checkboxComponent} = this.props;
		const {rotateIndex, highlightedIndex, selected} = this.state;
		const {limit, hasLimit} = this;

		const slicedItems = hasLimit ? arrRotate(items, rotateIndex).slice(0, limit) : items;

		return (
			<Box flexDirection="column">
				{slicedItems.map((item, index) => {
					const key = item.key || item.value;
					const isHighlighted = index === highlightedIndex;
					const isSelected = Boolean(selected[key]);

					return (
						<Box key={key}>
							{React.createElement(indicatorComponent, {isHighlighted})}
							{React.createElement(checkboxComponent, {isSelected})}
							{React.createElement(itemComponent, {...item, isHighlighted})}
						</Box>
					);
				})}
			</Box>
		);
	}

	componentDidMount() {
		const {stdin, setRawMode} = this.props; // eslint-disable-line react/prop-types

		setRawMode(true);
		stdin.on('data', this.handleInput);
	}

	componentWillUnmount() {
		const {stdin, setRawMode} = this.props; // eslint-disable-line react/prop-types

		stdin.removeListener('data', this.handleInput);
		setRawMode(false);
	}

	componentDidUpdate(prevProps) {
		if (!isEqual(prevProps.items, this.props.items)) {
			this.setState({ // eslint-disable-line react/no-did-update-set-state
				rotateIndex: 0,
				highlightedIndex: 0
			});
		}
	}

	handleInput = data => {
		const {items, focus, onSelect, onUnselect, onHighlight, onSubmit} = this.props;
		const {rotateIndex, highlightedIndex, selected} = this.state;
		const {limit, hasLimit} = this;

		if (focus === false) {
			return;
		}

		const s = String(data);

		if (s === ARROW_UP || s === 'k') {
			const lastIndex = (hasLimit ? limit : items.length) - 1;
			const atFirstIndex = highlightedIndex === 0;
			const nextIndex = (hasLimit ? highlightedIndex : lastIndex);
			const nextRotateIndex = atFirstIndex ? rotateIndex + 1 : rotateIndex;
			const nextHighlightedIndex = atFirstIndex ? nextIndex : highlightedIndex - 1;

			this.setState({
				rotateIndex: nextRotateIndex,
				highlightedIndex: nextHighlightedIndex
			});

			const slicedItems = hasLimit ? arrRotate(items, nextRotateIndex).slice(0, limit) : items;
			onHighlight(slicedItems[nextHighlightedIndex]);
		}

		if (s === ARROW_DOWN || s === 'j') {
			const atLastIndex = highlightedIndex === (hasLimit ? limit : items.length) - 1;
			const nextIndex = (hasLimit ? highlightedIndex : 0);
			const nextRotateIndex = atLastIndex ? rotateIndex - 1 : rotateIndex;
			const nextHighlightedIndex = atLastIndex ? nextIndex : highlightedIndex + 1;

			this.setState({
				rotateIndex: nextRotateIndex,
				highlightedIndex: nextHighlightedIndex
			});

			const slicedItems = hasLimit ? arrRotate(items, nextRotateIndex).slice(0, limit) : items;
			onHighlight(slicedItems[nextHighlightedIndex]);
		}

		if (s === SPACE || s === 'x') {
			const slicedItems = hasLimit ? arrRotate(items, rotateIndex).slice(0, limit) : items;
			const selectedItem = slicedItems[highlightedIndex];
			const selectedItemKey = selectedItem.key || selectedItem.value;

			(selected[selectedItemKey] ? onUnselect : onSelect)(selectedItem);

			this.setState(state => ({
				selected: {...selected, [selectedItemKey]: !state.selected[selectedItemKey]}
			}));
		}

		if (s === ENTER) {
			onSubmit(items.filter(item => selected[item.key || item.value]));
		}
	}

	get hasLimit() {
		const {limit, items} = this.props;

		return typeof limit === 'number' && items.length > limit;
	}

	get limit() {
		const {limit, items} = this.props;

		if (this.hasLimit) {
			return Math.min(limit, items.length);
		}

		return items.length;
	}
}

export default class MultiSelectWithStdin extends PureComponent {
	render() {
		return (
			<StdinContext.Consumer>
				{({stdin, setRawMode}) => (
					<MultiSelect {...this.props} stdin={stdin} setRawMode={setRawMode}/>
				)}
			</StdinContext.Consumer>
		);
	}
}

export {Indicator, Item, CheckBox};
