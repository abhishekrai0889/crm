const Form = ({
  children,
  onSubmit,
  className = "",
  card = true,
  title,
  description,
}) => {
  return (
    <div
      className={
        card
          ? "rounded-[24px] border border-[var(--line)] bg-white p-9 shadow-[0_12px_45px_rgba(16,57,154,.08)]"
          : ""
      }
    >
      {title && (
        <h2 className="text-[34px] font-bold text-[var(--ink-900)]">
          {title}
        </h2>
      )}

      {description && (
        <p className="mt-2 text-[15px] text-[var(--ink-500)]">
          {description}
        </p>
      )}

      <form
        onSubmit={onSubmit}
        className={`mt-8 space-y-6 ${className}`}
      >
        {children}
      </form>
    </div>
  );
};

export default Form;