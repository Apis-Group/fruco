export interface Product {
	id: string;
	name: string;
	imageSrc: string;
	description: string;
	detailedDescription?: string;
	ingredients?: string[];
	nutritionalInfo?: {
		calories: string;
		protein: string;
		carbs: string;
		fat: string;
	};
}

export const products: Product[] = [
	{
		id: 'frito',
		name: 'Tomate frito',
		imageSrc: '/products/fruco_brick_frito.avif',
		description:
			'Un sabor único y auténtico, hecho con ingredientes frescos y de alta calidad',
		detailedDescription:
			'Tomate frito elaborado con un 87% de tomate (a partir de tomate concentrado) y aceite de girasol. Nuestro tomate frito es el resultado de una cuidadosa selección de tomates maduros, procesados con técnicas que preservan todo su sabor natural. Ideal para acompañar cualquier comida.',
		ingredients: [
			'Tomate 87% (a partir de tomate concentrado)',
			'Aceite de girasol',
			'Azúcar',
			'Almidón modificado de maíz',
			'Sal',
			'Cebolla',
			'Ajo',
			'Pimentón',
			'Aromas',
			'Ácido cítrico (corrector acidez)',
		],
		nutritionalInfo: {
			calories: '68 kcal',
			protein: '1,3g',
			carbs: '8,5g',
			fat: '3,3g',
		},
	},
	{
		id: 'frito-virgen-extra',
		name: 'Tomate Frito con AOVE',
		imageSrc: '/products/fruco_brick_aceite.avif',
		description:
			'La máxima calidad con aceite de oliva virgen extra para un sabor excepcional',
		detailedDescription:
			'Tomate frito elaborado con un 87% de tomate (a partir de tomate concentrado) y aceite de oliva virgen extra. Una versión premium de nuestro clásico tomate frito, con aceite de oliva virgen extra de primera calidad. Su sabor refinado y textura perfecta lo convierten en el complemento ideal para los paladares más exigentes.',
		ingredients: [
			'Tomate 87% (a partir de tomate concentrado)',
			'Aceite de oliva virgen extra',
			'Azúcar',
			'Almidón modificado de maíz',
			'Sal',
			'Cebolla',
			'Ajo',
			'Pimentón',
			'Aromas',
			'Ácido cítrico (corrector acidez)',
		],
		nutritionalInfo: {
			calories: '68 kcal',
			protein: '1,3g',
			carbs: '8,5g',
			fat: '3,3g',
		},
	},

	{
		id: 'clasico',
		name: 'Clásico',
		imageSrc: '/products/fruco_clasico.avif',
		description:
			'El sabor original que ha conquistado paladares por generaciones',
		detailedDescription:
			'La receta original de Fruco que ha deleitado a familias durante décadas. Un sabor inconfundible que evoca los mejores recuerdos de la cocina tradicional española.',
		ingredients: [
			'Tomate',
			'Aceite vegetal',
			'Cebolla',
			'Azúcar',
			'Sal',
			'Vinagre',
		],
		nutritionalInfo: {
			calories: '48 kcal',
			protein: '1.1g',
			carbs: '8.8g',
			fat: '1.2g',
		},
	},
	{
		id: 'artesano',
		name: 'Artesano',
		imageSrc: '/products/fruco_artesano.avif',
		description:
			'Elaborado con técnicas tradicionales para un sabor único y auténtico',
		detailedDescription:
			'Preparado siguiendo recetas tradicionales transmitidas de generación en generación. Cada lote es cuidadosamente elaborado para mantener la autenticidad del sabor casero.',
		ingredients: [
			'Tomate natural',
			'Aceite de oliva virgen extra',
			'Cebolla',
			'Pimiento',
			'Especias naturales',
		],
		nutritionalInfo: {
			calories: '52 kcal',
			protein: '1.5g',
			carbs: '9.2g',
			fat: '1.3g',
		},
	},
	{
		id: 'pasta-pizza',
		name: 'Pasta & Pizza',
		imageSrc: '/products/fruco_pasta_pizza.avif',
		description: 'Perfecta combinación para tus platos italianos favoritos',
		detailedDescription:
			'Especialmente formulado para realzar el sabor de pastas y pizzas. Con hierbas mediterráneas y un toque especial que transporta tus sentidos directamente a Italia.',
		ingredients: [
			'Tomate',
			'Aceite de oliva',
			'Albahaca',
			'Orégano',
			'Ajo',
			'Sal marina',
		],
		nutritionalInfo: {
			calories: '42 kcal',
			protein: '1.3g',
			carbs: '7.9g',
			fat: '1.0g',
		},
	},
];
