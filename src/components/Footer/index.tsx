import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import './styles.scss';

export function Footer() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="footer-content">
          <div className="creators">
            <Typography
              variant="h6"
              component="h1"
              align="left"
              sx={{ flexGrow: 1, fontWeight: 800, fontSize: 16 }}
            >
              vitorpessoti59@gmail.com
            </Typography>
            <Typography
              variant="h6"
              component="h1"
              align="center"
              sx={{ flexGrow: 1, fontWeight: 800, fontSize: 16 }}
            >
              wilsonpinheirodev@gmail.com
            </Typography>
          </div>
          <div className="data-credits">
            <Typography
              variant="h6"
              component="h1"
              align="right"
              sx={{ flexGrow: 1, fontWeight: 800, fontSize: 16 }}
            >
              Data from openweathermap.org
            </Typography>
          </div>
          <div className="copyright">
            <Typography
              variant="h6"
              component="h1"
              sx={{ flexGrow: 1, fontWeight: 800, fontSize: 16 }}
            >
              Copyright © 2022
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
