import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';
import login from "../../../assets/images/login.png";
import logo from "../../../assets/images/logos/logo.png"

function App() {
  return (
    <MDBContainer className="my-5">

      <MDBCard>
        <MDBRow className='g-0'>

          <MDBCol md='8'>
            <MDBCardImage src={login}  alt="login form" className='rounded-start w-100 h-100'/>
          </MDBCol>

          <MDBCol md='4'>
            <MDBCardBody className='d-flex flex-column'>

              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                <MDBCardImage src={logo}  alt="logo" className='rounded-start w-100 h-100'/>
              </div>
              <center>
              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Log in to continue</h5>
              </center>

              <MDBBtn className="mb-4 " color='light' size='lg'>Login with Onelogin</MDBBtn>
              <center><p>Or continue with</p></center>

                <MDBInput wrapperClass='mb-4' placeholder='Email address' id='formControlLg' type='email' size="lg"/>
                <MDBInput wrapperClass='mb-4' placeholder='Password' id='formControlLg' type='password' size="lg"/>

              <MDBBtn className="mb-4 " color='dark' size='lg'>Sign in</MDBBtn>
              {/* <a className="small text-muted" href="#!">Forgot password?</a>
              <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <a href="#!" style={{color: '#393f81'}}>Register here</a></p> */}

        
              <div className='d-flex flex-row justify-content-center'>
                <a href="#!" className="small text-muted me-1">Terms of use|</a>
                <a href="#!" className="small text-muted">Privacy policy</a>
              </div>
             

            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
  );
}

export default App;
