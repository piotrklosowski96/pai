import { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ItemTypes = {
	CARD: 'card',
};

const SortableList = ({ items }) => {
	const [sortedItems, setSortedItems] = useState(items);

	const moveItem = (dragIndex, hoverIndex) => {
		const draggedItem = sortedItems[dragIndex];
		const newSortedItems = [...sortedItems];
		newSortedItems.splice(dragIndex, 1);
		newSortedItems.splice(hoverIndex, 0, draggedItem);
		setSortedItems(newSortedItems);
	};

	const Item = ({ item, index }) => {
		const [{ isDragging }, drag] = useDrag({
			type: ItemTypes.CARD,
			item: { type: ItemTypes.CARD, index },
			collect: (monitor) => ({
				isDragging: monitor.isDragging(),
			}),
		});

		const [, drop] = useDrop({
			accept: ItemTypes.CARD,
			hover: (item) => {
				const dragIndex = item.index;
				const hoverIndex = index;

				if (dragIndex === hoverIndex) {
					return;
				}

				moveItem(dragIndex, hoverIndex);
				console.log(drop)
				item.index = hoverIndex;
			},
		});

		const opacity = isDragging ? 0.5 : 1;

		return (
			<li
				ref={(node) => drag(drop(node))}
				className={
					`bg-gray-600 p-4 my-2 rounded-md shadow-md ${isDragging ? 'opacity-50' : ''}`
				}
				style={{ cursor: 'move' }}
			>
				{item}
			</li>
		);
	};

	return (
		<ul>
			{sortedItems.map((item, index) => (
				<Item key={item} item={item} index={index} />
			))}
		</ul>
	);
};

export default SortableList;