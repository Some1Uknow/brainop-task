import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RegisterScreen = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [inputs,setInputs] = useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:""
})

 
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };


  const submitHandler = async (e) => {
    e.preventDefault();

    if (inputs.password !== inputs.confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await fetch("/api/users",{
          method:"POST",
          headers:{
              "Content-Type":"application/json",
          },
          body:JSON.stringify(inputs)
      })
      const data = await res.json();
      console.log(data);
      } catch (err) {
        toast.error( err.error);
      }
    }
  };
  return (
    <FormContainer>
      <h1>Register</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={inputs.name}
            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={inputs.email}
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={inputs.confirmPassword}
            onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
          ></Form.Control>
        </Form.Group>

        <div>
      <label>
        <input
          type="checkbox"
          className='margin-right'
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        I agree to the terms and conditions
      </label>
    </div>


        <Button type='submit' variant='primary' className='mt-3'>
          Register
        </Button>

        {isLoading && <Loader />}
      </Form>

      <Row className='py-3'>
        <Col>
          Already have an account? <Link to={`/login`}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;