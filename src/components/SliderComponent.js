import React, {useState, useEffect,  useContext} from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const SliderComponent = (props) => {

  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentEpoch, setCurrentEpoch] = useState(Math.round(currentDate.getTime() / 1000));
  const [yearAgoEpoch, setYearAgoEpoch] = useState(Math.round(currentDate.setFullYear(currentDate.getFullYear() - 1)));
  const [sliderVal, setSliderVal] = useState([0, props.sliderLength]);


  const useStyles = makeStyles(theme => ({
    inputRoot: {
      "& .MuiSlider-valueLabel": {
        position: "relative",
        top: 50,
      },
    }
  }));


  useEffect(() => {
    setSliderVal([0, props.sliderLength]);
  }, [props.resetSliders]);


  useEffect(() => {
    props.setStockIndexes(sliderVal);
  }, [sliderVal])


  // useEffect(() => {
    
  // }, [props.stockIndexes])

  const classes = useStyles();

  const AirbnbSlider = withStyles({
    root: {
      color: '#3a8589',
      height: 3,
      padding: '13px 0',
    },
    thumb: {
      height: 27,
      width: 27,
      backgroundColor: '#fff',
      border: '1px solid currentColor',
      marginTop: -12,
      marginLeft: -13,
      boxShadow: '#ebebeb 0 2px 2px',
      '&:focus, &:hover, &$active': {
        boxShadow: '#ccc 0 2px 3px 1px',
      },
      '& .bar': {
        height: 9,
        width: 1,
        backgroundColor: 'currentColor',
        marginLeft: 1,
        marginRight: 1,
      },
    },
    active: {},
    track: {
      height: 3,
    },
    rail: {
      color: '#d8d8d8',
      opacity: 1,
      height: 3,
    },
  })(Slider);

  const iOSBoxShadow = '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

  const thumbSize = useMediaQuery('(min-width:600px)');

  const IOSSlider = withStyles({
  root: {
    color: '#3880ff',
    height: 2,
    padding: '15px 0',
  },
  thumb: {
    border: (props.sliderWindow) ? '5px solid #F40969' : 'none',
    position: 'absolute',
    top: 20,
    height: (thumbSize) ? 28 : 18,
    width: (thumbSize) ? 28 : 18,
    backgroundColor: '#fff',
    boxShadow: iOSBoxShadow,
    marginTop: -14,
    marginLeft: -14,
    '&:focus, &:hover, &$active': {
      boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 12px)',
    top: -22,
    '& *': {
      background: 'transparent',
      color: '#000',
    },
  },
  track: {
    height: 2,
  },
  rail: {
    height: 2,
    opacity: 0.5,
    backgroundColor: '#bfbfbf',
  },
  mark: {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    backgroundColor: 'currentColor',
  },
})(Slider);

  function AirbnbThumbComponent(props) {
    return (
      <span {...props}>
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </span>
    );
  }

  const ValueLabelComponent = (props) => {
  const { children, open, value } = props;

  return (
    <Tooltip
      title={value}
      open={open}
      placement="bottom"
      arrow={true}
      leaveTouchDelay={3000}
    >
      {children}
    </Tooltip>
  );
}

// const RedCircle = (props) => {
//   return (
//     <span {...props} className="red-slider-thumb">

//     </span>
//   );
// }

  return (
    <div>
      <IOSSlider 
        aria-label="ios slider" 
        defaultValue={sliderVal}
        valueLabelDisplay="auto" 
        max={props.sliderLength}
        min={0}
        valueLabelFormat={(value, index) => {
          return props.chartData[value].month;
        }}
        onChangeCommitted={(event, value) => {
          console.log(value);
          setSliderVal(value);
        }}
        ValueLabelComponent={ValueLabelComponent}
        // ThumbComponent={RedCircle}
      />
    </div>
  )
}

export default SliderComponent;