import { ActivityIndicator } from "react-native";

export function Loading(){
  return (
    <ActivityIndicator className="items-center justify-center flex-1 text-orange-500 bg-green-500" size={"large"}/>
  )
}