import React, { Component } from 'react';

class Login extends Component {
  //state menyimpan data    
    state = {
        credentials: {username:'', password:''}
    }

  //Menghandle onClick pada button event
  //Mengambil data dari django api
    login = event => {
        console.log(this.state.credentials);
        fetch('http://127.0.0.1:8000/auth/',{
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(this.state.credentials)    
        })
        .then(data => data.json())//Mengambil data bentuk json
        .then(
          data => {
            console.log(data.token);//menyimpan data di local storage
          }
        ).catch( error => console.error(error))
    }
  
  //Menghandle onChange pada form input
    inputChanged = event => {
        const cred = this.state.credentials; //memilih dari state
        cred[event.target.name] = event.target.value;//mengambil nilai dari value
        this.setState({credentials: cred});// mengembalikan nilai ke state
    }
    
    render() {
        return (
            <div>
              <h1>Login user form</h1>

              <label>
                  Username
                  <input type="text" name="username" 
                    value={this.state.credentials.username} 
                    onChange={this.inputChanged} 
                    />
              </label>
              <br/>
              <label>
                  Password
                  <input type="password" name="password"
                    value={this.state.credentials.password} 
                    onChange={this.inputChanged}
                  />
              </label>
              <br/>
              <button onClick={this.login}>Login</button>
            </div>
          );
    }
  }
  
  export default Login;