import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { CharacterAvatar } from "@/components/CharacterAvatar";
import Colors from "@/constants/colors";
import type { Character } from "@/data/characters";

type Props = {
  character: Character;
  style?: object;
};

export function CharacterCard({ character, style }: Props) {
  const C = Colors.dark;

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({ pathname: "/character/[id]", params: { id: character.id } });
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: C.card, opacity: pressed ? 0.85 : 1 },
        style,
      ]}
    >
      <CharacterAvatar
        colors={character.avatarColors}
        emoji={character.avatarEmoji}
        size={64}
      />
      <View style={styles.info}>
        <Text style={[styles.name, { color: C.text }]} numberOfLines={1}>
          {character.name}
        </Text>
        <Text style={[styles.tagline, { color: C.textSecondary }]} numberOfLines={2}>
          {character.tagline}
        </Text>
        <Text style={[styles.count, { color: C.textMuted }]}>
          {character.messageCount} chats
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 14,
    gap: 10,
    alignItems: "center",
  },
  info: {
    alignItems: "center",
    gap: 3,
  },
  name: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    textAlign: "center",
  },
  tagline: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    lineHeight: 15,
  },
  count: {
    fontSize: 10,
    fontFamily: "Inter_400Regular",
  },
});
