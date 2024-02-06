import { View, Text, StyleSheet, TextInput, Modal, Button } from "react-native";
import { useState } from "react";
import uuid from "react-native-uuid";

const AgregarTareas = ({ isVisible, onToggleModal, onSaveTask }) => {
  const [datosTarea, setDatosTarea] = useState({
    titulo: "",
    descripcion: "",
    completa: false,
  });
  const handleSaveTask = () => {
    if (
      datosTarea.titulo.trim() === "" ||
      datosTarea.descripcion.trim() === ""
    ) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    const newTarea = {
      ...datosTarea,
      fechaCreacion: new Date().toLocaleString(),
      id: uuid.v4(),
    };

    onSaveTask(newTarea);
    onToggleModal();
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onToggleModal}
    >
      <View
        style={[
          styles.container,
          { flex: 1, justifyContent: "center", alignItems: "center" },
        ]}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
            width: 300,
          }}
        >
          <Text>Nombre de la Tarea:</Text>
          <TextInput
            value={datosTarea.titulo}
            onChangeText={(text) =>
              setDatosTarea({ ...datosTarea, titulo: text })
            }
            placeholder="Ingrese el nombre"
          />

          <Text>Descripción:</Text>
          <TextInput
            style={styles.input}
            value={datosTarea.descripcion}
            onChangeText={(text) =>
              setDatosTarea({ ...datosTarea, descripcion: text })
            }
            placeholder="Ingrese la descripción"
            multiline={true}
            numberOfLines={4}
          />

          <Button title="Guardar" onPress={handleSaveTask} />

          <Button title="Cancelar" onPress={onToggleModal} />
        </View>
      </View>
    </Modal>
  );
};

export default AgregarTareas;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#872FF5",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 12,
  },
  input: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#4F0AC5",
    marginHorizontal: 10,
    marginVertical: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    color: "#3E0A96",
    fontSize: 17,
    textAlignVertical: "top",
  },
});
