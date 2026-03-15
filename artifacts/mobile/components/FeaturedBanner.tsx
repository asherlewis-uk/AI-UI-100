import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { CharacterAvatar } from "@/components/CharacterAvatar";
import Colors from "@/constants/colors";
import type { Character } from "@/data/characters";

type Props = {
  character: Character;
};

export function FeaturedBanner({ character }: Props) {
  const C = Colors.dark;

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push({ pathname: "/character/[id]", params: { id: character.id } });
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [styles.container, { opacity: pressed ? 0.9 : 1 }]}
    >
      <LinearGradient
        colors={[character.avatarColors[0] + "99", character.avatarColors[1] + "55", "transparent"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.inner}>
        <CharacterAvatar
          colors={character.avatarColors}
          emoji={character.avatarEmoji}
          size={80}
        />
        <View style={styles.textContainer}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>FEATURED</Text>
          </View>
          <Text style={[styles.name, { color: C.text }]}>{character.name}</Text>
          <Text style={[styles.tagline, { color: C.textSecondary }]} numberOfLines={2}>
            {character.tagline}
          </Text>
          <Text style={[styles.count, { color: C.textMuted }]}>
            {character.messageCount} chats
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#1C1C1E",
    marginHorizontal: 16,
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    gap: 16,
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  badge: {
    backgroundColor: "rgba(124,58,237,0.3)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginBottom: 4,
    borderWidth: 1,
    borderColor: "rgba(124,58,237,0.5)",
  },
  badgeText: {
    color: "#A855F7",
    fontSize: 9,
    fontFamily: "Inter_700Bold",
    letterSpacing: 1.2,
  },
  name: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
  },
  tagline: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 18,
  },
  count: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
    marginTop: 2,
  },
});
