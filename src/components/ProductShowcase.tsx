import { useRef, useState } from 'preact/hooks';
import { memo } from 'preact/compat';
import { useProductGrid, useFadeIn } from '@/hooks/useGSAP';
import { useLazyImage } from '@/hooks/useLazyImage';

interface Product {
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

interface ProductShowcaseProps {
	products?: Product[];
}

const defaultProducts: Product[] = [
	{
		id: 'frito',
		name: 'Tomate frito',
		imageSrc: '/products/fruco_brick_frito.avif',
		description:
			'Un sabor único y auténtico, hecho con ingredientes frescos y de alta calidad',
		detailedDescription:
			'Nuestro tomate frito es el resultado de una cuidadosa selección de tomates maduros y frescos, procesados con técnicas artesanales que preservan todo su sabor natural. Ideal para acompañar cualquier comida.',
		ingredients: [
			'Tomate',
			'Aceite de oliva',
			'Cebolla',
			'Ajo',
			'Sal',
			'Azúcar',
		],
		nutritionalInfo: {
			calories: '45 kcal',
			protein: '1.2g',
			carbs: '8.5g',
			fat: '1.1g',
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

// Componente para mostrar detalles del producto
const ProductDetails = memo(
	({ product, onClose }: { product: Product; onClose: () => void }) => {
		return (
			<div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
				<div className="bg-gray-900/95 backdrop-blur-md rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-800/50 shadow-2xl animate-in slide-in-from-bottom-4 duration-500">
					{/* Header con botón cerrar */}
					<div className="sticky top-0 bg-gray-900/95 backdrop-blur-md border-b border-gray-800/50 p-6 flex justify-between items-center">
						<h2 className="text-2xl font-bold text-white">{product.name}</h2>
						<button
							type="button"
							onClick={onClose}
							className="w-10 h-10 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors duration-200 flex items-center justify-center text-gray-400 hover:text-white"
						>
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								aria-label="Cerrar"
							>
								<title>Cerrar</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>

					{/* Contenido - Información del producto */}
					<div className="p-8 space-y-8">
						{/* Información nutricional */}
						{product.nutritionalInfo && (
							<div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/30">
								<h3 className="text-xl font-bold text-fruco-gold mb-6 text-center border-b border-fruco-gold/30 pb-3">
									Información Nutricional
								</h3>
								<div className="text-center mb-4">
									<span className="text-sm text-gray-400 uppercase tracking-wider">
										Por 100g de producto
									</span>
								</div>
								<div className="space-y-4">
									<div className="flex justify-between items-center py-3 border-b border-gray-700/30">
										<span className="text-gray-300 font-medium">
											Valor energético
										</span>
										<span className="text-white font-bold text-lg">
											{product.nutritionalInfo.calories}
										</span>
									</div>
									<div className="flex justify-between items-center py-3 border-b border-gray-700/30">
										<span className="text-gray-300 font-medium">Proteínas</span>
										<span className="text-white font-bold text-lg">
											{product.nutritionalInfo.protein}
										</span>
									</div>
									<div className="flex justify-between items-center py-3 border-b border-gray-700/30">
										<span className="text-gray-300 font-medium">
											Hidratos de carbono
										</span>
										<span className="text-white font-bold text-lg">
											{product.nutritionalInfo.carbs}
										</span>
									</div>
									<div className="flex justify-between items-center py-3">
										<span className="text-gray-300 font-medium">Grasas</span>
										<span className="text-white font-bold text-lg">
											{product.nutritionalInfo.fat}
										</span>
									</div>
								</div>
							</div>
						)}

						{/* Ingredientes */}
						{product.ingredients && (
							<div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/30">
								<h3 className="text-xl font-bold text-fruco-gold mb-6 text-center border-b border-fruco-gold/30 pb-3">
									Ingredientes
								</h3>
								<div className="text-center mb-4">
									<span className="text-sm text-gray-400 uppercase tracking-wider">
										En orden de mayor a menor cantidad
									</span>
								</div>
								<p className="text-gray-300 leading-relaxed text-center">
									{product.ingredients.join(', ')}.
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	},
);

const ProductCard = memo(
	({
		product,
		onClick,
		isSelected,
		isHidden,
	}: {
		product: Product;
		onClick: (product: Product) => void;
		isSelected: boolean;
		isHidden: boolean;
	}) => {
		const cardRef = useRef<HTMLButtonElement>(null);

		// Lazy loading optimizado
		const {
			imgRef: imageRef,
			isLoaded,
			isInView,
		} = useLazyImage({
			rootMargin: '50px',
			threshold: 0.1,
		});

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				onClick(product);
			}
		};

		return (
			<button
				type="button"
				ref={cardRef}
				onClick={() => onClick(product)}
				onKeyDown={handleKeyDown}
				className={`product-item relative bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-700/30 transition-all duration-700 cursor-pointer group hover:scale-[1.02] hover:-translate-y-2 w-full text-left ${
					isHidden
						? 'opacity-0 scale-75 pointer-events-none'
						: 'opacity-100 scale-100'
				} ${
					isSelected
						? 'ring-2 ring-fruco-gold/60 shadow-2xl shadow-fruco-gold/30 scale-[1.02] -translate-y-2'
						: 'shadow-xl shadow-black/20'
				}`}
				style={{
					willChange: 'transform, box-shadow, opacity',
				}}
			>
				{/* Efecto de brillo sutil */}
				<div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

				{/* Borde dorado sutil */}
				<div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-fruco-gold/20 via-transparent to-fruco-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

				{/* Imagen del producto */}
				<div className="relative overflow-hidden aspect-square bg-gradient-to-br from-gray-800/50 to-gray-900/50">
					{/* Overlay decorativo */}
					<div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent z-10" />

					<img
						ref={imageRef}
						data-src={product.imageSrc.replace(
							'/products/',
							'/products/optimized/medium/',
						)}
						data-srcset={`
                  ${product.imageSrc.replace('/products/', '/products/optimized/small/')} 200w,
                  ${product.imageSrc.replace('/products/', '/products/optimized/medium/')} 400w,
                  ${product.imageSrc.replace('/products/', '/products/optimized/large/')} 800w
               `}
						alt={product.name}
						className={`w-full h-full object-cover transition-all duration-700 p-4 group-hover:scale-105 ${
							isLoaded ? 'opacity-100' : 'opacity-0'
						}`}
						style={{
							willChange: 'transform, opacity',
							filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))',
						}}
						sizes="(max-width: 640px) 200px, (max-width: 768px) 280px, (max-width: 1024px) 240px, 280px"
						width="280"
						height="320"
						decoding="async"
					/>
					{!isLoaded && isInView && (
						<div className="absolute inset-0 flex items-center justify-center bg-gray-800/60 backdrop-blur-sm z-20">
							<div className="relative">
								<div className="w-10 h-10 border-3 border-fruco-gold/30 border-t-fruco-gold rounded-full animate-spin" />
								<div
									className="absolute inset-0 w-10 h-10 border-3 border-transparent border-t-fruco-gold/60 rounded-full animate-spin"
									style={{
										animationDirection: 'reverse',
										animationDuration: '1.5s',
									}}
								/>
							</div>
						</div>
					)}
				</div>

				{/* Contenido */}
				<div
					className="relative p-8 text-center bg-gradient-to-t from-gray-900/95 via-gray-900/80 to-transparent"
					style={{ willChange: 'transform' }}
				>
					{/* Línea decorativa superior */}
					<div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-fruco-gold/60 to-transparent" />

					<h3 className="text-xl font-bold mb-4 text-white group-hover:text-fruco-gold/90 transition-all duration-500 tracking-wide">
						{product.name}
					</h3>
					<p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-500 font-light">
						{product.description}
					</p>

					{/* Indicador de interacción */}
					<div className="mt-6 flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
						<span className="text-xs text-fruco-gold/80 font-medium tracking-wider uppercase">
							Ver detalles
						</span>
						<svg
							className="w-4 h-4 text-fruco-gold/80 transform group-hover:translate-x-1 transition-transform duration-300"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							aria-label="Flecha derecha"
						>
							<title>Flecha derecha</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</div>

					{/* Línea decorativa inferior */}
					<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-fruco-gold/40 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
				</div>
			</button>
		);
	},
);

const ProductShowcase = ({
	products = defaultProducts,
}: ProductShowcaseProps) => {
	const containerRef = useRef<HTMLElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const gridRef = useRef<HTMLDivElement>(null);
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
	const [showDetails, setShowDetails] = useState(false);

	// Animaciones
	useFadeIn(titleRef);
	useProductGrid(gridRef);

	// Funciones para manejar la selección de productos
	const handleProductClick = (product: Product) => {
		setSelectedProduct(product);
		setShowDetails(true);
	};

	const handleCloseDetails = () => {
		setShowDetails(false);
		setTimeout(() => setSelectedProduct(null), 300); // Delay para la animación
	};

	return (
		<section
			ref={containerRef}
			className="section-container py-20"
			id="productos"
		>
			<div className="max-w-7xl mx-auto px-4">
				{/* Título de la sección */}
				<div className="text-center mb-16">
					<h2
						ref={titleRef}
						className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white"
						style={{ willChange: 'transform, opacity' }}
					>
						Nuestros
						<span className="block text-white">Productos</span>
					</h2>
					<div className="w-24 h-1 bg-fruco-gold mx-auto rounded-full" />
				</div>

				{/* Grid de productos */}
				<div
					ref={gridRef}
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
				>
					{products.map((product) => (
						<ProductCard
							key={product.id}
							product={product}
							onClick={handleProductClick}
							isSelected={selectedProduct?.id === product.id}
							isHidden={
								selectedProduct !== null && selectedProduct.id !== product.id
							}
						/>
					))}
				</div>

				{/* Texto adicional */}
				<div className="text-center mt-16">
					<p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
						Cada producto Fruco es elaborado con los más altos estándares de
						calidad, utilizando ingredientes seleccionados para ofrecerte una
						experiencia gastronómica excepcional.
					</p>
				</div>
			</div>

			{/* Modal de detalles del producto */}
			{showDetails && selectedProduct && (
				<ProductDetails
					product={selectedProduct}
					onClose={handleCloseDetails}
				/>
			)}
		</section>
	);
};

export default ProductShowcase;
