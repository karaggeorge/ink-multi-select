import React from 'react';
import {Box, Text} from 'ink';
import {render} from 'ink-testing-library';
import {spy} from 'sinon';
import figures from 'figures';
import test from 'ava';
import MultiSelect, {Indicator, Item, CheckBox} from '.';

const ARROW_UP = '\u001B[A';
const ARROW_DOWN = '\u001B[B';
const ENTER = '\r';

test('indicator', t => {
	const {lastFrame} = render((
		<Box>
			<Indicator/><Text>X</Text>
		</Box>
	));

	t.is(lastFrame(), '  X');
});

test('indicator - highlighted', t => {
	const actual = render(<Indicator isHighlighted/>);
	const expected = render(<Text color="blue">{figures.pointer}</Text>);

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('indicator - selected', t => {
	const actual = render(<Indicator isSelected/>);
	const expected = render(<Text color="green">{figures.pointer}</Text>);

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('checkbox', t => {
	const actual = render(<CheckBox/>);
	const expected = render(<Text color="green">{figures.circle}</Text>);

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('checkbox - selected', t => {
	const actual = render(<CheckBox isSelected/>);
	const expected = render(<Text color="green">{figures.circleFilled}</Text>);

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('item', t => {
	const {lastFrame} = render(<Item label="Test"/>);
	const expected = render(<Text>Test</Text>);

	t.is(lastFrame(), expected.lastFrame());
});

test('item - highlighted', t => {
	const actual = render(<Item isHighlighted label="Test"/>);
	const expected = render(<Text color="blue">Test</Text>);

	t.is(actual.lastFrame(), expected.lastFrame());
});

test("item - selected", (t) => {
	const actual = render(<Item isSelected label="Test" />);
	const expected = render(<Text color="green">Test</Text>);

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list', t => {
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}];

	const actual = render(<MultiSelect items={items}/>);

	const expected = render((
		<Box flexDirection="column">
			<Box>
				<Indicator isHighlighted/>
				<CheckBox/>
				<Item isHighlighted label="First"/>
			</Box>

			<Box>
				<Indicator/>
				<CheckBox/>
				<Item label="Second"/>
			</Box>
		</Box>
	));

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list - initial index', t => {
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}];

	const actual = render(<MultiSelect items={items} initialIndex={1}/>);

	const expected = render((
		<Box flexDirection="column">
			<Box>
				<Indicator/>
				<CheckBox/>
				<Item label="First"/>
			</Box>

			<Box>
				<Indicator isHighlighted/>
				<CheckBox/>
				<Item isHighlighted label="Second"/>
			</Box>
		</Box>
	));

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list - custom indicator', t => {
	const items = [{
		label: 'Test',
		value: 'test'
	}];

	const CustomIndicator = () => <Text>X </Text>;

	const actual = render(<MultiSelect items={items} indicatorComponent={CustomIndicator}/>);

	const expected = render((
		<Box flexDirection="column">
			<Box>
				<CustomIndicator/>
				<CheckBox/>
				<Item isHighlighted label="Test"/>
			</Box>
		</Box>
	));

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list - custom item', t => {
	const items = [{
		label: 'Test',
		value: 'test'
	}];

	const CustomItem = ({label}) => <Text>`- ${label}`</Text>;

	const actual = render(<MultiSelect items={items} itemComponent={CustomItem}/>);

	const expected = render((
		<Box flexDirection="column">
			<Box>
				<Indicator isHighlighted/>
				<CheckBox/>
				<CustomItem label="Test"/>
			</Box>
		</Box>
	));

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list - ignore input if not focused', t => {
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}];

	const actual = render(<MultiSelect focus={false} items={items}/>);
	actual.stdin.write(ARROW_DOWN);

	const expected = render((
		<Box flexDirection="column">
			<Box>
				<Indicator isHighlighted/>
				<CheckBox/>
				<Item isHighlighted label="First"/>
			</Box>

			<Box>
				<Indicator/>
				<CheckBox/>
				<Item label="Second"/>
			</Box>
		</Box>
	));

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list - move up with up arrow key', t => {
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}, {
		label: 'Third',
		value: 'third'
	}];

	const actual = render(<MultiSelect items={items}/>);
	actual.stdin.write(ARROW_UP);

	const expected = render((
		<Box flexDirection="column">
			<Box>
				<Indicator/>
				<CheckBox/>
				<Item label="First"/>
			</Box>

			<Box>
				<Indicator/>
				<CheckBox/>
				<Item label="Second"/>
			</Box>

			<Box>
				<Indicator isHighlighted/>
				<CheckBox/>
				<Item isHighlighted label="Third"/>
			</Box>
		</Box>
	));

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list - move up with K key', t => {
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}, {
		label: 'Third',
		value: 'third'
	}];

	const actual = render(<MultiSelect items={items}/>);
	actual.stdin.write('k');

	const expected = render((
		<Box flexDirection="column">
			<Box>
				<Indicator/>
				<CheckBox/>
				<Item label="First"/>
			</Box>

			<Box>
				<Indicator/>
				<CheckBox/>
				<Item label="Second"/>
			</Box>

			<Box>
				<Indicator isHighlighted/>
				<CheckBox/>
				<Item isHighlighted label="Third"/>
			</Box>
		</Box>
	));

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list - move down with arrow down key', t => {
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}, {
		label: 'Third',
		value: 'third'
	}];

	const actual = render(<MultiSelect items={items}/>);
	actual.stdin.write(ARROW_DOWN);

	const expected = render((
		<Box flexDirection="column">
			<Box>
				<Indicator/>
				<CheckBox/>
				<Item label="First"/>
			</Box>

			<Box>
				<Indicator isHighlighted/>
				<CheckBox/>
				<Item isHighlighted label="Second"/>
			</Box>

			<Box>
				<Indicator/>
				<CheckBox/>
				<Item label="Third"/>
			</Box>
		</Box>
	));

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list - move down with J key', t => {
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}, {
		label: 'Third',
		value: 'third'
	}];

	const actual = render(<MultiSelect items={items}/>);
	actual.stdin.write('j');

	const expected = render((
		<Box flexDirection="column">
			<Box>
				<Indicator/>
				<CheckBox/>
				<Item label="First"/>
			</Box>

			<Box>
				<Indicator isHighlighted/>
				<CheckBox/>
				<Item isHighlighted label="Second"/>
			</Box>

			<Box>
				<Indicator/>
				<CheckBox/>
				<Item label="Third"/>
			</Box>
		</Box>
	));

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list - move to the beginning of the list after reaching the end', t => {
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}, {
		label: 'Third',
		value: 'third'
	}];

	const actual = render(<MultiSelect items={items}/>);
	actual.stdin.write(ARROW_DOWN);
	actual.stdin.write(ARROW_DOWN);
	actual.stdin.write(ARROW_DOWN);

	const expected = render((
		<Box flexDirection="column">
			<Box>
				<Indicator isHighlighted/>
				<CheckBox/>
				<Item isHighlighted label="First"/>
			</Box>

			<Box>
				<Indicator/>
				<CheckBox/>
				<Item label="Second"/>
			</Box>

			<Box>
				<Indicator/>
				<CheckBox/>
				<Item label="Third"/>
			</Box>
		</Box>
	));

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list - reset selection when new items are received', t => {
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}];

	const actual = render(<MultiSelect items={items}/>);
	actual.stdin.write(ARROW_DOWN);

	const newItems = [{
		label: 'Third',
		value: 'third'
	}, {
		label: 'Fourth',
		value: 'fourth'
	}];

	actual.rerender(<MultiSelect items={newItems}/>);

	const expected = render((
		<Box flexDirection="column">
			<Box>
				<Indicator isHighlighted/>
				<CheckBox/>
				<Item isHighlighted label="Third"/>
			</Box>

			<Box>
				<Indicator/>
				<CheckBox/>
				<Item label="Fourth"/>
			</Box>
		</Box>
	));

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list - item limit', t => {
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}, {
		label: 'Third',
		value: 'third'
	}];

	const actual = render(<MultiSelect items={items} limit={2}/>);

	const expected = render((
		<Box flexDirection="column">
			<Box>
				<Indicator isHighlighted/>
				<CheckBox/>
				<Item isHighlighted label="First"/>
			</Box>

			<Box>
				<Indicator/>
				<CheckBox/>
				<Item label="Second"/>
			</Box>
		</Box>
	));

	t.is(actual.lastFrame(), expected.lastFrame());

	actual.stdin.write(ARROW_DOWN);
	actual.stdin.write(ARROW_DOWN);

	expected.rerender((
		<Box flexDirection="column">
			<Box>
				<Indicator/>
				<CheckBox/>
				<Item label="Second"/>
			</Box>

			<Box>
				<Indicator isHighlighted/>
				<CheckBox/>
				<Item isHighlighted label="Third"/>
			</Box>
		</Box>
	));

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list - handle enter', t => {
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}];

	const onSubmit = spy();
	const {stdin} = render(<MultiSelect items={items} onSubmit={onSubmit}/>);

	stdin.write(ARROW_DOWN);
	stdin.write(' ');
	stdin.write(ENTER);

	t.true(onSubmit.calledOnce);
	t.deepEqual(onSubmit.firstCall.args[0], [items[1]]);
});

test('list - handle enter multiple', t => {
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}];

	const onSubmit = spy();
	const {stdin} = render(<MultiSelect items={items} onSubmit={onSubmit}/>);

	stdin.write(' ');
	stdin.write(ARROW_DOWN);
	stdin.write(' ');
	stdin.write(ENTER);

	t.true(onSubmit.calledOnce);
	t.deepEqual(onSubmit.firstCall.args[0], items);
});

test('list - seed default selected items', t => {
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}];

	const defaultSelected = [{
		value: 'second'
	}];

	const onSubmit = spy();
	const {stdin} = render(<MultiSelect defaultSelected={defaultSelected} items={items} onSubmit={onSubmit}/>);

	stdin.write(ENTER);

	t.true(onSubmit.calledOnce);
	t.deepEqual(onSubmit.firstCall.args[0], defaultSelected);
});

test('list - handle select', t => {
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}];

	const onSelect = spy();
	const {stdin} = render(<MultiSelect items={items} onSelect={onSelect}/>);

	stdin.write(ARROW_DOWN);
	stdin.write(' ');
	stdin.write(ARROW_UP);
	stdin.write(' ');

	t.true(onSelect.calledTwice);
	t.deepEqual(onSelect.firstCall.args[0], items[1]);
	t.deepEqual(onSelect.secondCall.args[0], items[0]);
});

test('list - handle unselect', t => {
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}];

	const onUnselect = spy();
	const {stdin} = render(<MultiSelect items={items} onUnselect={onUnselect}/>);

	stdin.write(ARROW_DOWN);
	stdin.write(' ');
	stdin.write(ARROW_UP);
	stdin.write(ARROW_DOWN);
	stdin.write(' ');

	t.true(onUnselect.calledOnce);
	t.deepEqual(onUnselect.firstCall.args[0], items[1]);
});

test('list - don\'t rotate when there are less items than limit', t => {
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}];

	const actual = render(<MultiSelect items={items} limit={4}/>);
	actual.stdin.write(ARROW_DOWN);
	actual.stdin.write(ARROW_DOWN);

	const expected = render((
		<Box flexDirection="column">
			<Box>
				<Indicator isHighlighted/>
				<CheckBox/>
				<Item isHighlighted label="First"/>
			</Box>

			<Box>
				<Indicator/>
				<CheckBox/>
				<Item label="Second"/>
			</Box>
		</Box>
	));

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list - rotate when there are more items than limit', t => {
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}, {
		label: 'Third',
		value: 'third'
	}];

	const actual = render(<MultiSelect items={items} limit={2}/>);
	actual.stdin.write(ARROW_DOWN);
	actual.stdin.write(ARROW_DOWN);

	const expected = render((
		<Box flexDirection="column">
			<Box>
				<Indicator/>
				<CheckBox/>
				<Item label="Second"/>
			</Box>

			<Box>
				<Indicator isHighlighted/>
				<CheckBox/>
				<Item isHighlighted label="Third"/>
			</Box>
		</Box>
	));

	t.is(actual.lastFrame(), expected.lastFrame());
});

test('list - onHighlight', t => {
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}, {
		label: 'Third',
		value: 'third'
	}];

	const onHighlight = spy();
	const {stdin} = render(<MultiSelect items={items} limit={2} onHighlight={onHighlight}/>);

	stdin.write(ARROW_DOWN);
	stdin.write(ARROW_DOWN);

	t.true(onHighlight.calledTwice);
	t.deepEqual(onHighlight.firstCall.args[0], items[1]);
	t.deepEqual(onHighlight.secondCall.args[0], items[2]);
});
