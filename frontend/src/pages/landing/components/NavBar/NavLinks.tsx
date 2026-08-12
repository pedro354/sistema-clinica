import { Container } from '../../../../Components/ui/Container/Container';
import { navigation } from '../data/navigation';

export function NavLinks() {
  return (
    <Container>
    <div className="">
      {navigation.map((item) => (
        <a
          key={item.name}
          href={item.href}
          className=""
        >
          {item.name}
        </a>
      ))}
    </div>
    </Container>
  );
}