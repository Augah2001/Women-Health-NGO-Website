import { Stack, Button } from "@chakra-ui/react";

interface Props {
  label: string;
}

const FormButton = ({ label }: Props) => {
  return (
    <Stack  spacing={10} pt={2}>
      <Button
      marginY = "30px"
        type="submit"
        size="lg"
        bg={"pink.600"}
        color={"white"}
        _hover={{
          bg: "pink.500",
        }}
        w={"full"}
        // onClick={handleSubmit(onSubmit)}
      >
        {label}
      </Button>
    </Stack>
  );
};

export default FormButton;
