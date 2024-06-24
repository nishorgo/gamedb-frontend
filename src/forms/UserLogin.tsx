import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { redirect, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAuthStore } from "../stores/authStore";

const schema = z.object({
  username: z.string().min(3),
  password: z.string().min(8),
});

type LoginSchema = z.infer<typeof schema>;

const UserLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleShowButton = () => setShowPassword(!showPassword);
  const { login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({ resolver: zodResolver(schema) });

  const onSubmit = async (user: LoginSchema) => {
    setIsLoading(true);

    try {
      await login(user.username, user.password);
    } catch (error) {
      const errorMessage = (error instanceof Error) ? error.message : 'Login failed';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
      return navigate('/');
    }
  };

  return (
    <Center display="flex" alignItems="center" height="100vh" padding={5}>
      <Box
        borderWidth={2}
        borderRadius={10}
        borderColor="teal.600"
        bgColor="gray.800"
        padding={10}
        width={500}
      >
        {error && (
          <Alert marginBottom={5} borderRadius={5} status="error">
            <AlertIcon />
            <AlertTitle>Error:</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl marginBottom={5}>
            <FormLabel>Username</FormLabel>
            <Input
              {...register("username")}
              focusBorderColor="teal.600"
              placeholder="Username"
            />
            {errors.username && (
              <p className="text-danger">{errors.username.message}</p>
            )}
          </FormControl>

          <FormControl marginBottom={5}>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
              <Input
                {...register("password")}
                focusBorderColor="teal.600"
                pr="4.5rem"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={handleShowButton}
                  colorScheme="teal"
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            {errors.password && (
              <p className="text-danger">{errors.password.message}</p>
            )}
          </FormControl>
          <Button
            isLoading={isLoading}
            colorScheme="teal"
            loadingText="Submitting"
            type="submit"
          >
            Login
          </Button>
        </form>
      </Box>
    </Center>
  );
};

export default UserLogin;
