import React from 'react';
import './ImageLinkForm.css';
const ImageLinkForm = ({onInputChange, onSubmitClick}) =>{
	return(
		<div>
			<p className="p3">
				{'This magic brain will detect faces in the picture. give it a trial'}
			</p>

			<div className="center">
				<div className="pa5 shadow-5 w-50 center">
					<input className="f4 pa2 w-70 center" type="text" onChange={onInputChange} />
					<button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={onSubmitClick}>Detect</button>
				</div>
			</div>
		</div>
		);
}

export default ImageLinkForm;