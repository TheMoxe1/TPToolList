import React from 'react';
import { View, Text, StyleSheet, Pressable, CheckBox } from 'react-native';

export default function TaskItem({ tarea, index, onChange }) {
  return (
    <View style={styles.item}>
      <CheckBox value={tarea.completada} onValueChange={onChange} />
      <Text style={[styles.text, tarea.completada && styles.completed]}>
        {tarea.texto}
      </Text>
      <Text style={styles.date}>
        Fecha de creación: {tarea.fechaCreacion.toLocaleDateString()} {tarea.fechaCreacion.toLocaleTimeString()}
      </Text>
      <Text style={styles.date}>
        Fecha de realización: {tarea.fechaRealizacion ? tarea.fechaRealizacion.toLocaleDateString() + ' ' + tarea.fechaRealizacion.toLocaleTimeString() : 'Pendiente'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 5,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    marginLeft: 10,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  date: {
    color: '#888',
    fontSize: 12,
  },
});
