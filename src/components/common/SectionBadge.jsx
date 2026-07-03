const SectionBadge = ({
  children,
  className = "",
}) => {
  return (
    <span
      className={`inline-flex rounded-full bg-[var(--blue-50)] px-5 py-2 text-sm font-bold uppercase tracking-[0.10em] text-[var(--blue-600)] ${className}`}
    >
      {children}
    </span>
  );
};

export default SectionBadge;