import Container from './Container';

export default function Section({ children, className = '', dark = false, id, container = true, containerSize = 'default' }) {
  const bg = dark ? 'bg-dark-800' : 'bg-dark-900';
  return (
    <section id={id} className={`py-20 md:py-28 lg:py-32 ${bg} ${className}`}>
      {container ? <Container size={containerSize}>{children}</Container> : children}
    </section>
  );
}
