import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert
} from "react-native";

import ProductoCard from "../components/ProductoCard";
import { obtenerProductos } from "../services/productoService";

export default function ProductosScreen() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargarProductos = async () => {
    try {
      setCargando(true);
      const data = await obtenerProductos();
      setProductos(data);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudieron cargar los productos");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  if (cargando) {
    return (
      <View style={styles.cargando}>
        <ActivityIndicator size="large" />
        <Text>Cargando productos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Productos</Text>

      <FlatList
        data={productos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductoCard
            producto={item}
            onPress={() => Alert.alert(item.nombre, item.descripcion)}
          />
        )}
        ListEmptyComponent={<Text>No hay productos disponibles.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15
  },
  cargando: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
