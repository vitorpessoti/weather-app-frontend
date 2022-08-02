import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import './styles.scss';

type Props = {
  children: React.ReactNode;
};

export function BaseLayout(props: Props) {
  return (
    <div className="base-layout">
      <div className="header">
        <Header />
      </div>
      <main className="content">{props.children}</main>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
