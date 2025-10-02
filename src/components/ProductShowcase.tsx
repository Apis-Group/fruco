import { useRef, useState } from 'preact/hooks';
import { memo } from 'preact/compat';
import { useProductGrid, useFadeIn } from '@/hooks/useGSAP';
import { useLazyImage } from '@/hooks/useLazyImage';
import { type Product, products as defaultProducts } from '@/lib/Products';

interface ProductShowcaseProps {
	products?: Product[];
}

// Componente para mostrar detalles del producto
const ProductDetails = memo(
	({ product, onClose }: { product: Product; onClose: () => void }) => {
		const handleBackdropClick = (e: MouseEvent) => {
			if (e.target === e.currentTarget) {
				onClose();
			}
		};

		return (
			<div 
				className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer"
				onClick={handleBackdropClick}
				style={{
					animation: 'fadeIn 0.3s ease-out forwards'
				}}
			>
				<div 
					className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden border border-gray-200 shadow-2xl cursor-default"
					onClick={(e) => e.stopPropagation()}
					style={{
						animation: 'slideUpScale 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards'
					}}
				>
					{/* Header con botón cerrar */}
					<div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
						<h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
						<button
							type="button"
							onClick={onClose}
							className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center text-gray-600 hover:text-gray-900"
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

					{/* Contenido principal */}
					<div className="flex flex-col lg:flex-row">
						{/* Imagen del producto */}
						<div className="lg:w-1/2 p-4 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
							<div className="relative w-full max-w-md">
								<img
									src={product.imageSrc.replace(
										'/products/',
										'/products/optimized/large/',
									)}
									alt={product.name}
									className="w-full h-auto object-contain rounded-2xl shadow-2xl"
									style={{
										filter: 'drop-shadow(0 8px 24px rgba(0, 0, 0, 0.15))',
										maxHeight: '500px',
									}}
								/>
								{/* Efecto de brillo */}
								<div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-fruco-gold/10 via-transparent to-transparent opacity-60" />
							</div>
						</div>

						{/* Información del producto */}
						<div className="lg:w-1/2 p-4 overflow-y-auto bg-white">
							{/* Descripción detallada */}
							{product.detailedDescription && (
								<div className="mb-4">
									<p className="text-gray-700 leading-relaxed text-sm">
										{product.detailedDescription}
									</p>
								</div>
							)}

							{/* Información nutricional en tabla */}
							{product.nutritionalInfo && (
								<div className="mb-4">
									<h3 className="text-lg font-bold text-fruco-red mb-3 border-b border-fruco-red/30 pb-2">
										Información Nutricional
									</h3>
									<div className="mb-2">
										<span className="text-xs text-gray-600 uppercase tracking-wider">
											Por 100g de producto
										</span>
									</div>
									
									{/* Tabla nutricional */}
									<div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden border border-gray-200">
										<table className="w-full">
											<thead>
												<tr className="bg-gradient-to-r from-gray-100 to-gray-50">
													<th className="text-left p-2 text-fruco-red font-semibold text-sm">
														Nutriente
													</th>
													<th className="text-right p-2 text-fruco-red font-semibold text-sm">
														Cantidad
													</th>
												</tr>
											</thead>
											<tbody>
												<tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
													<td className="p-2 text-gray-700 text-sm">Valor energético</td>
													<td className="p-2 text-right text-gray-900 font-semibold text-sm">
														{product.nutritionalInfo.calories}
													</td>
												</tr>
												<tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
													<td className="p-2 text-gray-700 text-sm">Proteínas</td>
													<td className="p-2 text-right text-gray-900 font-semibold text-sm">
														{product.nutritionalInfo.protein}
													</td>
												</tr>
												<tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
													<td className="p-2 text-gray-700 text-sm">Hidratos de carbono</td>
													<td className="p-2 text-right text-gray-900 font-semibold text-sm">
														{product.nutritionalInfo.carbs}
													</td>
												</tr>
												<tr className="hover:bg-gray-50 transition-colors">
													<td className="p-2 text-gray-700 text-sm">Grasas</td>
													<td className="p-2 text-right text-gray-900 font-semibold text-sm">
														{product.nutritionalInfo.fat}
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							)}

							{/* Ingredientes */}
							{product.ingredients && (
								<div>
									<h3 className="text-lg font-bold text-fruco-red mb-3 border-b border-fruco-red/30 pb-2">
										Ingredientes
									</h3>
									<div className="mb-2">
										<span className="text-xs text-gray-600 uppercase tracking-wider">
											En orden de mayor a menor cantidad
										</span>
									</div>
									<div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-3 border border-gray-200">
										<p className="text-gray-700 leading-relaxed text-sm">
											{product.ingredients.join(', ')}.
										</p>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	},
);

// Componente de tarjeta informativa
const InfoCard = memo(() => {
	return (
		<div
			className="relative bg-gradient-to-br from-fruco-red via-fruco-red/90 to-fruco-red/80 rounded-3xl overflow-hidden border-2 border-fruco-red/50 w-full max-w-sm text-left h-full flex flex-col shadow-xl shadow-fruco-red/20"
		>
			{/* Efecto de brillo */}
			<div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
			
			{/* Patrón decorativo de fondo */}
			<div className="absolute inset-0 opacity-10">
				<div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl" />
				<div className="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl" />
			</div>

			{/* Contenido */}
			<div className="relative p-6 text-center flex-grow flex flex-col justify-center items-center z-10">
				{/* Icono o logo */}
				<div className="mb-4">
					<svg 
						className="w-16 h-16 text-white/90" 
						fill="none" 
						stroke="currentColor" 
						viewBox="0 0 24 24"
					>
						<path 
							strokeLinecap="round" 
							strokeLinejoin="round" 
							strokeWidth={1.5} 
							d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
						/>
					</svg>
				</div>

				<h3 className="text-2xl font-bold mb-4 text-white leading-tight">
					¿Sabías que...?
				</h3>
				
				<p className="text-white/90 text-sm leading-relaxed mb-4">
					Todos nuestros productos están elaborados con tomates seleccionados y siguiendo recetas tradicionales que garantizan el mejor sabor en cada bocado.
				</p>

				<div className="mt-auto pt-4">
					<div className="inline-flex items-center space-x-2 text-white/80 text-xs font-medium">
						<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
							<path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
						</svg>
						<span>Calidad garantizada</span>
					</div>
				</div>
			</div>

			{/* Línea decorativa inferior */}
			<div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
		</div>
	);
});

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
				className={`product-item relative bg-white rounded-3xl overflow-hidden border-2 border-gray-200 transition-all duration-700 cursor-pointer group hover:scale-[1.02] hover:-translate-y-2 w-full max-w-sm text-left h-full flex flex-col ${
					isHidden
						? 'opacity-0 scale-75 pointer-events-none'
						: 'opacity-100 scale-100'
				} ${
					isSelected
						? 'ring-4 ring-fruco-red/60 shadow-2xl shadow-fruco-red/30 scale-[1.02] -translate-y-2 border-fruco-red'
						: 'shadow-xl shadow-black/10 hover:shadow-2xl hover:shadow-black/20'
				}`}
				style={{
					willChange: 'transform, box-shadow, opacity',
				}}
			>
				{/* Efecto de brillo sutil */}
				<div className="absolute inset-0 bg-gradient-to-br from-fruco-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

				{/* Borde dorado sutil */}
				<div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-fruco-red/10 via-transparent to-fruco-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

				{/* Imagen del producto */}
				<div className="relative overflow-hidden aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex-shrink-0">
					{/* Overlay decorativo */}
					<div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent z-10" />

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
						className={`w-full h-full object-cover object-center transition-all duration-700 p-4 group-hover:scale-105 ${
							isLoaded ? 'opacity-100' : 'opacity-0'
						}`}
						style={{
							willChange: 'transform, opacity',
							filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))',
						}}
						sizes="(max-width: 640px) 200px, (max-width: 768px) 280px, (max-width: 1024px) 240px, 280px"
						width="280"
						height="280"
						decoding="async"
					/>
					{!isLoaded && isInView && (
						<div className="absolute inset-0 flex items-center justify-center bg-gray-100 backdrop-blur-sm z-20">
							<div className="relative">
								<div className="w-10 h-10 border-3 border-fruco-red/30 border-t-fruco-red rounded-full animate-spin" />
								<div
									className="absolute inset-0 w-10 h-10 border-3 border-transparent border-t-fruco-red/60 rounded-full animate-spin"
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
					className="relative p-6 text-center bg-white flex-grow flex flex-col justify-between"
					style={{ willChange: 'transform' }}
				>
					{/* Línea decorativa superior */}
					<div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-fruco-red/60 to-transparent" />

					<div className="flex-grow flex flex-col justify-center">
						<h3 className="text-lg font-bold mb-3 text-gray-900 group-hover:text-fruco-red transition-all duration-500 tracking-wide leading-tight min-h-[3.5rem] flex items-center justify-center">
							{product.name}
						</h3>
						<p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-800 transition-colors duration-500 font-light min-h-[4.5rem] flex items-center justify-center text-center">
							{product.description}
						</p>
					</div>

					{/* Indicador de interacción */}
					<div className="mt-4 flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
						<span className="text-xs text-fruco-red font-medium tracking-wider uppercase">
							Ver detalles
						</span>
						<svg
							className="w-4 h-4 text-fruco-red transform group-hover:translate-x-1 transition-transform duration-300"
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
					<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-fruco-red/60 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
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
		setSelectedProduct(null);
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
					className="grid grid-cols-2 lg:grid-cols-5 gap-6 items-stretch"
				>
					{products.map((product) => (
						<div key={product.id}>
							<ProductCard
								product={product}
								onClick={handleProductClick}
								isSelected={selectedProduct?.id === product.id}
								isHidden={
									selectedProduct !== null && selectedProduct.id !== product.id
								}
							/>
						</div>
					))}
					
					{/* Tarjeta informativa cuando hay número impar de productos */}
					{products.length % 2 !== 0 && (
						<div className="lg:hidden">
							<InfoCard />
						</div>
					)}
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
