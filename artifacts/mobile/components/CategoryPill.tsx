import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import Colors, { spectral } from "@/constants/colors";

type Props = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export function CategoryPill({ label, selected, onPress }: Props) {
  const C = Colors.dark;

  return (
    <Pressable
      onPress={() => {
        Haptics.selectionAsync();
        onPress();
      }}
      style={styles.wrapper}
    >
      {selected ? (
        <LinearGradient
          colors={[spectral.green, spectral.blue, spectral.violet]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.pill}
        >
          <Text style={[styles.label, { color: "#FFFFFF" }]}>{label}</Text>
        </LinearGradient>
      ) : (
        <View
          style={[
            styles.pill,
            { backgroundColor: C.card, borderColor: C.border, borderWidth: 1 },
          ]}
        >
          <Text style={[styles.label, { color: C.textSecondary }]}>
            {label}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 20,
    overflow: "hidden",
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
  },
  label: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
  },
});
