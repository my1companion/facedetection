import React from 'react';
//import './ImageLinkForm.css';

const Rank = ({name,entries}) =>{
	return(
		<div>
			<div className="f3 white">
				{`${name}, your current rank is ...`}
			</div>

			<div className="f1">
				{`# ${entries}`}
			</div>
		</div>
		);
}

export default Rank;