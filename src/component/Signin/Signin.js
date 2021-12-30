import React from 'react';

class Signin extends React.Component{
	
	constructor(props){
		super(props);

		this.state = {
			signInEmail:'',
			signInPassword:''
		}
	}

	onEmailChange = (event) =>{
			this.setState({signInEmail: event.target.value});
	}


	onPasswordChange = (event) =>{
			this.setState({signInPassword: event.target.value});
	}

	onSubmitSignIn = () =>{
		if(this.state.signInEmail && this.state.signInPassword){

			fetch('https://ancient-caverns-91973.herokuapp.com/signin',{
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body:JSON.stringify({
					email:this.state.signInEmail,
					password:this.state.signInPassword
				})
			})
			.then(response => response.json())
			.then(data => {
				if(data.id){
					
					this.props.loadUser(data);
						this.props.onSigninClick('home');

				}
			})
		}else{
			console.log('Credentials not set')
		}

	}
	render(){

	const {onSigninClick} = this.props;	
		return(
				<div className="center">
	<main class="pa5 black-80 shadow-5">
		  <form class="measure ">
		    <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
		      <legend class="f4 fw6 ph0 mh0">Sign In</legend>
		      <div class="mt3">
		        <label class="db fw6 lh-copy f6" for="email-address">Email</label>
		        <input onChange={this.onEmailChange} class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
		      </div>
		      <div class="mv3">
		        <label class="db fw6 lh-copy f6" for="password">Password</label>
		        <input onChange={this.onPasswordChange} class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
		      </div>
		    </fieldset>
		    <div class="">
		      <p onClick={this.onSubmitSignIn} class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in">Sign in </p>
		    </div>
		    <div class="lh-copy mt3">
		      <p onClick={() => onSigninClick('register')} href="#0" class="f6 link dim black db">Sign up</p>
		      
		    </div>
		  </form>
	</main>

				</div>
			);
	}
}

export default Signin;