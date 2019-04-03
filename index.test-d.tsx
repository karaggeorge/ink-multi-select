import * as React from 'react';
import MultiSelect, {Item, IndicatorProps, ItemProps, CheckBoxProps} from '.';

const items: Item[] = [
	{label: 'label 1', value: 'label 1'},
	{label: 'label 2', value: 'label 2'}
];
const keyedItems: Item[] = [
	{label: 'label 1', value: 'label 1', key: 1},
	{label: 'label 2', value: 'label 2', key: 2}
];

const plain = () => <MultiSelect />;
const withProps = () => <MultiSelect focus={false} limit={10} />;

const selectWithItems = () => <MultiSelect items={items} />;
const selectWithKeyedItems = () => <MultiSelect items={keyedItems} />;

const onSelect = (item: Item) => console.log(item);
const withSelectHandler = () => <MultiSelect onSelect={onSelect} />;

const onUnselect = (item: Item) => console.log(item);
const withUnselectHandler = () => <MultiSelect onUnselect={onUnselect} />;

const onSubmit = (items: Item[]) => console.log(items);
const withSubmitHandler = () => <MultiSelect onSubmit={onSubmit} />;

const CustomIndikator: React.FC<IndicatorProps> = ({isHighlighted}) => (
	<div>{isHighlighted ? '✓' : ''}</div>
);
const CustomCheckBox: React.FC<CheckBoxProps> = ({isSelected}) => (
	<div>{isSelected ? '✓' : ''}</div>
);
const CustomItemComponent: React.FC<ItemProps> = ({isHighlighted, label}) => (
	<div>
		{isHighlighted ? '✓' : ''} {label}
	</div>
);
const overrideComponents = () => (
	<MultiSelect
		indicatorComponent={CustomIndikator}
		itemComponent={CustomItemComponent}
		checkboxComponent={CustomCheckBox}
	/>
);
