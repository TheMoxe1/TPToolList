import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert } from 'react-native';

export default function App() {
  const [tarea, setTarea] = useState('');
  const [tareas, setTareas] = useState([]);

  const agregarTarea = () => {
    if (tarea.trim() !== '') {
      const nuevaTarea = {
        texto: tarea,
        fechaCreacion: new Date(),
        fechaRealizacion: null,
        completada: false,
      };
      setTareas([...tareas, nuevaTarea]);
      setTarea('');
    }
  };

  const alternarTarea = (index) => {
    const nuevasTareas = [...tareas];
    nuevasTareas[index].completada = !nuevasTareas[index].completada;
    nuevasTareas[index].fechaRealizacion = nuevasTareas[index].completada ? new Date() : null;
    setTareas(nuevasTareas);
  };

  const mostrarTareaRapida = () => {
    const tareaRapida = tareas
      .filter((t) => t.completada)
      .sort((a, b) => {
        const tiempoA = a.fechaRealizacion - a.fechaCreacion;
        const tiempoB = b.fechaRealizacion - b.fechaCreacion;
        return tiempoA - tiempoB;
      })[0];
    if (tareaRapida) {
      Alert.alert('Tarea más rápida', `La tarea más rápida fue: "${tareaRapida.texto}"`);
    } else {
      Alert.alert('No hay tareas completadas aún.');
    }
  };

  const borrarTodas = () => {
    setTareas([]);
  };

  const formatoFecha = (fecha) => {
    return `${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de Tareas</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribir tarea aquí"
          value={tarea}
          onChangeText={setTarea}
        />
        <Button title="Agregar" onPress={agregarTarea} />
      </View>
      <View style={styles.buttonsContainer}>
        <Button title="Rápida" onPress={mostrarTareaRapida} color="#008CBA" />
        <Button title="Borrar todo" onPress={borrarTodas} color="#008CBA" />
      </View>
      <FlatList
        data={tareas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.tareaContainer}>
            <Text
              style={[styles.tareaTexto, item.completada && styles.tareaCompletada]}
              onPress={() => alternarTarea(index)}
            >
              {item.texto}
            </Text>
            <Text style={styles.fechaTexto}>Fecha de creación: {formatoFecha(item.fechaCreacion)}</Text>
            <Text style={styles.fechaTexto}>
              Fecha de realización: {item.fechaRealizacion ? formatoFecha(item.fechaRealizacion) : 'Pendiente'}
            </Text>
          </View>
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 4,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tareaContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 4,
    marginBottom: 10,
  },
  tareaTexto: {
    fontSize: 16,
  },
  tareaCompletada: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  fechaTexto: {
    color: '#888',
    fontSize: 12,
  },
});
