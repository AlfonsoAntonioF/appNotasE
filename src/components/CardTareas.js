import {
  StyleSheet,
  Text,
  View,
  Switch,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import React from "react";
import { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";

const CardTareas = ({ item, onEliminar, updateTareaCompleta }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleEliminar = () => {
    setModalVisible(true);
  };

  const handleConfirmarEliminar = () => {
    onEliminar(item);
    setModalVisible(false);
  };

  const handleCancelarEliminar = () => {
    setModalVisible(false);
  };

  return (
    <View
      style={[
        styles.taskCard,
        { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" },
      ]}
    >
      <Text style={styles.text}>Titulo: {item.titulo}</Text>
      <Text style={styles.text}>Descripcion: {item.descripcion}</Text>
      <Text style={styles.text}>Fecha de Creacion: {item.fechaCreacion}</Text>
      <Text style={styles.text}>Ultima Actualizacion: {item.fechaActualizacion}</Text>
      
      <View>
        <Switch
          value={item.completa}
          onValueChange={() => updateTareaCompleta(item.id)}
        />
        <Text style={styles.textCompleted}>
          {item.completa ? "Completada" : "Pendiente"}
        </Text>
      </View>
      {/* Boton Eliminar */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={handleEliminar}>
          <Icon style={styles.button2} name="trash" size={24} color="#e74c3c" />
        </TouchableOpacity>
      </View>

      {/* Modal de Confirmación para Eliminar */}
      <Modal transparent={true} animationType="slide" visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>¿Estás seguro de que deseas eliminar esta tarea?</Text>
            <Button
              style={styles.confirmar}
              title="Confirmar"
              onPress={handleConfirmarEliminar}
            />
            <Button
              style={styles.cancelar}
              title="Cancelar"
              onPress={handleCancelarEliminar}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CardTareas;

const styles = StyleSheet.create({
  taskCard: {
    backgroundColor: "#2A2B2D",
    padding: 20,
    marginHorizontal: 10,
    marginVertical: 10,
    alignItems: "flex-start",
    borderRadius: 5,
    gap: 25,
  },
  text: {
    width: "100%",
    color: "white",
    fontSize: 18,
  },
  completedContanier: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 15,
  },
  textCompleted: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  button1: {
    alignItems: "flex-start",
    justifyContent: "space-around",
    marginRight: 56,
  },
  button2: {
    marginLeft: 56,
    alignContent: "center",
    alignItems: "center",
  },
  confirmar: {
    color: "green",
    fontWeight: "bold",
    backgroundColor: "green",
  },
});
