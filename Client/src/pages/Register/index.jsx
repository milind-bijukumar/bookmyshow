import { Button, Checkbox, Form, Input, message } from 'antd';
import {Link, useNavigate} from "react-router-dom";
import { RegisterUser } from '../../api/auth';

const Register = ()=>{

    const navigate = useNavigate();

    const onRegister = async (values)=>{
        // console.log(values);
        const {name,email,password}= values;
        const input = {name, email, password};

        const response = await RegisterUser(input);
        // console.log(response.success);
        if(response.success){
            message.success(response.message);
            navigate("/login");
        }else{
            message.error(response.message);
        }
    }

    return (
        <>
            <header className='App-header'>
                <main className='main-area mw-500 text-center'>
                    <section>
                        <h1>Register to BookMyShow</h1>
                    </section>
                    <section>
                        <Form 
                        name='basic' 
                        layout='vertical'
                        onFinish={onRegister}
                        >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                {
                                required: true,
                                message: 'Name is required!',
                                },
                            ]}
                            >
                            <Input id='name' type='text' placeholder='Enter your Name'/>
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                required: true,
                                message: 'Email is required!',
                                },
                            ]}
                            >
                            <Input id='email' type='email' placeholder='Enter your Email'/>
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                required: true,
                                message: 'Password is required!',
                                },
                            ]}
                            >
                            <Input.Password id='password' placeholder='Enter your Password'/>
                        </Form.Item>
                        <Form.Item label={null}>
                            <Button block type="primary" htmlType="submit">
                                Register
                            </Button>
                        </Form.Item>
                        </Form>
                        <p>Already a User? <Link to='/login'>Login now</Link></p>
                    </section>
                </main>
            </header> 
        </>
    )
}
export default Register;