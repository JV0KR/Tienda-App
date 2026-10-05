import React from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";

export default function ProductoCard({ producto, onPress }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: producto.imagen }} style={styles.imagen} />
      <Text style={styles.nombre}>{producto.nombre}</Text>
      <Text style={styles.precio}>
        ${producto.precio.toLocaleString("es-CO")}
      </Text>
      <Button title="Ver detalle" onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15
  },
  imagen: {
    width: "100%",
    height: 180,
    borderRadius: 8,
    marginBottom: 10
  },
  nombre: {
    fontSize: 20,
    fontWeight: "bold"
  },
  precio: {
    fontSize: 18,
    marginVertical: 8
  }
});
