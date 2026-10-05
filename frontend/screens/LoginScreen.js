import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator
} from "react-native";

import { iniciarSesion } from "../services/authService";
import { guardarToken } from "../services/authStorage";

export default function LoginScreen({ navigation }) {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);

  const realizarLogin = async () => {
    if (!correo.trim() || !password.trim()) {
      Alert.alert("Campos requeridos", "Ingrese correo y contraseña");
      return;
    }

    try {
      setCargando(true);

      const respuesta = await iniciarSesion(correo.trim(), password);

      console.log("Usuario autenticado:", respuesta);

      // Guardar el token
      await guardarToken(respuesta.token);

      // Ir a productos (replace evita volver al login con "atrás")
      navigation.replace("Productos");
    } catch (error) {
      console.error("Error de login:", error);
      Alert.alert("Error de inicio de sesión", error.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>TiendaApp</Text>
      <Text style={styles.subtitulo}>Iniciar sesión</Text>

      <Text style={styles.label}>Correo electrónico</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese su correo"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={correo}
        onChangeText={setCorreo}
      />

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese su contraseña"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      {cargando ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button title="Ingresar" onPress={realizarLogin} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20
  },
  titulo: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10
  },
  subtitulo: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 30
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20
  }
});
