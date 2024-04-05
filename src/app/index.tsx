import { useState } from "react";
import { View, Image, StatusBar, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, Redirect } from "expo-router";

import { api } from "@/server/api";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

import { colors } from "@/styles/colors";
import { useBadgeStore } from "@/store/badge-store";

export default function Home() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const badgeStore = useBadgeStore();

  async function handleAccessCredential() {
    try {
      if (!code.trim()) {
        return Alert.alert(
          "Ingresso Inválido",
          "Informe o código do ingresso!"
        );
      }
      setIsLoading(true);

      const { data } = await api.get(`/attendees/${code}/badge`);

      badgeStore.save(data.badge)

    } catch (error) {
      Alert.alert("Ingresso", "Ingresso não encontrado!");
      setIsLoading(false);
    }
  }

  if(badgeStore.data?.checkInURL){
    return <Redirect href="/ticket" />;
  }

  return (
    <View className="items-center justify-center flex-1 p-8 bg-green-500">
      <StatusBar barStyle="light-content" />
      <Image
        source={require("@/assets/logo.png")}
        className="h-16"
        resizeMode="contain"
      />
      <View className="w-full gap-3 mt-12">
        <Input>
          <MaterialCommunityIcons
            name="ticket-confirmation-outline"
            size={20}
            color={colors.green[200]}
          />
          <Input.Field
            placeholder="Código do ingresso"
            onChangeText={setCode}
          />
        </Input>
        <Button
          title="Acessar Credencial"
          onPress={handleAccessCredential}
          isLoading={isLoading}
        />

        <Link
          href="/register"
          className="text-gray-100 text-base font-bold text-center mt-8"
        >
          Ainda não possui ingresso?
        </Link>
      </View>
    </View>
  );
}
