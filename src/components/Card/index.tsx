import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import './styles.scss';

type Props = {
  image: string;
  alt: string;
  title: string;
  subtitle: string;
};

export function Info(props: Props) {
  return (
    <Card className="info-card">
      <CardContent className="info-card-content">
        <img src={props.image} alt={props.alt} />
        <span>{props.title}</span>
        <span>{props.subtitle}</span>
      </CardContent>
    </Card>
  );
}
