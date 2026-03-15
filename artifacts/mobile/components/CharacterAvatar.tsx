import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  colors: [string, string];
  emoji: string;
  size?: number;
};

export function CharacterAvatar({ colors, emoji, size = 56 }: Props) {
  const fontSize = size * 0.38;
  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}
    >
      <Text style={[styles.emoji, { fontSize }]}>{emoji}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    lineHeight: undefined,
  },
});
