import {
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    VStack,
    Button,
    useToast
} from '@chakra-ui/react';
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [pic, setPic] = useState('');
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const history = useHistory();

    const handlePasswordClick = () => setShowPassword(!showPassword);
    const handleConfirmPasswordClick = () => setShowConfirmPassword(!showConfirmPassword);

    const postDetails = (pics) => {
        setLoading(true);
        if (!pics) {
            toast({
                title: 'Please Select an Image!',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            setLoading(false);
            return;
        }
        console.log('Selected File:', pics);
        if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
            const data = new FormData();
            data.append('file', pics);
            data.append('upload_preset', 'Chat-X');
            data.append('cloud_name', 'dp9cximeq');
            console.log('Uploading to Cloudinary...');
            fetch("https://api.cloudinary.com/v1_1/dp9cximeq/image/upload", {
                method: 'post',
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log('Cloudinary Response:', data);
                    if (data.url) {
                        setPic(data.url.toString());
                    } else {
                        toast({
                            title: 'Upload failed!',
                            status: 'error',
                            duration: 5000,
                            isClosable: true,
                            position: 'bottom',
                        });
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    console.log('Upload Error:', err);
                    toast({
                        title: 'Upload Error!',
                        description: err.message,
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                        position: 'bottom',
                    });
                    setLoading(false);
                });
        } else {
            toast({
                title: 'Please Select a valid Image (JPEG/PNG)!',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            setLoading(false);
        }
    };

    const submitHandler = async () => {
        setLoading(true);

        if (!name || !email || !password || !pic) {
            toast({
                title: 'Please fill all the fields',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            toast({
                title: 'Passwords do not match',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.post('/api/user', { name, email, password, pic }, config);
            console.log(JSON.stringify(data));
            toast({
                title: 'Registration Successful!',
                description: 'You have successfully registered!',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            localStorage.setItem('userInfo', JSON.stringify(data));
            setLoading(false);
            history.push('/chats');

        } catch (error) {
            console.error('Error:', error);

            toast({
                title: 'Error occurred!',
                description: error.response && error.response.data.message
                    ? error.response.data.message
                    : 'Something went wrong. Please try again.',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            setLoading(false);
        }
    };

    return (
        <VStack spacing='5px' color='black'>
            <FormControl id='name' isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    placeholder='Enter Your Name'
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>

            <FormControl id='email' isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    placeholder='Enter Your Email'
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>

            <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={showPassword ? "text" : 'password'}
                        placeholder='Enter Your Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handlePasswordClick}>
                            {showPassword ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl id='confirm-password' isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                    <Input
                        type={showConfirmPassword ? "text" : 'password'}
                        placeholder='Confirm Password'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleConfirmPasswordClick}>
                            {showConfirmPassword ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl id='pic' isRequired>
                <FormLabel>Upload Your Picture</FormLabel>
                <InputGroup>
                    <Input
                        type="file"
                        p='1.5'
                        accept='image/*'
                        placeholder='Upload Your Picture'
                        onChange={(e) => postDetails(e.target.files[0])}
                    />
                </InputGroup>
            </FormControl>

            <Button
                colorScheme='blue'
                width='100%'
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading}
            >
                Sign Up
            </Button>
        </VStack>
    );
}

export default Signup;
