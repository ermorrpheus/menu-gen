import Card from '@/components/Card';
import { useState, useEffect, useCallback } from 'react';
import { mealOptions } from './mealOptions';

interface Meal {
	name: string;
	image?: string;
}

const App: React.FC = () => {
	const days = [
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
		'Sunday',
	];

	const [locked, setLocked] = useState<Array<boolean>>(
		new Array(7).fill(false)
	);

	const [meals, setMeals] = useState<Meal[]>([]);

	const randomMeals = useCallback(() => {
		const mealIndices = new Set<number>();
		while (mealIndices.size < days.length) {
			mealIndices.add(Math.floor(Math.random() * mealOptions.length));
		}
		return Array.from(mealIndices).map((index) => mealOptions[index]);
	}, [days.length]);

	useEffect(() => {
		setMeals(randomMeals());
	}, [randomMeals]);

	function randomizeCard(index: number) {
		if (!locked[index]) {
			let newIndex: number;
			do {
				newIndex = Math.floor(Math.random() * mealOptions.length);
			} while (newIndex === mealOptions.indexOf(meals[index]));
			setMeals((prevMeals) => {
				const newMeals = [...prevMeals];
				newMeals[index] = mealOptions[newIndex];
				return newMeals;
			});
		}
	}

	function randomizeAll() {
		setMeals((prevMeals) => {
			return prevMeals.map((meal, index) =>
				locked[index]
					? meal
					: mealOptions[Math.floor(Math.random() * mealOptions.length)]
			);
		});
	}

	function unlockAll() {
		setLocked((prevLocked) => {
			const newLocked = new Array(prevLocked.length).fill(false);
			return newLocked;
		});
	}

	function toggleLock(index: number) {
		setLocked((prevLocked) => {
			const newLocked = [...prevLocked];
			newLocked[index] = !newLocked[index];
			return newLocked;
		});
	}

	return (
		<div className="bg-dark-purple min-h-screen py-10">
			<h1 className="text-white text-4xl text-center mb-4">
				Weekly Meal Generator
			</h1>
			<div className="flex justify-center space-x-4 mb-6">
				<button
					onClick={randomizeAll}
					className="bg-teal text-white px-4 py-2 rounded"
				>
					Randomize All
				</button>
				<button
					onClick={unlockAll}
					className="bg-teal text-white px-4 py-2 rounded"
				>
					Unlock All
				</button>
			</div>
			<div className="grid grid-cols-7 justify-between">
				{days.map((day, index) => (
					<Card
						key={day}
						day={day}
						meal={meals[index]}
						onLockToggle={() => toggleLock(index)}
						onRandomize={() => randomizeCard(index)}
						locked={locked[index]}
					/>
				))}
			</div>
		</div>
	);
};

export default App;
