import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import AgregarTareas from "./src/components/AgregarTareas";
import TodasTareas from "./src/components/TodasTareas";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useState, useEffect } from "react";

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tarea, setTarea] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [resultadosBusqueda, setResultadosBusqueda] = useState([]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const guardarTarea = (newTarea) => {
    setTarea([...tarea, newTarea]);
    toggleModal();
  };
  
  const handleEliminarTarea = (tareaDelete) => {
    setTarea(tarea.filter((t) => t.id != tareaDelete.id));
  };

  const handlerModCompleta = (id) => {
    setTarea(
      tarea.map((t) => {
        if (t.id === id)
          return {
            ...t,
            fechaActualizacion: new Date().toLocaleString(),
            ...{ completa: !t.completa },
          };
        return t;
      })
    );
  };

  const handleBusqueda = (elemento) => {
    setBusqueda(elemento);
    const resultados = tarea.filter(
      (tarea) =>
        tarea.titulo.toLowerCase().includes(elemento.toLowerCase()) ||
        tarea.descripcion.toLowerCase().includes(elemento.toLowerCase())
    );
    setResultadosBusqueda(resultados);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Mis tareas</Text>
      <View style={styles.inputContainer}>
        <Icon
          name="search"
          size={20}
          color="#FFFFFF"
          style={styles.iconoLupa}
        />
        <TextInput
          style={styles.input}
          placeholder="Buscar tareas"
          value={busqueda}
          onChangeText={handleBusqueda}
        />
      </View>
      <AgregarTareas
        isVisible={modalVisible}
        onToggleModal={toggleModal}
        onSaveTask={guardarTarea}
      />
      {/* Mostrar resultados de la búsqueda */}
      {busqueda !== "" && (
        <TodasTareas
          tareas={resultadosBusqueda}
          onEliminar={handleEliminarTarea}
          updateTareaCompleta={handlerModCompleta}
        />
      )}

      {/* Mostrar todas las tareas si no hay búsqueda */}
      {busqueda === "" && (
        <TodasTareas
          tareas={tarea}
          onEliminar={handleEliminarTarea}
          updateTareaCompleta={handlerModCompleta}
        />
      )}

      {/* <TodasTareas tareas={tarea} /> */}
      <View
        style={[
          styles.Plus,
          { flexDirection: "row", justifyContent: "space-around", padding: 16 },
        ]}
      >
        <TouchableOpacity onPress={toggleModal}>
          <Icon name="plus-circle" size={30} color="#007BFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    flex: 1,
    paddingTop: 30,
  },
  txt: {
    fontSize: 28,
    textAlign: "center",
    color: "#FFFFFF",
    marginBottom: 20,
    fontWeight: "bold",
  },

  Plus: {
    alignSelf: "center",
    position: "absolute",
    bottom: 20, // Espacio desde el borde inferior
    right: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: "#3E0A96",
    backgroundColor: "#404348",
  },
  iconoLupa: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: "#A3AAB8",
  },
});
