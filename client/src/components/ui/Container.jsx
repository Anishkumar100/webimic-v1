export default function Container({ children, className = '', size = 'default' }) {
  const sizes = {
    narrow: 'max-w-4xl',
    default: 'max-w-7xl',
    wide: 'max-w-[1400px]',
    full: 'max-w-full',
  };
  return (
    <div className={`mx-auto px-5 sm:px-8 lg:px-16 ${sizes[size]} ${className}`}>
      {children}
    </div>
  );
}
