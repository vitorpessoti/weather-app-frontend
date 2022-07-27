import { BaseLayout } from '../../layouts/BaseLayout';
import Rain from '../../assets/images/10n.jpg';
import './styles.scss';

export function HomePage() {
  return (
    <>
      <BaseLayout>
        <div className="home">
          <aside className="image-container">
            <img src={Rain} alt="rain" />
            <figcaption className="country-state-text">Tokyo, Japan</figcaption>
            <figcaption className="temperature-text">
              19°C <figcaption>Rain</figcaption>
            </figcaption>
          </aside>

          <div className="data-container">
            <h1>Hello home!</h1>
            <h1>Hello home!</h1>
            <h1>Hello home!</h1>
            <h1>Hello home!</h1>
          </div>
        </div>
      </BaseLayout>
    </>
  );
}
