import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import * as HiIcons from 'react-icons/hi';
import './SidePanel.scss';
import { setColors } from '../../redux/features/ColorValues/ColorValues';


function SidePanel() {
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

  function getRgbFormatString() {
    return `rgb(${colorValues.rgb.red}, ${colorValues.rgb.green}, ${colorValues.rgb.blue})`;
  }

  return (
    <div className='side-panel'>
      <div className='container'>
        <span className='color-type-title'>RGB</span>
        <span className='color-code-text'>{getRgbFormatString()}</span>
        <CopyToClipboard
            text={getRgbFormatString()}
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
        <div className=' red rgb-slider-group'>
          <div className='color-input-group'>
            <label 
              className='rgb'
              htmlFor='red-rgb-input'
            >Red</label>

            <div className='block-input-group'>
              <div 
                className='rgb-block'
                style={{background: `rgb(${colorValues.rgb.red},0,0)`}}
              ></div>
              <input
                  type='number'
                  min="0" max="255"
                  className='rgb-value-input'
                  id='red-rgb-input'
                  value={colorValues.rgb.red}
                  onChange={ (event) => handleRGB(event, 'red') }
                />
            </div>
          </div>
          <input 
            className='rgb-slider'
            type="range" 
            min="0" max="255" 
            value={colorValues.rgb.red}
            onChange={ (event) => handleRGB(event, 'red') }
          />
        </div>
        <div className='rgb-slider-group'>
          <div className='color-input-group'>
            <label 
              className='rgb'
              htmlFor='green-rgb-input'
            >Green</label>
            <div className='block-input-group'>
              <div 
                className='rgb-block'
                style={{background: `rgb(0,${colorValues.rgb.green},0)`}}
              ></div>
              <input
                  type='number'
                  min="0" max="255"
                  className='rgb-value-input'
                  id='red-rgb-input'
                  value={colorValues.rgb.green}
                  onChange={ (event) => handleRGB(event, 'green') }
                />
            </div>
          </div>
          <input 
            className='rgb-slider'
            type="range" 
            min="0" max="255" 
            value={colorValues.rgb.green}
            onChange={ (event) => handleRGB(event, 'green') }
          />
        </div>
        <div className='rgb-slider-group'>
          <div className='color-input-group'>
            <label 
              className='rgb'
              htmlFor='blue-rgb-input'
            >Blue</label>
            <div className='block-input-group'>
              <div 
                className='rgb-block'
                style={{background: `rgb(0,0,${colorValues.rgb.blue})`}}
              ></div>
              <input
                  type='number'
                  min="0" max="255"
                  className='rgb-value-input'
                  id='red-rgb-input'
                  value={colorValues.rgb.blue}
                  onChange={ (event) => handleRGB(event, 'blue') }
                />
            </div>
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
        <span className='color-type-title'>HEX</span>
        <span className='color-code-text'>{getHexFormatString()}</span>
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

          <div className='hex-inputs-group'>
            <input
                className='hex-input'
                type='text'
                value={hexRedEmpty ? '': colorValues.hex.red}
                onChange={(e) => handleHex(e, 'red')}
              />
              <input
                className='hex-input'
                type='text'
                value={hexGreenEmpty ? '': colorValues.hex.green}
                onChange={(e) => handleHex(e, 'green')}
              />
              <input
                className='hex-input'
                type='text'
                value={hexBlueEmpty ? '': colorValues.hex.blue}
                onChange={(e) => handleHex(e, 'blue')}
              />
          </div>
      </div>
    </div>
  )
}

export default SidePanel