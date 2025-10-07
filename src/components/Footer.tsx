import { useTranslations } from "@/hooks/useI18n";

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="py-12 text-center border-t border-fruco-gold/10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-4 text-gray-400 text-sm space-y-1">
          <p>
            {t.footer.location} |
            <a href="tel:660858090" className="hover:text-white">
              {" "}
              {t.footer.phone}
            </a>{" "}
            |
            <a href="mailto:info@fruco.es" className="hover:text-white">
              {" "}
              {t.footer.email}
            </a>
          </p>
        </div>
        <p className="text-gray-400 text-sm">
          © 2025 Fruco. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
