import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './SideNav.scss';
import { setColors } from '../../redux/features/ColorValues/ColorValues';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import * as HiIcons from 'react-icons/hi';

function SideNav() {
  const colorValues = useSelector((state) => state.colorValues.value);
  const dispatch = useDispatch();
  const [rgbCopied, setRgbCopied] = useState(false);
  const [hexCopied, setHexCopied] = useState(false);
  const validValues = ['0','1','2','3','4','5','6','7','8','9', 'A', 'B', 'C', 'D', 'E', 'F'];
  const [hexRedEmpty, setHexRedEmpty] = useState(false);
  const [hexGreenEmpty, setHexGreenEmpty] = useState(false);
  const [hexBlueEmpty, setHexBlueEmpty] = useState(false);

  function RgbToHex(color) {
    var hexadecimal = color.toString(16);
     return (hexadecimal.length === 1 ? "0" + hexadecimal : hexadecimal).toUpperCase();
  }

  function HexToRgb(color) {
    return parseInt(color, 16);
  }

  function handleRGB(event, rgbColor) {
    let eventNum = Number(event.target.value);
    const deepCopy = JSON.parse(JSON.stringify(colorValues));
    if(eventNum > 255) eventNum=255;
    if(eventNum < 0) eventNum=0; 
    deepCopy.rgb[rgbColor] = eventNum;

    const hexVal = RgbToHex(eventNum);
    deepCopy.hex[rgbColor] = hexVal;
    dispatch(setColors(deepCopy));
  }

  async function copyRgbClicked() {
    setRgbCopied(true);
    setTimeout(() => {
      setRgbCopied(false);
    }, 1000);
  }

  async function copyHexClicked() {
    setHexCopied(true);
    setTimeout(() => {
      setHexCopied(false);
    }, 1000);
  }

  function handleHex(event, hexColor) {
    let hexVal = event.target.value.toUpperCase();

    if(hexVal.length > 2) {
      return;
    }

    const deepCopy = JSON.parse(JSON.stringify(colorValues));

    if(hexVal.length === 1) {
      if(validValues.includes(hexVal)) {
        if(hexColor === 'red') setHexRedEmpty(false);
        if(hexColor === 'green') setHexGreenEmpty(false);
        if(hexColor === 'blue') setHexBlueEmpty(false);
        deepCopy.hex[hexColor] = hexVal;
        deepCopy.rgb[hexColor] = HexToRgb(hexVal);
      } else return;
    } else if(hexVal.length === 2) {
      if((validValues.includes(hexVal.charAt(0)) && validValues.includes(hexVal.charAt(1)))) {
        if(hexColor === 'red') setHexRedEmpty(false);
        if(hexColor === 'green') setHexGreenEmpty(false);
        if(hexColor === 'blue') setHexBlueEmpty(false);
        deepCopy.hex[hexColor] = hexVal;
        deepCopy.rgb[hexColor] = HexToRgb(hexVal);
      } else return;
    } else {
      if(hexColor === 'red') setHexRedEmpty(true);
      if(hexColor === 'green') setHexGreenEmpty(true);
      if(hexColor === 'blue') setHexBlueEmpty(true);
      deepCopy.hex[hexColor] = '00';
      deepCopy.rgb[hexColor] = HexToRgb('00');
    }
    dispatch(setColors(deepCopy));
  }

  function getHexFormatString() {
    const red = `${colorValues.hex.red}`.length === 1 ? `0${colorValues.hex.red}` : `${colorValues.hex.red}`;
    const green = `${colorValues.hex.green}`.length === 1 ? `0${colorValues.hex.green}` : `${colorValues.hex.green}`;
    const blue = `${colorValues.hex.blue}`.length === 1 ? `0${colorValues.hex.blue}` : `${colorValues.hex.blue}`;
    return `#${red}${green}${blue}`;
  }

  return (
    <div className='side-nav'>
      <div className='container'>
        <div className='color-type-title'>
          RGB 
        </div>
        <div className='rgb-code-group'>
          <span className='rgb-text'>{`rgb(${colorValues.rgb.red}, ${colorValues.rgb.green}, ${colorValues.rgb.blue})`}</span>
          <CopyToClipboard
            text={`rgb(${colorValues.rgb.red}, ${colorValues.rgb.green}, ${colorValues.rgb.blue})`}
            onCopy={copyRgbClicked}
          >
            {rgbCopied 
              ? <div className='copy-group'>
                  <HiIcons.HiClipboardCheck className='copy-icon' />
                  Copied
                </div>
              : <div className='copy-group'>
                  <HiIcons.HiOutlineClipboard className='copy-icon'/>
                  Copy
                </div>}
          </CopyToClipboard>
        </div>
        <div className='red-group rgb-group' style={{border: `2px solid rgb(${colorValues.rgb.red},0,0)`}}>
          <div className='color-label-group'>
            <div className='color-name'>Red</div>
            <input
              type='number'
              min="0" max="255"
              className='color-value'
              value={colorValues.rgb.red}
              onChange={ (event) => handleRGB(event, 'red') }
            />
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
            <input
              type='number'
              min="0" max="255"
              className='color-value'
              value={colorValues.rgb.green}
              onChange={ (event) => handleRGB(event, 'green') }
            />
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
            <input
              type='number'
              min="0" max="255"
              className='color-value'
              value={colorValues.rgb.blue}
              onChange={ (event) => handleRGB(event, 'blue') }
            />
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
      <div className='divider'></div>
      <div className='container'>
        <div className='color-type-title'>
          Hexadecimal
        </div>
        <div className='hex-code-group'>
        <span className='hex-text'>{getHexFormatString()}</span>
          <CopyToClipboard
            text={getHexFormatString()}
            onCopy={copyHexClicked}
          >
            {hexCopied 
              ? <div className='copy-group'>
                  <HiIcons.HiClipboardCheck className='copy-icon' />
                  Copied
                </div>
              : <div className='copy-group'>
                  <HiIcons.HiOutlineClipboard className='copy-icon'/>
                  Copy
                </div>}
          </CopyToClipboard>
        </div>
        <div className='hex-row'>
          <div className='red-group hex-group'>
              <input
                className='hex-value'
                type='text'
                value={hexRedEmpty ? '': colorValues.hex.red}
                onChange={(e) => handleHex(e, 'red')}
              />
          </div>
          <div className='green-group hex-group'>
              <input
                className='hex-value'
                type='text'
                value={hexGreenEmpty ? '' : colorValues.hex.green}
                onChange={(e) => handleHex(e, 'green')}
              />
          </div>
          <div className='blue-group hex-group'>
              <input
                className='hex-value'
                type='text'
                value={hexBlueEmpty ? '': colorValues.hex.blue}
                onChange={(e) => handleHex(e, 'blue')}
              />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideNav