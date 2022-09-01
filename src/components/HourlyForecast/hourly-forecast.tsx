import Paper from '@mui/material/Paper';
import './styles.scss';

type Props = {
  image: string;
  alt: any;
  title: string;
  subtitle: string;
};

export function HourlyForecast(props: Props) {
  return (
    <Paper variant="outlined" className="wrapped-card info-card-content">
      <span>{props.title}</span>
      <img src={props.image} alt={props.alt} width="50"/>
      <span>{props.subtitle}</span>
    </Paper>
  );
}
