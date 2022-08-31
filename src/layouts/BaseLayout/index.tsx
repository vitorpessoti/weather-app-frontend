import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import Container from '@mui/material/Container';
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
      <Container maxWidth="lg">
        <main className="content">{props.children}</main>
      </Container>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
