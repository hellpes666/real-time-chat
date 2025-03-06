export const handleError = (error: unknown, componentName: string): void => {
	if (error instanceof Error) {
		console.log(
			`Ошибка ${error.name} - ${error.message} в ${componentName}`
		);
	}

	console.error("Ошибка не ошибка, брат");
};
