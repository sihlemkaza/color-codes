import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './SideNav.scss';
import { setColors } from '../../redux/features/ColorValues/ColorValues';

function SideNav() {
  const colorValues = useSelector((state) => state.colorValues.value);
  const dispatch = useDispatch();
  
  function handleRGB(event, rgbColor) {
    let eventNum = Number(event.target.value);
    const deepCopy = JSON.parse(JSON.stringify(colorValues));
    deepCopy.rgb[rgbColor] = eventNum;
    dispatch(setColors(deepCopy));
  }

  return (
    <div className='side-nav'>
      <div className='container'>
        <div className='rgb-code-group'>
          {`rgb(${colorValues.rgb.red}, ${colorValues.rgb.green}, ${colorValues.rgb.blue})`}
        </div>
        <div className='red-group rgb-group' style={{border: `2px solid rgb(${colorValues.rgb.red},0,0)`}}>
          <div className='color-label-group'>
            <div className='color-name'>Red</div>
            <div className='color-value'>{colorValues.rgb.red}</div>
          </div>
          <input 
            className='rgb-slider'
            type="range" 
            min="0" max="255" 
            value={colorValues.rgb.red}
            onChange={ (event) => handleRGB(event, 'red') }
          />
        </div>
        <div className='green-group rgb-group' style={{border: `2px solid rgb(0,${colorValues.rgb.green},0)`}}>
          <div className='color-label-group'>
            <div className='color-name'>Green</div>
            <div className='color-value'>{colorValues.rgb.green}</div>
          </div>
          <input
              className='rgb-slider'
              type="range" 
              min="0" max="255" 
              value={colorValues.rgb.green}
              onChange={ (event) => handleRGB(event, 'green') }
            />
          </div>
        <div className='blue-group rgb-group' style={{border: `2px solid rgb(0,0,${colorValues.rgb.blue})`}}>
          <div className='color-label-group'>
            <div className='color-name'>Blue</div>
            <div className='color-value'>{colorValues.rgb.blue}</div>
          </div>
          <input 
              className='rgb-slider'
              type="range" 
              min="0" max="255" 
              value={colorValues.rgb.blue}
              onChange={ (event) => handleRGB(event, 'blue') }
            />
          </div>
      </div>
    </div>
  )
}

export default SideNav