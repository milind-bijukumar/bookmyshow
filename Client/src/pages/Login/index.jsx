import { Button, Checkbox, Form, Input, message } from 'antd';
import {Link, useNavigate} from "react-router-dom";
import { LoginUser } from '../../api/auth';

const Login = ()=>{

    const navigate = useNavigate();

    const onLogin= async (values)=>{
        const {email, password} = values;
        const input = {email,password}
        const response  = await LoginUser(input);
        if (response.success){
            message.success(response.message);

            const accessToken= response.accessToken;
            localStorage.setItem("token",accessToken);

            navigate("/");
        }else{
            message.error(response.message);
        }
    }

    return (
        <>
            <header className='App-header'>
                <main className='main-area mw-500 text-center'>
                    <section>
                        <h1>Login to BookMyShow</h1>
                    </section>
                    <section>
                        <Form 
                            name='basic' 
                            layout='vertical'
                            onFinish={onLogin}
                            >
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
                                Login
                            </Button>
                        </Form.Item>
                        </Form>
                        <p>New User? <Link to='/register'>Register Here</Link></p>
                    </section>
                </main>
            </header>    
        </>
    )
}
export default Login;