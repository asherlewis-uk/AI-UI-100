import * as Haptics from "expo-haptics";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

import Colors from "@/constants/colors";

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
      style={[
        styles.pill,
        {
          backgroundColor: selected ? C.tint : C.card,
          borderColor: selected ? C.tint : C.border,
        },
      ]}
    >
      <Text
        style={[
          styles.label,
          { color: selected ? "#FFFFFF" : C.textSecondary },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  label: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
  },
});
