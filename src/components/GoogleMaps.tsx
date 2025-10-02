type GoogleMapsEmbedProps = {
  src: string; // URL de Google Maps embebida
  width?: string;
  height?: string;
  allowFullScreen?: boolean;
};

const GoogleMaps = ({
  src,
  width = "100%",
  height = "450px",
  allowFullScreen = true,
}: GoogleMapsEmbedProps) => {
  return (
    <div className="w-full flex justify-center">
      <iframe
        src={src}
        width={width}
        height={height}
        style={{ border: 0 }}
        allowFullScreen={allowFullScreen}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Ubicación de Fruco en Google Maps"
      ></iframe>
    </div>
  );
};

export default GoogleMaps;
