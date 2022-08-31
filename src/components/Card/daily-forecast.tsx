import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import './styles.scss';

type Props = {
  image: string;
  alt: any;
  title: string;
  subtitle: string;
};

export function DailyForecast(props: Props) {
  return (
    <Card className="info-card">
      <CardContent className="info-card-content">
        <span>{props.title}</span>
        <img src={props.image} alt={props.alt} width="50" />
        <span>{props.subtitle}</span>
      </CardContent>
    </Card>
  );
}
