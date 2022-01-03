import React, {Component} from 'react';
import './App.css';
import Navigation from './component/Navigation/Navigation';
import Signin from './component/Signin/Signin';
import Register from './component/Register/Register';
import Logo from './component/Logo/Logo';
import ImageLinkForm from './component/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './component/FaceRecognition/FaceRecognition';
import Rank from './component/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: 'f4f165208620453888ab632c7eb696b8'
});
const particlesOptions  = {
            		particles: {
            			number: {
            				value: 30,
            				density: {
            					enable:true,
            					value_area:800
            				}
            			}
            		}
            	}
class App extends Component {

	constructor(){
		super();
		this.state = {
			input: '',
			imageUrl:'',
			box: {},
			route:'signin',
			isSignedIn: false,
			user:{
			   id: '',
			   name: '',
			   email: '',
			   entries: 0,
			   joined: ''
			}

		}
	}

	onInputChange = (event) =>{
		console.log(event.target.value);
		this.setState({input:event.target.value});
	}

	onSubmitClick = () =>{
		this.setState({imageUrl:this.state.input});
			fetch('https://ancient-caverns-91973.herokuapp.com/apiclarifai',{
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body:JSON.stringify({
					input:this.state.input,
				})
			})
			.then(response =>{ 
				//console.log(response);
			 	if(response){
			 		
					fetch('https://ancient-caverns-91973.herokuapp.com/image',{
						method: 'put',
						headers: {'Content-Type': 'application/json'},
								body:JSON.stringify({
								  id:this.state.user.id,
							})
							})
					.then(response => response.json())
					.then(data => {
						if(data){
	
			 				this.setState(Object.assign(this.state.user, {entries:data}));
			 	}
			 }).catch(console.log)
			 	}

				 				this.displayFaceBox(this.calculateFaceLocation(response));
				 								// console.log(err));
})

}

		// app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input).then(
		// 	response=>{
		// 		if(response){
		// 			fetch('https://ancient-caverns-91973.herokuapp.com/image',{
		// 				method: 'put',
		// 				headers: {'Content-Type': 'application/json'},
		// 						body:JSON.stringify({
		// 						  id:this.state.user.id,
		// 					})
		// 					})
		// 			.then(response => response.json())
		// 			.then(data => {
		// 				if(data){
	
		// 					this.setState(Object.assign(this.state.user, {entries:data}));
		// 		}
		// 	})
		// 		}

		// 		this.displayFaceBox(this.calculateFaceLocation(response))}).catch(err=>
		// 		console.log(err));

			
			
	}

	displayFaceBox = (box) =>{
		console.log(box);
		this.setState({box:box});
	}

	calculateFaceLocation = (data) =>{
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
		console.log(clarifaiFace);
		const image = document.getElementById('inputImage');
		const width = Number(image.width);
		const height = Number(image.height);

		return {
			leftCol : clarifaiFace.left_col * width,
			topRow : clarifaiFace.top_row * height,
			rightCol : width- (clarifaiFace.right_col * width),
			bottomRow : height - (clarifaiFace.bottom_row * height)

		}
		console.log(width,height);

	}

	onSigninClick = (route) =>{
		let status = this.state.isSignedIn;
		route==='home' ? status = true : status= false;
		this.setState({
			route : route,
			isSignedIn: status,
		})			
	} 

	loadUser = (data) =>{
		this.setState({user:{
			   id: data.id,
			   name: data.name,
			   email: data.email,
			   entries: data.entries ,
			   joined: data.joined
		}
		});
	}



	render(){
  return (
    <div className="App">
            <Particles className="particles"
               params={particlesOptions} />    		
    		<Navigation onSigninClick={this.onSigninClick} isSignedIn = {this.state.isSignedIn} /> 

    		{this.state.route==='signin' ?
    		<Signin loadUser={this.loadUser} onSigninClick={this.onSigninClick}/>
    		:
    		(
    			this.state.route==='home'?
    		<div>
    		<Logo />
    		<Rank  name = {this.state.user.name}  entries = {this.state.user.entries}/>
    		<ImageLinkForm onInputChange={this.onInputChange} onSubmitClick={this.onSubmitClick} />
    		<FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
    		</div>
    		:
    		<Register loadUser={this.loadUser} onSigninClick={this.onSigninClick} />
    		)
    	}
    </div>
  );
	}
}

export default App;
