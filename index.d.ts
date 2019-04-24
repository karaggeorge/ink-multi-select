import * as React from "react";

/**
 * Props for custom indicator component.
 */
export type IndicatorProps = { isHighlighted?: boolean };

/**
 * Props for custom check box component.
 */
export type CheckBoxProps = { isSelected?: boolean };

/**
 * Props for custom item component.
 */
export type ItemProps = {
	isHighlighted?: boolean;
	label: string;
};

/**
 * Select item definition.
 */
export type Item = {
	label: string;
	value: React.Key;
	key?: React.Key;
};

export type MultiSelectProps = {
	/**
	 * Items to display in a list. Each item must be an object and have `label` and `value` props,
	 * it may also optionally have a `key` prop.
	 * If no `key` prop is provided, `value` will be used as the item key.
	 */
	items?: Item[];

	/**
	 * Listen to user's input. Useful in case there are multiple input components
	 * at the same time and input must be "routed" to a specific component.
	 */
	focus?: boolean;

	/**
	 * Index of initially-selected item in `items` array.
	 */
	initialIndex?: number;

	/**
	 * Function to call when user selects an item.
	 * Item object is passed to that function as an argument.
	 */
	onSelect?: (item: Item) => void;

	/**
	 * Function to call when user unselects an item.
	 * Item object is passed to that function as an argument.
	 */
	onUnselect?: (item: Item) => void;

	/**
	 * Function to call when user submits selected items.
	 * Selected Item list is passed to that function as an argument.
	 */
	onSubmit?: (item: Item[]) => void;

	/**
	 * Custom component to override the default indicator component.
	 */
	indicatorComponent?: React.ComponentType<IndicatorProps>;

	/**
	 * Custom component to override the default check box component.
	 */
	checkboxComponent?: React.ComponentType<CheckBoxProps>;

	/**
	 * Custom component to override the default item component.
	 */
	itemComponent?: React.ComponentType<ItemProps>;

	/**
	 * Number of items to display.
	 */
	limit?: number;

	/**
	 * Selected values to be considered during initialization.
	 */
	selectedValues?: string[];
};

/**
 * Multi Select input component for Ink
 */
export default class MultiSelect extends React.Component<MultiSelectProps> {}
