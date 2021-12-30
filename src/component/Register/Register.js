import React from 'react';

class Register extends React.Component{

	constructor(props){
		super(props);

		this.state = {
			email: '',
			password: '',
			name: ''
		}
	}

	onNameChange = (event) =>{
			this.setState({name: event.target.value});
	}

	onEmailChange = (event) =>{
			this.setState({email: event.target.value});
	}

	onPasswordChange = (event) =>{
			this.setState({password: event.target.value});
	}

	onSubmitSignIn = () =>{
			fetch('https://ancient-caverns-91973.herokuapp.com/register',{
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body:JSON.stringify({
					email:this.state.email,
					password:this.state.password,
					name: this.state.name
				})
			})
			.then(response => response.json())
			.then(user => {
				if(user){
					this.props.loadUser(user);
			
						this.props.onSigninClick('home');

				}
			})

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
		        <label class="db fw6 lh-copy f6" for="email-address">Fullname</label>
		        <input onChange={this.onNameChange} class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="fullname"  id="fullName" />
		      </div>
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
		      <p onClick={this.onSubmitSignIn} class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value=""> Register </p>
		    </div>
		    <div class="lh-copy mt3">
		      <p onClick={() => onSigninClick('signin')} href="#0" class="f6 link dim black db">Sign in</p>
		      
		    </div>
		  </form>
	</main>

				</div>
			);
	}
}

export default Register;