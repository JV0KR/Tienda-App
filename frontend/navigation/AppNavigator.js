import React, { useEffect } from "react";
import { Button, Alert } from "react-native";
import {
  NavigationContainer,
  createNavigationContainerRef
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import ProductosScreen from "../screens/ProductosScreen";
import { eliminarToken } from "../services/authStorage";
import { registrarSesionExpirada } from "../services/api";

const Stack = createNativeStackNavigator();
const navigationRef = createNavigationContainerRef();

export default function AppNavigator() {
  // Si el token vence, volver al login automáticamente.
  useEffect(() => {
    registrarSesionExpirada(() => {
      if (navigationRef.isReady()) {
        navigationRef.reset({ index: 0, routes: [{ name: "Login" }] });
      }
      Alert.alert(
        "Sesión expirada",
        "Vuelve a iniciar sesión para continuar"
      );
    });
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Iniciar sesión" }}
        />
        <Stack.Screen
          name="Productos"
          component={ProductosScreen}
          options={({ navigation }) => ({
            title: "Productos",
            headerBackVisible: false,
            headerRight: () => (
              <Button
                title="Salir"
                onPress={async () => {
                  await eliminarToken();
                  navigation.replace("Login");
                }}
              />
            )
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
