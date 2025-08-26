export default function Footer() {
	return (
		<footer className="py-12 text-center border-t border-fruco-gold/10">
			<div className="max-w-4xl mx-auto px-4">
				<div className="mb-4 text-gray-400 text-sm space-y-1">
					<p>
						España |
						<a href="tel:924378631" className="hover:text-white">
							{' '}
							Tel: 924 37 86 31
						</a>{' '}
						|
						<a href="mailto:info@apis.es" className="hover:text-white">
							{' '}
							Email: info@apis.es
						</a>
					</p>
				</div>
				<p className="text-gray-400 text-sm">
					© 2025 Fruco. Todos los derechos reservados.
				</p>
			</div>
		</footer>
	);
}
