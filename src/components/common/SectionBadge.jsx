const SectionBadge = ({
  children,
  className = "",
}) => {
  return (
    <span
      className={`inline-flex rounded-full bg-blue-50 px-5 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-blue-600 ${className}`}
    >
      {children}
    </span>
  );
};

export default SectionBadge;