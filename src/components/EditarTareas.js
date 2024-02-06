import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';

const EditarTareas = ({ tarea, onGuardar, onClose }) => {
    const [datosTarea, setDatosTarea] = useState(tarea);

    useEffect(() => {
      setDatosTarea(tarea);
    }, [tarea]);
  
    const handleGuardar = () => {
      // Puedes agregar validaciones u otras lógicas antes de guardar
      onGuardar(datosTarea);
      onClose();
    };
  return (
    <View style={styles.container}>
    
    <TextInput
      value={datosTarea.titulo}
      onChangeText={(text) => setDatosTarea({ ...datosTarea, titulo: text })}
      placeholder="Ingrese el nombre"
    />
    <TextInput
      value={datosTarea.descripcion}
      onChangeText={(text) => setDatosTarea({ ...datosTarea, descripcion: text })}
      placeholder="Ingrese la descripción"
      multiline={true}
      numberOfLines={4}
    />
    <Button title="Guardar" onPress={handleGuardar} />
    <Button title="Cancelar" onPress={onClose} />
  </View>
  )
}

export default EditarTareas

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
})