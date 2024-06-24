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
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useRegisterUser } from "../hooks/useRegisterUser";

const schema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

type UserSchema = z.infer<typeof schema>;

const UserRegistration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowButton = () => setShowPassword(!showPassword);
  const { mutate, isLoading, error } = useRegisterUser();
  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSchema>({ resolver: zodResolver(schema) });

  const onSubmit = async (user: UserSchema) => {
    mutate(user);
    return navigate("/login");
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
            <AlertDescription>{error.message}</AlertDescription>
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
            <FormLabel>Email</FormLabel>
            <Input
              {...register("email")}
              focusBorderColor="teal.600"
              placeholder="Email Address"
            />
            {errors.email && (
              <p className="text-danger">{errors.email.message}</p>
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
                <Button h="1.75rem" size="sm" onClick={handleShowButton} colorScheme="teal">
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
            Register
          </Button>
        </form>
      </Box>
    </Center>
  );
};

export default UserRegistration;
