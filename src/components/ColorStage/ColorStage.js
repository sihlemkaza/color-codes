import React from 'react';
import './ColorStage.scss';
import { useSelector } from 'react-redux';
import * as AiIcons from 'react-icons/ai';
import * as TbIcons from 'react-icons/tb';

function ColorStage() {
  const colorValues = useSelector((state) => state.colorValues.value);

  return (
    <div className='color-stage'>
      <div className='color-boxes-group'>
        <div className='box' style={{background: `rgb(${colorValues.rgb.red},0,0)`}}>
          </div>
          <AiIcons.AiOutlinePlus className='icon'/>
          <div className='box' style={{background: `rgb(0,${colorValues.rgb.green},0)`}}>
          </div>
          <AiIcons.AiOutlinePlus className='icon'/>
          <div className='box' style={{background: `rgb(0,0,${colorValues.rgb.blue})`}}>
          </div>
          <TbIcons.TbEqual className='icon'/>
        </div>
        <div 
          className='platform'
          style={{
            background: `rgb(${colorValues.rgb.red}, ${colorValues.rgb.green}, ${colorValues.rgb.blue})`
          }}
        ></div>
        <div className='author'>
          <a 
            href='https://sihlemkaza.com' target="_blank" rel="noreferrer"
            className='author-link'
          >Sihle Mkaza </a> &copy; 2022
        </div>
    </div>
  )
}

export default ColorStage