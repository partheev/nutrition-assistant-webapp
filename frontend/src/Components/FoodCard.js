import * as React from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Divider } from '@mui/material'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

export default function FoodCard(props) {
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card sx={{ width: '100%', marginBottom: '20px' }}>
      <CardMedia
        component="img"
        height="194"
        image={props.img}
        alt="Paella dish"
      />
      <CardContent style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body2" color="text.secondary">
          133 cal
        </Typography>
        <Typography variant="body2" color="text.secondary">
          8.30 AM
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Typography>Satisfying calories</Typography>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: '0 1.5rem',
                height: '3.2rem',
              }}
            >
              <h4>Carbohydrates</h4>
              <span>75 cal</span>
            </div>
            <Divider />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: '0 1.5rem',
                height: '3.2rem',
              }}
            >
              <h4>Fats</h4>
              <span>47 cal</span>
            </div>
            <Divider />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: '0 1.5rem',
                height: '3.2rem',
              }}
            >
              <h4>Protien</h4>
              <span>11 cal</span>
            </div>
            <Divider />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: '0 1.5rem',
                height: '3.2rem',
              }}
            >
              <h4>Fiber</h4>
              <span>11 cal</span>
            </div>
            <Divider />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: '0 1.5rem',
                height: '3.2rem',
              }}
            >
              <h4>Cholestral</h4>
              <span>2 cal</span>
            </div>
            <Divider />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: '0 1.5rem',
                height: '3.2rem',
              }}
            >
              <h4>Iron</h4>
              <span>10 cal</span>
            </div>
          </div>
        </CardContent>
      </Collapse>
    </Card>
  )
}
