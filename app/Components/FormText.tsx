import { Stack, Text, Link } from "@chakra-ui/react";
import { Link as LinkRouter } from "react-router-dom";

interface Props {
  route: string;
  text: string | null;
  linkText: string | null;
}

export const FormText = ({ route, text, linkText }: Props) => {
  return (
    
    <Stack pt={6}>
      <Text align={"center"}>
        {text + " "}
        <LinkRouter to={route}>
          {" "}
          <Link color="pink.400">{linkText}</Link>
        </LinkRouter>
      </Text>
    </Stack>
  );
};

export default FormText;
