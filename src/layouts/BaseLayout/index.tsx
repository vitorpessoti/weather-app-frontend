import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';

type Props = {
  children: React.ReactNode;
};

export function BaseLayout(props: Props) {
  return (
    <div>
      <Footer />
      <div className="content">{props.children}</div>
      <Header />
    </div>
  );
}
