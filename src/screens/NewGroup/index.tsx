import { useState } from "react";
import { Highlight } from "@components/Highlight";
import { Container, Content, Icon } from "./style";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";
import { Alert } from "react-native";

export function NewGroup() {
  const navigation = useNavigation();
  const [group, setGroup] = useState("");

  async function handleNew() {
    if (group.trim().length === 0) {
      return Alert.alert("Novo Grupo", "Informe o nome da turma.");
    }

    try {
      await groupCreate(group);
      navigation.navigate("players", { group });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Novo grupo", error.message);
      } else {
        Alert.alert("Novo Grupo", "Não foi possível criar um novo grupo");
        console.log(error);
      }
    }
  }

  return (
    <Container>
      <Content>
        <Icon />
        <Highlight
          title="Nova Turma"
          subtitle="crie a turma para adicionar as pessoas"
        />

        <Input placeholder="Nome da turma" onChangeText={setGroup} />

        <Button title="criar" style={{ marginTop: 20 }} onPress={handleNew} />
      </Content>
    </Container>
  );
}
