import React from 'react'
import './currentUpdates-metadata-container.styles.scss'
import { AiOutlineInfoCircle } from "react-icons/ai";
import {Link} from 'react-router-dom'

const CurrentUpdatesMetaDataContainer = ({num, baseVersion, targetVersion, created}) => (
    <div className = 'currentUpdates-metadata-container'>
        <p className = 'currentUpdates-grid-content'>{num}</p>
        <p className = 'currentUpdates-grid-content'>{baseVersion}</p>
        <p className = 'currentUpdates-grid-content'>{targetVersion}</p>
        <p className = 'currentUpdates-grid-content'>{created}</p>
        <Link className = 'currentUpdates-grid-content' to ={'/currentUpdates/'+num}><AiOutlineInfoCircle /></Link>
    </div>
)

export default CurrentUpdatesMetaDataContainer
