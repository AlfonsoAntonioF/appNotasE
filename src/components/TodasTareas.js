import { StyleSheet, Text, View, FlatList, Switch } from 'react-native'
import React from 'react'
import CardTareas from './CardTareas';

const TodasTareas = ({tareas, onEliminar, updateTareaCompleta}) => {
 
  return (
    <View>
      <FlatList
      data={tareas}
      keyExtractor={(item) => (item ? item.id.toString() : '')}  
      renderItem ={({item})  => (
        <CardTareas item={item}  
        onEliminar={() => onEliminar(item)}
        updateTareaCompleta= {updateTareaCompleta}
      />
      )}

    />
    </View>
  )
}

export default TodasTareas

const styles = StyleSheet.create({
    txt:{
        color:'white'
    }
})