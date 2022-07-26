import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import './styles.scss';

type Props = {
  image: string;
  alt: string;
  title: string;
  subtitle: string;
};

export function Info(props: Props) {
  return (
    <Card className="info-card" variant="outlined">
      <CardContent className="info-card-content">
        {props.title}
      </CardContent>
      <CardActions className="info-card-actions">
        {props.subtitle}
      </CardActions>
    </Card>
  );
}
