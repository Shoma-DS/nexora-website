const ClipPathTitle = ({ title, color, bg, className, borderColor }) => {
  return (
    <div className="section-title">
      <div
        style={{
          clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
          borderColor: borderColor,
        }}
        className={`${className} border-[2px] text-nowrap opacity-0`}
      >
        <div
          className="pb-4 md:px-12 px-4 md:pt-1 pt-3"
          style={{
            backgroundColor: bg,
          }}
        >
          <h2
            className="font-body font-[700]"
            style={{
              color: color,
            }}
          >
            {title}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ClipPathTitle;
