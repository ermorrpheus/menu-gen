import Image from 'next/image';

type CardProps = {
	day: string;
	meal: { name: string };
	onLockToggle: () => void;
	onRandomize: () => void;
	locked: boolean;
};

const Card: React.FC<CardProps> = ({
	day,
	meal,
	onLockToggle,
	onRandomize,
	locked,
}) => {
	return (
		<div className="bg-white rounded-lg shadow-md p-4 m-2 flex flex-col justify-between">
			<h2 className="text-dark-purple text-xl font-bold mb-2">{day}</h2>
			<h3 className="text-purple-600 text-md font-semibold mb-2">
				{meal?.name ? meal.name : 'Nothing to see here.'}
			</h3>
			<div className="w-full h-36 relative">
				<Image
					className="w-full h-48 object-cover mb-2"
					src={`https://source.unsplash.com/random/900x600/?${meal?.name}`}
					alt={meal?.name}
					fill
				/>
			</div>
			<div className="flex justify-between">
				<button
					onClick={onLockToggle}
					className="bg-teal text-white p-2 rounded"
				>
					{locked ? '🔓' : '🔒'}
				</button>
				<button
					onClick={onRandomize}
					className="bg-teal text-white p-2 rounded"
				>
					🔄
				</button>
			</div>
		</div>
	);
};

export default Card;
